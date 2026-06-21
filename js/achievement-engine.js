/* ===== embedded: achievement-engine.js (canonical file shipped separately) ===== */
/* ============================================================================
   AXIS ACHIEVEMENT ENGINE  ·  achievement-engine.js
   ----------------------------------------------------------------------------
   하나의 성장 시스템(Growth System) 코어. 모든 페이지(엠블럼·학생·라이벌·성적표·
   대시보드)에서 공통으로 재사용한다.

     학생 행동 → achievementData 갱신 → evaluate() → 엠블럼/EXP/레벨/칭호 →
     프로필·라이벌·랭킹 업데이트

   설계 원칙
   - 엠블럼은 저장하지 않는다. achievementData로부터 항상 "계산"된다 (수동 지급 금지).
   - 계산은 학생 행동이 발생했을 때만 수행한다 (recordEvent). 페이지 로드마다 전체
     계산하지 않는다. (단, initialize()로 최초 1회 기준선만 잡는다.)
   - UI 비의존. 애니메이션은 hooks 콜백으로 위임한다.
   ========================================================================== */
(function (global) {
  'use strict';

  /* ---- 티어 / EXP ------------------------------------------------------- */
  var TIER_KEYS  = ['Bronze', 'Silver', 'Gold', 'Diamond', 'Legend'];      // 내부 키
  var TIER_LABEL = ['Bronze', 'Silver', 'Gold', 'Diamond', 'AXIS MASTER']; // 표시 라벨
  var TIER_EXP   = [50, 100, 200, 500, 1000];                              // 단계별 EXP
  var TIER_EMOJI = ['🥉', '🥈', '🥇', '💎', '🌈'];

  /* ---- dotted-path field helpers --------------------------------------- */
  function getField(obj, path) {
    if (!path) return 0;
    var parts = path.split('.'), cur = obj;
    for (var i = 0; i < parts.length; i++) {
      if (cur == null) return 0;
      cur = cur[parts[i]];
    }
    return cur == null ? 0 : cur;
  }

  /* ---- 엠블럼 카탈로그 ---------------------------------------------------
     item: {n:name, f:achievementData 필드(점 경로 가능), c:조건문구, r:5단계 임계값,
            u:단위, icon}                                                    */
  var CATALOG = [
    { cat:'시험', u:'회', r:[1,3,5,10,20], items:[
        {n:'만점행진', f:'perfectScores',    c:'시험 100점',     r:[1,3,5,10,30], icon:'star'},
        {n:'연속 만점', f:'perfectStreak',    c:'만점 연속',      r:[2,3,5,8,15],  icon:'flame'},
        {n:'성적 향상', f:'scoreImprovements',c:'직전 대비 향상', u:'회', r:[3,5,10,20,30], icon:'arrow'},
        {n:'최고점 갱신', f:'highScoreUpdates',c:'최고점 갱신',   r:[1,3,5,10,20], icon:'trophy'},
        {n:'90점 클럽', f:'ninetyClub',       c:'90점 이상',      r:[1,5,15,40,100], icon:'txt:90'},
        {n:'95점 클럽', f:'ninetyFiveClub',   c:'95점 이상',      r:[1,5,15,40,100], icon:'txt:95'} ]},
    { cat:'오답', u:'개', r:[10,50,150,400,1000], items:[
        {n:'오답처리왕', f:'wrongFixed',     c:'오답 처리',   icon:'pencil'},
        {n:'오답 정복',  f:'wrongConquered', c:'오답 재정답', icon:'shield'},
        {n:'복습왕',     f:'reviewCount',    c:'오답 복습',   icon:'refresh'},
        {n:'오답노트 완성', f:'wrongNoteDone', c:'오답노트 정리', icon:'note'} ]},
    { cat:'학습', u:'문제', r:[100,500,1500,4000,10000], items:[
        {n:'문제 해결사', f:'questionsSolved', c:'문제 해결', icon:'bulb'},
        {n:'문제폭격기',  f:'questionsSolved', c:'문제 풀이', icon:'books'},
        {n:'정답률 100%', f:'perfectSets',  c:'전체 정답 세트', u:'세트', r:[1,5,15,40,100], icon:'txt:100'},
        {n:'정확도왕',    f:'accurateSets', c:'정답률 90%+ 세트', u:'세트', r:[3,10,25,60,150], icon:'target'} ]},
    { cat:'출석', u:'일', r:[7,30,60,120,200], items:[
        {n:'개근왕',       f:'attendance', c:'연속 출석', icon:'calendar'},
        {n:'꾸준한 학습왕', f:'studyDays',  c:'누적 학습일', icon:'clock'} ]},
    { cat:'숙제', u:'회', r:[5,20,50,120,300], items:[
        {n:'숙제왕',     f:'homeworkCompleted', c:'숙제 제출', icon:'clipboard'},
        {n:'숙제 마스터', f:'homeworkPerfect',  c:'숙제 100% 완료', icon:'check'},
        {n:'초고속 제출', f:'fastSubmit',       c:'마감 24h 전 제출', icon:'rocket'} ]},
    { cat:'목표', u:'회', r:[1,5,12,25,50], items:[
        {n:'목표 달성', f:'weeklyGoal', c:'주간 목표 달성', icon:'target'},
        {n:'목표 초과', f:'goalExceed', c:'목표 초과 달성', icon:'flag'} ]},
    { cat:'레벨', u:'', r:[10,30,50,80,100], items:[
        {n:'Level 10',  f:'level', c:'레벨 도달', r:[10,20,30,40,50],     icon:'txt:10'},
        {n:'Level 30',  f:'level', c:'레벨 도달', r:[30,40,50,65,80],     icon:'txt:30'},
        {n:'Level 50',  f:'level', c:'레벨 도달', r:[50,60,70,85,100],    icon:'txt:50'},
        {n:'Level 100', f:'level', c:'레벨 도달', r:[100,120,140,170,200],icon:'txt:100'} ]},
    { cat:'랭킹', u:'회', r:[1,3,5,10,20], items:[
        {n:'주간 1위',    f:'weeklyRank1', c:'주간 1위', icon:'medal'},
        {n:'월간 TOP3',   f:'monthlyTop3', c:'월간 TOP3', icon:'podium'},
        {n:'시즌 챔피언', f:'seasonWins',  c:'시즌 우승', r:[1,2,3,5,10], icon:'crown'} ]},
    { cat:'라이벌', u:'회', r:[1,5,15,40,80], items:[
        {n:'라이벌 승리', f:'rivalWins',      c:'라이벌전 승리', icon:'swords'},
        {n:'복수 성공',   f:'revengeSuccess', c:'복수 성공', r:[1,3,5,10,20], icon:'bolt'},
        {n:'라이벌 킬러', f:'rivalKills',     c:'라이벌 5연속 제압', r:[1,3,5,10,20], icon:'skull'},
        {n:'연승왕',      f:'rivalWinStreak', c:'라이벌전 연승', u:'연승', r:[3,5,10,20,30], icon:'flame'},
        {n:'복수의 신',   f:'revengeSuccess', c:'복수 성공', r:[5,15,30,60,100], icon:'flash2'} ]},
    { cat:'공통수학1', u:'개', r:[2,5,10,18,30], items:[
        {n:'다항식 마스터', f:'mastery.다항식', c:'다항식 유형', icon:'txt:x\u00B2'},
        {n:'방정식·부등식 마스터', f:'mastery.방정식', c:'방정식·부등식 유형', icon:'scale'},
        {n:'경우의 수 마스터', f:'mastery.경우의수', c:'경우의 수 유형', icon:'dice'},
        {n:'행렬 마스터', f:'mastery.행렬', c:'행렬 유형', icon:'matrix'} ]},
    { cat:'공통수학2', u:'개', r:[2,5,10,18,30], items:[
        {n:'도형의 방정식 마스터', f:'mastery.도형방정식', c:'도형의 방정식 유형', icon:'coord'},
        {n:'집합과 명제 마스터', f:'mastery.집합명제', c:'집합·명제 유형', icon:'venn'},
        {n:'함수 마스터', f:'mastery.함수', c:'함수 유형', icon:'curve'} ]},
    { cat:'대수', u:'개', r:[2,5,10,18,30], items:[
        {n:'지수로그 마스터', f:'mastery.지수로그', c:'지수·로그 유형', icon:'txt:log'},
        {n:'삼각함수 마스터', f:'mastery.삼각함수', c:'삼각함수 유형', icon:'sine'},
        {n:'수열 마스터', f:'mastery.수열', c:'수열 유형', icon:'txt:a\u2099'} ]},
    { cat:'미적분1', u:'개', r:[2,5,10,18,30], items:[
        {n:'극한·연속 마스터', f:'mastery.극한연속', c:'극한·연속 유형', icon:'txt:lim'},
        {n:'미분Ⅰ 마스터', f:'mastery.미분1', c:'미분Ⅰ 유형', icon:'tangent'},
        {n:'적분Ⅰ 마스터', f:'mastery.적분1', c:'적분Ⅰ 유형', icon:'integral'} ]},
    { cat:'확률과 통계', u:'개', r:[2,5,10,18,30], items:[
        {n:'경우의 수 마스터', f:'mastery.경우의수2', c:'경우의 수 유형', icon:'dice'},
        {n:'확률 마스터', f:'mastery.확률', c:'확률 유형', icon:'txt:P'},
        {n:'통계 마스터', f:'mastery.통계', c:'통계 유형', icon:'bars'} ]},
    { cat:'미적분2', u:'개', r:[2,5,10,18,30], items:[
        {n:'수열의 극한 마스터', f:'mastery.수열극한', c:'수열의 극한 유형', icon:'txt:\u221E'},
        {n:'미분Ⅱ 마스터', f:'mastery.미분2', c:'미분Ⅱ 유형', icon:'tangent'},
        {n:'적분Ⅱ 마스터', f:'mastery.적분2', c:'적분Ⅱ 유형', icon:'integral'} ]},
    { cat:'기하', u:'개', r:[2,5,10,18,30], items:[
        {n:'이차곡선 마스터', f:'mastery.이차곡선', c:'이차곡선 유형', icon:'conic'},
        {n:'공간도형 마스터', f:'mastery.공간도형', c:'공간도형 유형', icon:'cube'},
        {n:'벡터 마스터', f:'mastery.벡터', c:'벡터 유형', icon:'vector'} ]},
    { cat:'최종 업적', u:'%', r:[20,40,60,80,100], items:[
        {n:'공통수학Ⅰ 정복자', f:'conquerRate.공통수학1', c:'공통수학Ⅰ 진도', icon:'shield'},
        {n:'공통수학Ⅱ 정복자', f:'conquerRate.공통수학2', c:'공통수학Ⅱ 진도', icon:'shield'},
        {n:'대수 정복자', f:'conquerRate.대수', c:'대수 진도', icon:'shield'},
        {n:'미적분Ⅰ 정복자', f:'conquerRate.미적분1', c:'미적분Ⅰ 진도', icon:'shield'},
        {n:'확률과통계 정복자', f:'conquerRate.확통', c:'확률과통계 진도', icon:'shield'},
        {n:'미적분Ⅱ 정복자', f:'conquerRate.미적분2', c:'미적분Ⅱ 진도', icon:'shield'},
        {n:'기하 정복자', f:'conquerRate.기하', c:'기하 진도', icon:'shield'},
        {n:'AXIS GRAND MASTER', f:'conquerRate.전체', c:'전 과목 정복', icon:'axis'} ]}
  ];

  /* flatten -> EMBLEMS */
  var EMBLEMS = [];
  CATALOG.forEach(function (c, ci) {
    c.items.forEach(function (it, ii) {
      EMBLEMS.push({
        id: 'c' + ci + '_' + ii, cat: c.cat, name: it.n, icon: it.icon || 'star',
        cond: it.c, unit: (it.u !== undefined ? it.u : c.u),
        reqs: (it.r ? it.r.slice() : c.r.slice()),
        field: it.f
      });
    });
  });
  var EMBLEM_BY_ID = {};
  EMBLEMS.forEach(function (e) { EMBLEM_BY_ID[e.id] = e; });
  function emblemByName(n) { for (var i=0;i<EMBLEMS.length;i++) if (EMBLEMS[i].name===n) return EMBLEMS[i]; return null; }

  /* ---- achievementData factory ---------------------------------------- */
  function createAchievementData(init) {
    var d = {
      // 행동 누적
      attendance:0, homeworkCompleted:0, lectureCompleted:0, questionsSolved:0,
      perfectScores:0, perfectStreak:0, scoreImprovements:0, highScore:0, highScoreUpdates:0,
      ninetyClub:0, ninetyFiveClub:0, averageScore:0, growthRate:0, studyDays:0,
      wrongFixed:0, wrongConquered:0, reviewCount:0, wrongNoteDone:0,
      perfectSets:0, accurateSets:0,
      homeworkPerfect:0, fastSubmit:0, weeklyGoal:0, goalExceed:0,
      rivalWins:0, rivalLosses:0, revengeSuccess:0, rivalWinStreak:0, rivalLoseStreak:0, rivalKills:0,
      seasonWins:0, weeklyRank1:0, monthlyTop3:0, seasonPoint:0, seasonRank:0,
      dailyMission:0, weeklyMission:0, monthlyMission:0,
      mastery:{}, conquerRate:{},
      // 성장
      level:1, exp:0,
      earnedEmblems:[],   // 계산 결과 [{id,tier}]
      displayEmblems:[],  // 학생이 고른 대표 3개 (id)
      title:'',
      // 내부 회계 (중복 EXP 방지) + 오늘 집계
      creditedTiers:{},
      today:{ date:null, attendance:0, homework:0, questions:0, lectures:0, rival:0 }
    };
    if (init) for (var k in init) if (init.hasOwnProperty(k)) d[k] = init[k];
    if (!d.mastery) d.mastery = {};
    if (!d.conquerRate) d.conquerRate = {};
    if (!d.creditedTiers) d.creditedTiers = {};
    if (!d.today) d.today = { date:null, attendance:0, homework:0, questions:0, lectures:0, rival:0 };
    return d;
  }

  /* ---- 레벨 곡선 ------------------------------------------------------- */
  // L→L+1 필요 EXP = 100 + (L-1)*60  (누적)
  function needForLevel(L) { return 100 + (L - 1) * 60; }
  function levelInfo(exp) {
    var L = 1, acc = 0;
    while (exp >= acc + needForLevel(L)) { acc += needForLevel(L); L++; if (L > 999) break; }
    var into = exp - acc, need = needForLevel(L);
    return { level: L, intoLevel: into, needForNext: need, toNext: need - into,
             progress: Math.min(100, Math.round(into / need * 100)) };
  }

  /* ---- evaluate: achievementData → 획득 엠블럼 -------------------------- */
  function metricOf(d, em) { return getField(d, em.field); }
  function tierForValue(v, reqs) { var t = -1; for (var i = 0; i < 5; i++) if (v >= reqs[i]) t = i; return t; }
  function evaluate(d) {
    var earned = [], byId = {};
    for (var i = 0; i < EMBLEMS.length; i++) {
      var em = EMBLEMS[i], v = metricOf(d, em), t = tierForValue(v, em.reqs);
      byId[em.id] = { tier: t, value: v };
      if (t >= 0) earned.push({ id: em.id, tier: t, value: v });
    }
    return { earned: earned, byId: byId };
  }

  /* ---- 칭호 ------------------------------------------------------------ */
  var REVENGE_TITLES = ['복수자','응징자','추격자','라이벌 슬레이어','복수의 신'];
  function pickTitle(d, byId) {
    // 1) 복수 계열 우선
    var rev = byId['c8_1']; // 복수 성공
    if (rev && rev.tier >= 0) {
      // 복수의 신(legend) 우선
      var god = byId['c8_4'];
      if (god && god.tier >= 0) return '복수의 신';
      return REVENGE_TITLES[Math.min(rev.tier, 3)];
    }
    // 2) Legend 보유 수 기반
    var legends = 0, masters = 0;
    for (var id in byId) { if (byId[id].tier === 4) legends++; if (byId[id].tier >= 2) masters++; }
    if (legends >= 5) return 'AXIS 마스터';
    if (legends >= 1) return '전설의 도전자';
    if (masters >= 5) return '숙련가';
    if (d.level >= 30) return '정예';
    return '분석가';
  }

  /* ---- featured / rare ------------------------------------------------- */
  var RARITY_CAT = {'최종 업적':520,'랭킹':280,'라이벌':240,'레벨':170,'미적분2':190,'기하':190,'미적분1':165,
    '대수':150,'확률과 통계':150,'공통수학2':140,'공통수학1':140,'오답':120,'학습':110,'시험':120,'출석':90,'숙제':80,'목표':105};
  function rarityScore(em, t) { return (t + 1) * 130 + (RARITY_CAT[em.cat] || 100); }
  function featured(d) {
    if (d.displayEmblems && d.displayEmblems.length) {
      return d.displayEmblems.map(function (id) {
        var em = EMBLEM_BY_ID[id]; if (!em) return null;
        return { id: id, tier: tierForValue(metricOf(d, em), em.reqs) };
      }).filter(function (x) { return x && x.tier >= 0; }).slice(0, 3);
    }
    var ev = evaluate(d).earned.slice();
    ev.sort(function (a, b) { return b.tier - a.tier ||
      rarityScore(EMBLEM_BY_ID[b.id], b.tier) - rarityScore(EMBLEM_BY_ID[a.id], a.tier); });
    return ev.slice(0, 3);
  }
  function rare(d, excludeIds) {
    var ex = {}; (excludeIds || []).forEach(function (x) { ex[x.id || x] = 1; });
    var ev = evaluate(d).earned.filter(function (e) { return !ex[e.id]; });
    ev.sort(function (a, b) { return rarityScore(EMBLEM_BY_ID[b.id], b.tier) - rarityScore(EMBLEM_BY_ID[a.id], a.tier); });
    return ev.slice(0, 3);
  }

  /* ---- 오늘의 미션 ----------------------------------------------------- */
  var MISSION_DEFS = [
    { key:'attendance', label:'출석하기',      target:1,  exp:10 },
    { key:'homework',   label:'숙제 완료',     target:1,  exp:15 },
    { key:'questions',  label:'문제 30개 풀이', target:30, exp:20 },
    { key:'lectures',   label:'강의 2개 시청',  target:2,  exp:15 },
    { key:'rival',      label:'라이벌전 1회',   target:1,  exp:20 }
  ];
  function todayStr() { return new Date().toISOString().slice(0, 10); }
  function ensureToday(d) {
    var ts = todayStr();
    if (!d.today || d.today.date !== ts) {
      d.today = { date: ts, attendance:0, homework:0, questions:0, lectures:0, rival:0 };
    }
    return d.today;
  }
  function missions(d) {
    var t = ensureToday(d);
    var list = MISSION_DEFS.map(function (m) {
      var cur = t[m.key] || 0;
      return { key:m.key, label:m.label, target:m.target, current:Math.min(cur, m.target),
               done: cur >= m.target, exp:m.exp };
    });
    var allDone = list.every(function (m) { return m.done; });
    return { list: list, allDone: allDone, completed: list.filter(function(m){return m.done;}).length, total: list.length };
  }

  /* ---- 진행중 업적 (다음 승급까지) ------------------------------------- */
  function inProgress(d, limit) {
    var out = [];
    for (var i = 0; i < EMBLEMS.length; i++) {
      var em = EMBLEMS[i], v = metricOf(d, em), t = tierForValue(v, em.reqs);
      if (t >= 4) continue;                       // 이미 최고 등급
      var nextIdx = t + 1, target = em.reqs[nextIdx];
      var prevBase = t >= 0 ? em.reqs[t] : 0;
      var pct = Math.max(0, Math.min(100, Math.round((v - prevBase) / (target - prevBase) * 100)));
      out.push({ id: em.id, name: em.name, cat: em.cat, icon: em.icon, unit: em.unit,
        tier: t, value: v, nextTier: nextIdx, target: target, remain: Math.max(0, target - v),
        progress: pct, cond: em.cond });
    }
    out.sort(function (a, b) { return b.progress - a.progress || a.remain - b.remain; });
    return limit ? out.slice(0, limit) : out;
  }

  /* ---- 오늘 획득 가능한 엠블럼 ----------------------------------------- */
  function earnableToday(d, limit) {
    // 다음 단계까지 매우 근접(<= 1 step 또는 진행률 70%+)한 항목
    return inProgress(d).filter(function (p) {
      return p.remain <= Math.max(1, Math.ceil(p.target * 0.06)) || p.progress >= 70;
    }).slice(0, limit || 4);
  }

  /* ---- commit: 평가 + EXP 정산 + 레벨/칭호 갱신 + hooks ----------------- */
  function commit(d, hooks, silent) {
    hooks = hooks || {};
    var before = levelInfo(d.exp).level;
    var ev = evaluate(d);
    var newlyUnlocked = [], gainedExp = 0;

    ev.earned.forEach(function (e) {
      var prev = (d.creditedTiers[e.id] == null) ? -1 : d.creditedTiers[e.id];
      if (e.tier > prev) {
        for (var ti = prev + 1; ti <= e.tier; ti++) {
          gainedExp += TIER_EXP[ti];
          newlyUnlocked.push({ id: e.id, tier: ti, name: EMBLEM_BY_ID[e.id].name, exp: TIER_EXP[ti] });
        }
        d.creditedTiers[e.id] = e.tier;
      }
    });
    if (gainedExp) d.exp += gainedExp;

    var li = levelInfo(d.exp);
    var leveledUp = li.level > before;
    d.level = li.level;
    d.earnedEmblems = ev.earned;

    var oldTitle = d.title;
    d.title = pickTitle(d, ev.byId);
    var titleChanged = d.title !== oldTitle && oldTitle !== '';

    // ----- 레벨 엠블럼은 레벨이 바뀌면 다시 평가해야 정확 (재귀 1회) -----
    if (leveledUp) {
      var ev2 = evaluate(d), extra = 0;
      ev2.earned.forEach(function (e) {
        var prev = (d.creditedTiers[e.id] == null) ? -1 : d.creditedTiers[e.id];
        if (e.tier > prev) {
          for (var ti = prev + 1; ti <= e.tier; ti++) {
            extra += TIER_EXP[ti];
            newlyUnlocked.push({ id: e.id, tier: ti, name: EMBLEM_BY_ID[e.id].name, exp: TIER_EXP[ti] });
          }
          d.creditedTiers[e.id] = e.tier;
        }
      });
      if (extra) { d.exp += extra; gainedExp += extra; d.level = levelInfo(d.exp).level; }
      d.earnedEmblems = ev2.earned;
    }

    var diff = { newEmblems: newlyUnlocked, expGained: gainedExp,
                 leveledUp: leveledUp, level: d.level, title: d.title, titleChanged: titleChanged };

    if (!silent) {
      if (hooks.onExpGain && (gainedExp || diff.actionExp)) hooks.onExpGain(d, gainedExp);
      newlyUnlocked.forEach(function (n) { if (hooks.onEmblemUnlock) hooks.onEmblemUnlock(d, n); });
      if (leveledUp && hooks.onLevelUp) hooks.onLevelUp(d, d.level);
      if (titleChanged && hooks.onTitleUnlock) hooks.onTitleUnlock(d, d.title);
      if (hooks.onUpdate) hooks.onUpdate(d, diff);
    }
    return diff;
  }

  /* 최초 1회 기준선: 이미 달성한 엠블럼 EXP를 무음으로 정산 */
  function initialize(d) {
    d.creditedTiers = {};
    return commit(d, {}, true);
  }

  /* ---- 행동 기록 (event-driven) --------------------------------------- */
  var ACTION_EXP = { attendance:5, homework:10, lecture:8, questions:0, exam:15,
                     rivalWin:20, revenge:30, goal:15, mission:25, mastery:12 };

  function applyExam(d, p) {
    p = p || {};
    var max = p.max || 100, score = (p.score != null ? p.score : 0);
    var pct = max ? (score / max * 100) : score;
    if (score >= max) { d.perfectScores++; d.perfectStreak++; } else { d.perfectStreak = 0; }
    if (pct >= 90) d.ninetyClub++;
    if (pct >= 95) d.ninetyFiveClub++;
    if (p.prev != null && score > p.prev) {
      d.scoreImprovements++;
      if (p.delta == null) p.delta = score - p.prev;
    }
    if (score > d.highScore) { d.highScore = score; d.highScoreUpdates++; }
    if (p.averageScore != null) d.averageScore = p.averageScore;
    if (p.growthRate != null) d.growthRate = p.growthRate;
  }

  function recordEvent(d, type, payload, hooks) {
    payload = payload || {};
    var t = ensureToday(d);
    switch (type) {
      case 'attendance': d.attendance++; d.studyDays++; t.attendance++; d.exp += ACTION_EXP.attendance; break;
      case 'homework':   d.homeworkCompleted++; t.homework++;
                         if (payload.perfect) d.homeworkPerfect++;
                         if (payload.fast) d.fastSubmit++;
                         d.exp += ACTION_EXP.homework; break;
      case 'lecture':    d.lectureCompleted++; t.lectures++; d.exp += ACTION_EXP.lecture; break;
      case 'questions':  var c = payload.count || 0; d.questionsSolved += c; t.questions += c;
                         d.exp += Math.round(c / 5); break;
      case 'exam':       applyExam(d, payload); d.exp += ACTION_EXP.exam; break;
      case 'rivalWin':   d.rivalWins++; d.rivalWinStreak++; d.rivalLoseStreak = 0; t.rival++;
                         if (d.rivalWinStreak > 0 && d.rivalWinStreak % 5 === 0) d.rivalKills++;
                         d.exp += ACTION_EXP.rivalWin; break;
      case 'rivalLose':  d.rivalLosses++; d.rivalLoseStreak++; d.rivalWinStreak = 0; t.rival++; break;
      case 'revenge':    d.revengeSuccess++; d.exp += ACTION_EXP.revenge; break;
      case 'goal':       if (payload.exceed) d.goalExceed++; else d.weeklyGoal++; d.exp += ACTION_EXP.goal; break;
      case 'mastery':    var k = payload.unit; if (k) { d.mastery[k] = (d.mastery[k] || 0) + (payload.count || 1); }
                         d.exp += ACTION_EXP.mastery; break;
      case 'wrong':      if (payload.fixed) d.wrongFixed += payload.fixed;
                         if (payload.conquered) d.wrongConquered += payload.conquered;
                         if (payload.review) d.reviewCount += payload.review;
                         if (payload.note) d.wrongNoteDone += payload.note; break;
      case 'rank':       if (payload.weekly1) d.weeklyRank1++;
                         if (payload.monthlyTop3) d.monthlyTop3++;
                         if (payload.seasonWin) d.seasonWins++; break;
      case 'mission':    d.dailyMission++; d.exp += ACTION_EXP.mission; break;
      case 'set':        if (payload.field) setRaw(d, payload.field, payload.value); break; // 직접 세팅(어댑터용)
      default: break;
    }
    // 미션 자동 완료 → "오늘의 정복자"
    var ms = missions(d);
    if (ms.allDone && !d._todayConqueror) { d._todayConqueror = t.date; d.dailyMission++; d.exp += ACTION_EXP.mission; }
    return commit(d, hooks);
  }

  function setRaw(d, path, value) {
    var parts = path.split('.'), cur = d;
    for (var i = 0; i < parts.length - 1; i++) { if (cur[parts[i]] == null) cur[parts[i]] = {}; cur = cur[parts[i]]; }
    cur[parts[parts.length - 1]] = value;
  }

  /* ---- 라이벌 비교 ----------------------------------------------------- */
  function emblemCount(d) { return evaluate(d).earned.length; }
  function tierSum(d) { return evaluate(d).earned.reduce(function (s, e) { return s + e.tier + 1; }, 0); }
  function winRate(d) { var tot = d.rivalWins + d.rivalLosses; return tot ? Math.round(d.rivalWins / tot * 100) : 0; }
  function compareRival(me, rival) {
    return [
      { label:'레벨',        me: me.level,        rival: rival.level },
      { label:'경험치',      me: me.exp,          rival: rival.exp },
      { label:'엠블럼 개수', me: emblemCount(me), rival: emblemCount(rival) },
      { label:'승급 단계',   me: tierSum(me),     rival: tierSum(rival) },
      { label:'승률',        me: winRate(me),     rival: winRate(rival), unit:'%' },
      { label:'연승',        me: me.rivalWinStreak, rival: rival.rivalWinStreak },
      { label:'복수 성공',   me: me.revengeSuccess, rival: rival.revengeSuccess }
    ].map(function (r) { r.ahead = r.me >= r.rival; return r; });
  }

  /* ====================================================================== *
   *  COMPACT EMBLEM RENDERER (SVG)  — 모든 페이지 공용 표시용
   *  등급이 오를수록 금속·광택·월계관·왕관·날개·네온이 강해진다.
   * ====================================================================== */
  var _uid = 0;
  var R_TIERS = [
    { face:['#f0b274','#c8772e','#7a4419'], rim:'#a85f24', spec:'#ffe2c0', glow:'#d4802f', gi:.3,  laurel:0, crown:0, wings:0 },
    { face:['#ffffff','#c2cad6','#7d8798'], rim:'#aab4c4', spec:'#ffffff', glow:'#b9c8df', gi:.4,  laurel:1, crown:0, wings:0 },
    { face:['#fff0b8','#f0c14b','#9c7615'], rim:'#d6a32e', spec:'#fff8da', glow:'#ffcf5a', gi:.6,  laurel:2, crown:1, wings:0 },
    { face:['#eafdff','#9fe6ff','#3f9fc4'], rim:'#7fd0ee', spec:'#ffffff', glow:'#5fd6ff', gi:.85, laurel:2, crown:2, wings:1 },
    { face:['#3a2456','#1a1030','#0a0618'], rim:'#c8951f', spec:'#ffe6a8', glow:'#ff45d0', gi:1,   laurel:2, crown:2, wings:2, molten:true }
  ];
  function ipath(k) {
    switch (k) {
      case 'flag': return '<path d="M12 4 v32 M12 6 h18 l-4 6 4 6 h-18"/>';
      case 'flame': return '<path d="M20 4 C26 12 30 16 30 24 a10 10 0 1 1 -20 0 c0-5 3-8 5-11 c1 4 3 5 5 4 c-2-4 0-9 -5-13 Z"/>';
      case 'target': return '<g fill="none" stroke-width="3"><circle cx="20" cy="20" r="14"/><circle cx="20" cy="20" r="8"/></g><circle cx="20" cy="20" r="3.4" stroke="none"/>';
      case 'star': return '<path d="M20 3 L24.7 15.3 L37.8 16 L27.6 24.3 L31 37 L20 29.8 L9 37 L12.4 24.3 L2.2 16 L15.3 15.3 Z"/>';
      case 'arrow': return '<path d="M20 4 L33 19 H25 V36 H15 V19 H7 Z"/>';
      case 'calendar': return '<g><rect x="6" y="9" width="28" height="26" rx="3" fill="none" stroke-width="3"/><path d="M6 16 h28 M13 5 v7 M27 5 v7" stroke-width="3" fill="none"/><path d="M13 25 l4 4 7-8" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>';
      case 'swords': return '<g stroke-width="3.2" stroke-linecap="round"><path d="M9 7 L29 31 M31 31 l4 4 M27 33 l4 -2"/><path d="M31 7 L11 31 M9 31 l-4 4 M13 33 l-4 -2"/></g>';
      case 'bolt': return '<path d="M23 3 L9 23 H18 L16 37 L31 16 H21 Z"/>';
      case 'flash2': return '<g><path d="M19 3 L7 21 H14 L12 33 L24 16 H17 Z"/><path d="M31 7 L21 22 H26 L24 37 L36 18 H29 Z" opacity=".85"/></g>';
      case 'books': return '<g><rect x="6" y="26" width="28" height="8" rx="1.5"/><rect x="9" y="17" width="22" height="8" rx="1.5"/><rect x="12" y="8" width="16" height="8" rx="1.5"/></g>';
      case 'trophy': return '<path d="M13 6 h14 v6 a7 7 0 0 1 -14 0 Z M11 7 h-4 a6 6 0 0 0 6 7 M29 7 h4 a6 6 0 0 1 -6 7 M20 19 v7 M14 34 h12 l-1.5 -5 h-9 Z" fill="none" stroke-width="3" stroke-linejoin="round"/>';
      case 'integral': return '<path d="M26 6 a5 5 0 0 0 -9 3 v22 a5 5 0 0 1 -9 3" fill="none" stroke-width="3.4" stroke-linecap="round"/>';
      case 'shield': return '<path d="M20 4 L34 9 V21 C34 30 28 35 20 37 C12 35 6 30 6 21 V9 Z" fill="none" stroke-width="3" stroke-linejoin="round"/><path d="M20 13 l2.2 4.6 5 .5 -3.7 3.5 1 5 -4.5 -2.6 -4.5 2.6 1 -5 -3.7 -3.5 5 -.5 Z" stroke="none"/>';
      case 'pencil': return '<path d="M8 32 l2.5 -8 16 -16 5.5 5.5 -16 16 -8 2.5 Z M24 8.5 l5.5 5.5" fill="none" stroke-width="3" stroke-linejoin="round"/>';
      case 'refresh': return '<path d="M31 13 a13 13 0 1 0 2.5 9" fill="none" stroke-width="3" stroke-linecap="round"/><path d="M33 5 v9 h-9" fill="none" stroke-width="3" stroke-linejoin="round"/>';
      case 'note': return '<g fill="none" stroke-width="2.8"><rect x="10" y="6" width="22" height="28" rx="2.5"/><path d="M10 6 v28" stroke-width="3.4"/><path d="M16 14 h11 M16 20 h11 M16 26 h7"/></g>';
      case 'bulb': return '<path d="M20 5 a11 11 0 0 0 -7 19 c1.5 1.6 2 2.6 2 4.5 h10 c0 -1.9 .5 -2.9 2 -4.5 a11 11 0 0 0 -7 -19 Z M16 33 h8 M17.5 36 h5" fill="none" stroke-width="3" stroke-linejoin="round"/>';
      case 'clock': return '<g fill="none" stroke-width="3"><circle cx="20" cy="20" r="14"/><path d="M20 11 v9 l6 4" stroke-linecap="round"/></g>';
      case 'clipboard': return '<g fill="none" stroke-width="3"><rect x="9" y="8" width="22" height="27" rx="3"/><rect x="15" y="5" width="10" height="6" rx="2"/></g><path d="M14 19 l3 3 5 -6" fill="none" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>';
      case 'check': return '<path d="M6 21 l8 9 18 -20" fill="none" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>';
      case 'rocket': return '<path d="M20 4 C27 10 28 18 28 25 l-4 4 h-8 l-4 -4 C12 18 13 10 20 4 Z M16 30 l-4 6 M24 30 l4 6 M20 31 v6" fill="none" stroke-width="2.8" stroke-linejoin="round"/><circle cx="20" cy="16" r="3" stroke="none"/>';
      case 'medal': return '<g fill="none" stroke-width="3"><circle cx="20" cy="26" r="9"/><path d="M14 18 L9 5 M26 18 L31 5"/></g><path d="M20 22 l1.5 3 3.3 .4 -2.4 2.3 .6 3.3 -3 -1.6 -3 1.6 .6 -3.3 -2.4 -2.3 3.3 -.4 Z" stroke="none"/>';
      case 'podium': return '<g fill="none" stroke-width="2.8" stroke-linejoin="round"><rect x="15" y="15" width="10" height="21"/><rect x="4" y="23" width="11" height="13"/><rect x="25" y="27" width="11" height="9"/></g>';
      case 'crown': return '<path d="M5 31 L8 12 L15 21 L20 8 L25 21 L32 12 L35 31 Z" stroke-linejoin="round"/><rect x="5" y="31" width="30" height="5.5" rx="1.5"/>';
      case 'skull': return '<g fill="none" stroke-width="2.6" stroke-linejoin="round"><path d="M9 19 a11 10 0 0 1 22 0 v5 a4 4 0 0 1 -4 4 v3 h-3 v-2 h-2 v2 h-2 v-2 h-2 v2 h-3 v-3 a4 4 0 0 1 -4 -4 Z"/></g><circle cx="15" cy="19" r="2.6" stroke="none"/><circle cx="25" cy="19" r="2.6" stroke="none"/>';
      case 'scale': return '<g fill="none" stroke-width="2.8" stroke-linejoin="round"><path d="M20 6 v26 M11 33 h18"/><path d="M7 13 h26"/><path d="M7 13 l-4 9 a5 4 0 0 0 8 0 Z M33 13 l4 9 a5 4 0 0 1 -8 0 Z"/></g>';
      case 'dice': return '<g fill="none" stroke-width="2.8"><rect x="8" y="8" width="24" height="24" rx="5"/></g><g stroke="none"><circle cx="15" cy="15" r="2.2"/><circle cx="25" cy="25" r="2.2"/><circle cx="20" cy="20" r="2.2"/><circle cx="15" cy="25" r="2.2"/><circle cx="25" cy="15" r="2.2"/></g>';
      case 'matrix': return '<g fill="none" stroke-width="2.6"><path d="M12 6 h-5 v28 h5 M28 6 h5 v28 h-5"/></g><g stroke="none"><circle cx="16" cy="15" r="1.9"/><circle cx="24" cy="15" r="1.9"/><circle cx="16" cy="25" r="1.9"/><circle cx="24" cy="25" r="1.9"/></g>';
      case 'coord': return '<g fill="none" stroke-width="2.6"><path d="M8 33 h27 M11 36 V9" stroke-linecap="round"/><circle cx="23" cy="20" r="8"/></g>';
      case 'venn': return '<g fill="none" stroke-width="2.8"><circle cx="16" cy="20" r="10"/><circle cx="24" cy="20" r="10"/></g>';
      case 'curve': return '<g fill="none" stroke-width="2.4"><path d="M9 7 V33 H35" stroke-linecap="round" opacity=".7"/></g><path d="M11 30 C18 30 17 13 22 13 C27 13 26 25 33 25" fill="none" stroke-width="3" stroke-linecap="round"/>';
      case 'sine': return '<path d="M4 20 C8 7 12 7 16 20 C20 33 24 33 28 20 C30 13 33 11 36 11" fill="none" stroke-width="3" stroke-linecap="round"/>';
      case 'tangent': return '<g fill="none"><path d="M7 31 C16 31 17 12 23 10" stroke-width="3" stroke-linecap="round"/><path d="M9 33 L31 9" stroke-width="2.4" stroke-linecap="round"/></g>';
      case 'bars': return '<g stroke="none"><rect x="7" y="22" width="6" height="12" rx="1"/><rect x="17" y="13" width="6" height="21" rx="1"/><rect x="27" y="7" width="6" height="27" rx="1"/></g>';
      case 'conic': return '<g fill="none" stroke-width="3"><ellipse cx="20" cy="20" rx="15" ry="9"/></g>';
      case 'cube': return '<g fill="none" stroke-width="2.6" stroke-linejoin="round"><path d="M20 5 L33 12 V27 L20 34 L7 27 V12 Z"/><path d="M7 12 L20 19 L33 12 M20 19 V34"/></g>';
      case 'vector': return '<path d="M7 33 L31 11 M31 11 h-9 M31 11 v9" fill="none" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>';
      case 'axis': return '<g stroke-width="4.2" stroke-linecap="round"><path d="M9 9 L31 31"/><path d="M31 9 L9 31"/></g><path d="M20 14 l4 6 -4 6 -4 -6 Z" stroke="none"/>';
      default: return '<circle cx="20" cy="20" r="10"/>';
    }
  }
  function laurel(t, color) {
    if (t.laurel <= 0) return '';
    var n = t.laurel >= 2 ? 7 : 5, leaves = '';
    for (var i = 0; i < n; i++) {
      var f = 0.1 + 0.8 * i / (n - 1), ang = (200 + 120 * f) * Math.PI / 180;
      var x = 100 + Math.cos(ang) * 60, y = 112 + Math.sin(ang) * 60;
      leaves += '<ellipse cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" rx="7" ry="3" fill="' + color + '" transform="rotate(' + (f*90+90).toFixed(0) + ' ' + x.toFixed(1) + ' ' + y.toFixed(1) + ')"/>';
      var x2 = 200 - x;
      leaves += '<ellipse cx="' + x2.toFixed(1) + '" cy="' + y.toFixed(1) + '" rx="7" ry="3" fill="' + color + '" transform="rotate(' + (-f*90-90).toFixed(0) + ' ' + x2.toFixed(1) + ' ' + y.toFixed(1) + ')"/>';
    }
    return '<g opacity=".85">' + leaves + '</g>';
  }
  function crown(t, uid) {
    if (t.crown <= 0) return '';
    var big = t.crown >= 2 ? 1.05 : .86, y = 52, w = 46 * big, x0 = 100 - w/2, x1 = 100 + w/2;
    return '<g><path d="M' + x0 + ' ' + y + ' L' + (x0+w*0.13) + ' ' + (y-18*big) + ' L' + (x0+w*0.3) + ' ' + (y-6*big) +
      ' L100 ' + (y-24*big) + ' L' + (x1-w*0.3) + ' ' + (y-6*big) + ' L' + (x1-w*0.13) + ' ' + (y-18*big) + ' L' + x1 + ' ' + y +
      ' Z" fill="url(#cg' + uid + ')" stroke="' + t.rim + '" stroke-width="1"/></g>';
  }
  function wings(t, uid) {
    if (t.wings <= 0) return '';
    var big = t.wings >= 2 ? 1.1 : .9, s = '';
    for (var side = -1; side <= 1; side += 2) {
      for (var i = 0; i < 3; i++) {
        var len = (26 + i*8) * big, bx = 100 + side*34;
        s += '<path d="M' + bx + ' 110 Q' + (bx+side*len*0.5) + ' ' + (84-i*8*big) + ' ' + (bx+side*len) + ' ' + (92-i*8*big) +
          ' Q' + (bx+side*len*0.45) + ' ' + (106-i*3) + ' ' + bx + ' 118" fill="url(#wg' + uid + ')" opacity="' + (0.9-i*0.12).toFixed(2) + '"/>';
      }
    }
    return '<g>' + s + '</g>';
  }
  function glyphMarkup(icon, t) {
    if (icon && icon.indexOf('txt:') === 0) {
      var sx = icon.slice(4), fs = (Array.from ? Array.from(sx).length : sx.length) >= 3 ? 16 : (sx.length === 2 ? 21 : 27);
      var f = "'Times New Roman',serif";
      return '<text x="20" y="21" text-anchor="middle" dominant-baseline="middle" font-family="' + f + '" font-weight="700" font-size="' + fs + '" fill="' + t.face[2] + '">' + sx + '</text>';
    }
    return '<g fill="' + (t.molten ? '#ffd86b' : t.face[2]) + '" stroke="' + (t.molten ? '#ffd86b' : t.face[2]) + '" stroke-linejoin="round">' + ipath(icon) + '</g>';
  }
  // emblemSVG(emblemId|emblem, tier, {locked})  → SVG 문자열 (1:1, 투명배경)
  function emblemSVG(em, tier, opt) {
    opt = opt || {};
    if (typeof em === 'string') em = EMBLEM_BY_ID[em] || emblemByName(em) || EMBLEMS[0];
    var uid = (_uid++).toString(36);
    if (opt.locked || tier < 0) {
      return '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-label="미획득">' +
        '<circle cx="100" cy="112" r="62" fill="#0a1226" stroke="#1c2a4d" stroke-width="2"/>' +
        '<circle cx="100" cy="112" r="50" fill="#070d1c" stroke="#16223f" stroke-width="1.5"/>' +
        '<text x="100" y="127" text-anchor="middle" font-family="serif" font-weight="700" font-size="46" fill="#27375f">??</text></svg>';
    }
    var t = R_TIERS[Math.max(0, Math.min(4, tier))], g = t.face;
    return '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-label="' + em.name + ' ' + TIER_LABEL[tier] + '">' +
      '<defs>' +
        '<radialGradient id="fg' + uid + '" cx="42%" cy="34%" r="72%"><stop offset="0%" stop-color="' + g[0] + '"/><stop offset="46%" stop-color="' + g[1] + '"/><stop offset="100%" stop-color="' + g[2] + '"/></radialGradient>' +
        '<linearGradient id="rg' + uid + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="' + t.spec + '"/><stop offset="100%" stop-color="' + t.rim + '"/></linearGradient>' +
        '<linearGradient id="cg' + uid + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ffe9a8"/><stop offset="100%" stop-color="#9c7615"/></linearGradient>' +
        '<linearGradient id="wg' + uid + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="' + t.spec + '"/><stop offset="100%" stop-color="' + t.rim + '"/></linearGradient>' +
        '<radialGradient id="ag' + uid + '" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="' + t.glow + '" stop-opacity="' + (t.gi*0.8).toFixed(2) + '"/><stop offset="100%" stop-color="' + t.glow + '" stop-opacity="0"/></radialGradient>' +
      '</defs>' +
      '<circle cx="100" cy="112" r="94" fill="url(#ag' + uid + ')"/>' +
      wings(t, uid) + laurel(t, t.rim) +
      '<circle cx="100" cy="112" r="62" fill="url(#rg' + uid + ')"/>' +
      '<circle cx="100" cy="112" r="52" fill="url(#fg' + uid + ')"/>' +
      (t.molten ? '<circle cx="100" cy="112" r="40" fill="url(#ag' + uid + ')"/>' : '') +
      '<g transform="translate(' + (100-20*1.42).toFixed(1) + ' ' + (112-20*1.42).toFixed(1) + ') scale(1.42)">' + glyphMarkup(em.icon, t) + '</g>' +
      '<ellipse cx="85" cy="90" rx="26" ry="14" fill="' + t.spec + '" opacity="' + (t.molten ? '.18' : '.32') + '" transform="rotate(-24 85 90)"/>' +
      crown(t, uid) +
      '</svg>';
  }

  /* ---- public API ------------------------------------------------------ */
  var API = {
    TIER_KEYS: TIER_KEYS, TIER_LABEL: TIER_LABEL, TIER_EXP: TIER_EXP, TIER_EMOJI: TIER_EMOJI,
    EMBLEMS: EMBLEMS, EMBLEM_BY_ID: EMBLEM_BY_ID, emblemByName: emblemByName,
    createAchievementData: createAchievementData,
    levelInfo: levelInfo, needForLevel: needForLevel,
    evaluate: evaluate, metricOf: metricOf, tierForValue: tierForValue,
    recordEvent: recordEvent, commit: commit, initialize: initialize, setRaw: setRaw,
    pickTitle: pickTitle,
    featured: featured, rare: rare, inProgress: inProgress, earnableToday: earnableToday,
    missions: missions, ensureToday: ensureToday,
    emblemCount: emblemCount, tierSum: tierSum, winRate: winRate, compareRival: compareRival,
    emblemSVG: emblemSVG,
    label: function (tier) { return tier >= 0 ? TIER_LABEL[tier] : 'LOCKED'; },
    emoji: function (tier) { return TIER_EMOJI[tier] || ''; }
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  global.AXISEngine = API;

})(typeof window !== 'undefined' ? window : this);
