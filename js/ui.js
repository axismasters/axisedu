/* ============================================================
   AXIS LMS · ui.js
   (이 파일은 원본 app.js의 연속 구간이며, index.html에서
    원본과 동일한 순서로 로드되어 동작이 100% 동일합니다.)
   ============================================================ */
/* ---------- master render ---------- */
/* ====================================================================
   GROWTH SYSTEM INTEGRATION  (Achievement Engine ↔ 기존 학생/성적/라이벌)
   ==================================================================== */
const GW = window.AXISEngine;

/* 현재 성장 대시보드 대상 학생 */
function growthStudentId(){ return SESSION && SESSION.studentId ? SESSION.studentId : (DB.students[0]&&DB.students[0].id); }

/* 기존 DB(시험/성적/라이벌)에서 achievementData 파생 → 엔진 초기화 */
function buildAchievementData(sid){
  const d = GW.createAchievementData();
  const stu = DB.students.find(s=>s.id===sid) || {};
  d.nickname = stu.nickname || stu.name || '학생';
  // ---- 시험/성적 ----
  const exams = DB.exams.slice().sort((a,b)=>((a.date||'')>(b.date||'')?1:-1));
  let prev=null, firstPct=null, lastPct=null, scoredCount=0, sum=0;
  exams.forEach(ex=>{
    const sc = (typeof studentTotal==='function') ? studentTotal(ex.id, sid) : null;
    if(sc==null || isNaN(sc)) return;
    const max = ex.max||100, pct = max? sc/max*100 : sc;
    scoredCount++; sum += sc;
    if(sc>=max) d.perfectScores++;
    if(pct>=90) d.ninetyClub++;
    if(pct>=95) d.ninetyFiveClub++;
    if(prev!=null && sc>prev) d.scoreImprovements++;
    if(sc>d.highScore){ d.highScore=sc; d.highScoreUpdates++; }
    if(firstPct==null) firstPct=pct; lastPct=pct; prev=sc;
  });
  d.studyDays = scoredCount;
  d.averageScore = scoredCount? Math.round(sum/scoredCount) : 0;
  d.growthRate = (firstPct!=null && lastPct!=null) ? Math.round(lastPct-firstPct) : 0;
  // ---- 라이벌 (방어적으로 파생) ----
  try{
    const matches = (DB.rivalMatches||[]).filter(m=> m && (m.studentId===sid || m.aId===sid || m.bId===sid || m.meId===sid));
    matches.forEach(m=>{
      const won = (m.winnerId===sid) || (m.result==='win' && (m.studentId===sid||m.meId===sid)) || m.win===true;
      if(won){ d.rivalWins++; d.rivalWinStreak++; if(d.rivalWinStreak%5===0) d.rivalKills++; }
      else { d.rivalLosses++; d.rivalWinStreak=0; }
      if(m.revenge) d.revengeSuccess++;
    });
  }catch(e){}
  // ---- 강의 ----
  d.lectureCompleted = (stu.lecturesWatched|0) || 0;
  // 엔진 기준선(이미 달성한 엠블럼 EXP 무음 정산 → 레벨 산출)
  GW.initialize(d);
  return d;
}

/* 캐시(저장)된 achievementData 반환 */
function getAchievement(sid){
  if(!DB.achievement) DB.achievement = {};
  if(!DB.achievement[sid]){ DB.achievement[sid] = buildAchievementData(sid); saveDB(); }
  return DB.achievement[sid];
}
/* 시험/라이벌 데이터가 바뀌면 파생 필드 재반영(획득 EXP·대표는 유지) */
function syncAchievementFromData(sid){
  const fresh = buildAchievementData(sid);
  const cur = getAchievement(sid);
  // 데이터 파생 필드만 갱신
  ['perfectScores','ninetyClub','ninetyFiveClub','scoreImprovements','highScore','highScoreUpdates',
   'studyDays','averageScore','growthRate','rivalWins','rivalLosses','revengeSuccess','rivalWinStreak','rivalKills']
   .forEach(k=> cur[k]=fresh[k]);
  GW.commit(cur, growthHooks());            // 새로 충족된 엠블럼 정산 + 연출
  saveDB();
}

/* ---- 연출 hooks (엠블럼 획득 / EXP / 레벨업 / 칭호) ---- */
function gwToast(svg, html, cls){
  const wrap=document.getElementById('gw-toasts'); if(!wrap) return;
  const el=document.createElement('div'); el.className='gw-toast '+(cls||'');
  el.innerHTML=`<div class="te">${svg||''}</div><div class="tx">${html}</div>`;
  el.onclick=()=>el.remove(); wrap.appendChild(el);
  setTimeout(()=>{ el.style.transition='.4s'; el.style.opacity='0'; el.style.transform='translateX(16px)'; setTimeout(()=>el.remove(),400); }, 4600);
}
function growthHooks(){
  return {
    onEmblemUnlock:(d,n)=> gwToast(GW.emblemSVG(n.id, n.tier),
      `<b>${n.name}</b> ${GW.label(n.tier)} 획득! <span style="color:var(--secondary)">+${n.exp} EXP</span>`),
    onLevelUp:(d,l)=>{
      const m=document.getElementById('gw-levelup'); if(m){ document.getElementById('gw-lvnum').textContent=l;
        document.getElementById('gw-lvsub').textContent='새로운 레벨에 도달했습니다'; m.classList.add('on');
        setTimeout(()=>m.classList.remove('on'),1700); }
    },
    onTitleUnlock:(d,t)=> gwToast('', `새로운 칭호 <b>«${t}»</b> 획득!`, 'lv'),
    onUpdate:()=>{ if(SESSION&&SESSION.role==='student') renderMyGrowth(); }
  };
}

/* ---- 행동 발생(데모 버튼 + 실제 연동 진입점) ---- */
var DAILY_ACTIONS = { attendance:'출석', homework:'숙제 완료', questions:'문제 풀이', lecture:'강의 시청' };
function growthAction(type, payload){
  const sid = growthStudentId(); if(!sid) return;
  const d = getAchievement(sid);
  // 자기보고 행동은 하루 1회만 (무제한 클릭 방지)
  if(DAILY_ACTIONS[type]){
    const today = new Date().toISOString().slice(0,10);
    if(!d.lastDaily) d.lastDaily = {};
    if(d.lastDaily[type] === today){
      try{ gwToast('', `오늘은 이미 '${DAILY_ACTIONS[type]}'을(를) 완료했어요. 내일 또 도전하세요!`, ''); }catch(e){}
      return;
    }
    d.lastDaily[type] = today;
  }
  GW.recordEvent(d, type, payload||{}, growthHooks());
  saveDB(); renderMyGrowth();
}
/* 라이벌 시스템 연동 진입점 (기존 라이벌 로직에서 호출 가능) */
function onRivalWin(sid){ const d=getAchievement(sid||growthStudentId()); GW.recordEvent(d,'rivalWin',{},growthHooks()); saveDB(); }
function onRivalLose(sid){ const d=getAchievement(sid||growthStudentId()); GW.recordEvent(d,'rivalLose',{},growthHooks()); saveDB(); }
function onRevenge(sid){ const d=getAchievement(sid||growthStudentId()); GW.recordEvent(d,'revenge',{},growthHooks()); saveDB(); }

/* ---- 실제 데이터(성적/라이벌) 변경 시 성장 자동 갱신 ----
   파생 필드만 다시 계산해 commit한다. 누적 EXP·대표 엠블럼·오늘 집계는 보존.
   silent=true면 토스트/연출 없이 데이터만 갱신(관리자 일괄 채점 등). */
function refreshGrowth(sid, silent){
  try{
    if(!window.AXISEngine || typeof buildAchievementData!=='function') return;
    if(!DB.achievement) DB.achievement = {};
    const fresh = buildAchievementData(sid);          // 현재 DB 기준 재파생(+baseline)
    const cur = DB.achievement[sid];
    if(!cur){ DB.achievement[sid] = fresh; return; }   // 최초 1회: 그대로 저장
    ['perfectScores','perfectStreak','ninetyClub','ninetyFiveClub','scoreImprovements','highScore','highScoreUpdates',
     'studyDays','averageScore','growthRate','rivalWins','rivalLosses','revengeSuccess','rivalWinStreak','rivalKills','lectureCompleted']
      .forEach(k=> cur[k] = fresh[k]);
    GW.commit(cur, silent ? {} : growthHooks());
  }catch(e){ console.error('refreshGrowth failed', e); }
}
function refreshAllGrowth(silent){ try{ (DB.students||[]).forEach(s=> refreshGrowth(s.id, silent)); }catch(e){} }

/* 학생 목록 등에서 쓰는 레벨·엠블럼 배지 (저장 부작용 없이 읽기) */
function gwBadge(sid){
  try{
    if(!window.AXISEngine || typeof buildAchievementData!=='function') return '';
    const d = (DB.achievement && DB.achievement[sid]) ? DB.achievement[sid] : buildAchievementData(sid);
    return `<span class="gw-levelbadge">Lv ${d.level} · 🎖 ${window.AXISEngine.emblemCount(d)}</span>`;
  }catch(e){ return ''; }
}

/* ---- 성장 대시보드 렌더 ---- */
function gwAvatar(d){
  const init=(d.nickname||'A').trim()[0]||'A';
  const li=GW.levelInfo(d.exp);
  return `<svg viewBox="0 0 120 120"><defs>
    <radialGradient id="gwav" cx="50%" cy="36%" r="72%"><stop offset="0%" stop-color="#0a1c44"/><stop offset="100%" stop-color="#000926"/></radialGradient>
    <linearGradient id="gwrg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fff"/><stop offset="50%" stop-color="#eac076"/><stop offset="100%" stop-color="#c8a15a"/></linearGradient></defs>
    <circle cx="60" cy="60" r="54" fill="none" stroke="url(#gwrg)" stroke-width="5"/>
    <circle cx="60" cy="60" r="47" fill="url(#gwav)"/>
    <g opacity=".14" stroke="#c8a15a" stroke-width="3" stroke-linecap="round"><path d="M45 45 L75 75"/><path d="M75 45 L45 75"/></g>
    <text x="60" y="63" text-anchor="middle" dominant-baseline="central" font-family="serif" font-weight="700" font-size="46" fill="url(#gwrg)">${init}</text></svg>`;
}
function renderMyGrowth(){
  const root=document.getElementById('growth-root'); if(!root) return;
  const sid=growthStudentId(); if(!sid){ root.innerHTML='<div class="gw-card">학생 정보가 없습니다.</div>'; return; }
  const d=getAchievement(sid);
  const li=GW.levelInfo(d.exp);
  const feat=GW.featured(d);
  const ms=GW.missions(d);
  const prog=GW.inProgress(d,5);
  const earnable=GW.earnableToday(d,4);
  const recent=GW.evaluate(d).earned.slice().sort((a,b)=>b.tier-a.tier).slice(0,6);
  const emCount=GW.emblemCount(d), tierSum=GW.tierSum(d);

  const featHTML = feat.length ? feat.map(e=>`<div class="fe" onclick="gwOpenEmblem('${e.id}')">${GW.emblemSVG(e.id,e.tier)}</div>`).join('')
    : '<span style="color:#b9c4dc;font-size:12px">대표 엠블럼 없음</span>';

  root.innerHTML = `
  <div class="gw-hero">
    <div class="gw-ava">${gwAvatar(d)}<span class="gw-lvchip">Lv ${d.level}</span></div>
    <div class="gw-id">
      <div class="gw-nick"><span class="nm">${d.nickname}</span><span class="gw-title">${d.title||'분석가'}</span></div>
      <div class="gw-stat">
        <div><div class="l">레벨</div><div class="v">Lv ${d.level}</div></div>
        <div><div class="l">엠블럼</div><div class="v">${emCount}개</div></div>
        <div><div class="l">승급 단계</div><div class="v">${tierSum}</div></div>
        <div class="gw-xp"><div class="l">경험치 ${d.exp.toLocaleString()} XP</div>
          <div class="bar"><i style="width:${li.progress}%"></i></div>
          <div style="font-size:11px;color:#b9c4dc;margin-top:4px">다음 레벨까지 ${li.toNext} XP</div></div>
      </div>
    </div>
    <div class="gw-feat">${featHTML}</div>
  </div>

  <div class="gw-grid">
    <div class="gw-card">
      <h3><span class="msym">flag</span>오늘의 미션</h3>
      ${ms.list.map(m=>`<div class="gw-mission ${m.done?'done':''}">
        <span class="mk">${m.done?'✓':''}</span><span class="ml">${m.label}</span>
        <span class="mp">${m.current}/${m.target}</span><span class="mx">+${m.exp}</span></div>`).join('')}
      <div class="gw-allmissions ${ms.allDone?'ok':'no'}">${ms.allDone?'🏆 오늘의 정복자 달성! 보너스 EXP 지급':'미션 '+ms.completed+'/'+ms.total+' 완료'}</div>
    </div>

    <div class="gw-card">
      <h3><span class="msym">trending_up</span>진행중인 업적</h3>
      ${prog.map(p=>`<div class="gw-prog">
        <div class="top"><b>${GW.emoji(p.tier)} ${p.name}</b><span class="t">${p.cond} ${p.target}${p.unit} · ${p.remain}${p.unit} 남음</span></div>
        <div class="bar"><i style="width:${p.progress}%"></i></div></div>`).join('')}
    </div>

    <div class="gw-card">
      <h3><span class="msym">bolt</span>오늘 획득 가능</h3>
      ${earnable.length ? earnable.map(p=>`<div class="gw-prog">
        <div class="top"><b>${p.name}</b><span class="t">${GW.label(p.nextTier)}까지 ${p.remain}${p.unit}</span></div>
        <div class="bar"><i style="width:${p.progress}%"></i></div></div>`).join('') : '<div style="color:var(--on-surface-variant);font-size:13px">조금만 더! 곧 달성할 업적이 여기 표시됩니다.</div>'}
    </div>

    <div class="gw-card">
      <h3><span class="msym">military_tech</span>최근 획득 엠블럼</h3>
      <div class="gw-emrow">
        ${recent.map(e=>`<div class="em" onclick="gwOpenEmblem('${e.id}')">
          <div class="art">${GW.emblemSVG(e.id,e.tier)}</div>
          <div class="nm">${GW.EMBLEM_BY_ID[e.id].name}<br>${GW.label(e.tier)}</div></div>`).join('')}
      </div>
    </div>

    <div class="gw-card">
      <h3><span class="msym">insights</span>학습 통계</h3>
      <div class="gw-statline"><span>시험 평균</span><span class="v">${d.averageScore||0}점</span></div>
      <div class="gw-statline"><span>성장률</span><span class="v">${d.growthRate>=0?'+':''}${d.growthRate||0}점</span></div>
      <div class="gw-statline"><span>만점 횟수</span><span class="v">${d.perfectScores}회</span></div>
      <div class="gw-statline"><span>라이벌 전적</span><span class="v">${d.rivalWins}승 ${d.rivalLosses}패</span></div>
      <div class="gw-statline"><span>복수 성공</span><span class="v">${d.revengeSuccess}회</span></div>
    </div>

    ${SESSION.role==='student' ? `
    <div class="gw-card">
      <h3><span class="msym">task_alt</span>오늘의 활동</h3>
      <p style="font-size:12px;color:var(--on-surface-variant);margin:0 0 10px">매일 학습 활동을 기록하면 EXP·레벨·업적이 올라갑니다. 각 항목은 <b>하루 1회</b>만 가능합니다.</p>
      <div class="gw-acts">
        <button class="btn btn-outline" onclick="growthAction('attendance')">출석</button>
        <button class="btn btn-outline" onclick="growthAction('homework',{perfect:true})">숙제 완료</button>
        <button class="btn btn-outline" onclick="growthAction('questions',{count:30})">문제 풀이 (30문제)</button>
        <button class="btn btn-outline" onclick="growthAction('lecture')">강의 시청</button>
      </div>
    </div>` : ''}
  </div>`;
}
function gwOpenEmblem(id){
  const sid=growthStudentId(); const d=getAchievement(sid);
  const em=GW.EMBLEM_BY_ID[id]; const t=GW.tierForValue(GW.metricOf(d,em),em.reqs);
  const next = t<4? `다음: ${GW.label(t+1)} (${em.cond} ${em.reqs[t+1]}${em.unit})` : '최고 등급 달성';
  gwToast(GW.emblemSVG(id,Math.max(0,t)), `<b>${em.name}</b> ${t>=0?GW.label(t):'미획득'}<br><span style="font-size:11px;color:var(--on-surface-variant)">${next}</span>`);
}

function renderAll(){
  if(isViewer()){
    renderMyGrowth();
    renderMyReport();
    renderMyTrend();
    renderMyLectures();
    renderHomer();
    renderMyGradebook();
    renderMyRival();
    renderMyInfo();
    return;
  }
  renderDashboard();
  renderStudents();
  renderTeachers();
  renderExams();
  renderLecturesAdmin();
  renderStatsCharts();
  renderReportSelect();
  renderGradebookAdmin();
  renderRivalAdmin();
  renderRivalStats();
  renderMyInfo();
}

