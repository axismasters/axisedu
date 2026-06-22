/* ============================================================
   AXIS LMS · rival.js
   (이 파일은 원본 app.js의 연속 구간이며, index.html에서
    원본과 동일한 순서로 로드되어 동작이 100% 동일합니다.)
   ============================================================ */
/* ====================================================
   RIVAL SYSTEM  (additive; does not touch existing data)
   ==================================================== */
const RIVAL_EMBLEMS = [
  {key:'first_win',   name:'첫 승리',     icon:'military_tech', cond:st=>st.win>=1,  point:10},
  {key:'win10',       name:'라이벌 10승', icon:'workspace_premium', cond:st=>st.win>=10, point:30},
  {key:'win20',       name:'라이벌 20승', icon:'workspace_premium', cond:st=>st.win>=20, point:50},
  {key:'win30',       name:'라이벌 30승', icon:'workspace_premium', cond:st=>st.win>=30, point:80},
  {key:'streak3',     name:'3연승',       icon:'local_fire_department', cond:st=>st.bestStreak>=3, point:20},
  {key:'streak5',     name:'5연승',       icon:'local_fire_department', cond:st=>st.bestStreak>=5, point:40},
  {key:'streak10',    name:'10연승',      icon:'local_fire_department', cond:st=>st.bestStreak>=10, point:100},
  {key:'wr70',        name:'승률 70%',    icon:'emoji_events', cond:st=>st.total>=5&&st.winRate>=70, point:30},
  {key:'wr80',        name:'승률 80%',    icon:'emoji_events', cond:st=>st.total>=5&&st.winRate>=80, point:50},
  {key:'wr90',        name:'승률 90%',    icon:'emoji_events', cond:st=>st.total>=5&&st.winRate>=90, point:80},
  {key:'matches50',   name:'라이벌 50경기', icon:'sports_kabaddi', cond:st=>st.total>=50, point:60},
  {key:'rival_killer',name:'라이벌 킬러', icon:'bolt', cond:st=>st.curStreak>=5, point:50},
  {key:'first_revenge',name:'첫 복수 성공', icon:'bolt', cond:st=>st.revenge>=1, point:20},
  {key:'revenge_king', name:'복수왕',      icon:'whatshot', cond:st=>st.revenge>=5, point:50},
  {key:'revenge10',    name:'복수 10회',   icon:'whatshot', cond:st=>st.revenge>=10, point:100},
];

function nowISO(){ return new Date().toISOString(); }
function todayStr(){ return new Date().toISOString().slice(0,10); }

/* activity log */
function pushActivity(studentId, type, text, point){
  if(!DB.activity[studentId]) DB.activity[studentId]=[];
  DB.activity[studentId].unshift({id:uid(), type, text, point:point||0, at:nowISO()});
  if(DB.activity[studentId].length>50) DB.activity[studentId].length=50;
}
function addPoints(studentId, p, reason){
  if(!p) return;
  DB.points[studentId] = (DB.points[studentId]||0) + p;
  const s = activeSeason();
  if(s){
    if(!DB.seasonPoints[s.id]) DB.seasonPoints[s.id] = {};
    DB.seasonPoints[s.id][studentId] = (DB.seasonPoints[s.id][studentId]||0) + p;
  }
}
function getPoints(studentId){ return DB.points[studentId]||0; }
function getSeasonPoints(studentId, season){
  if(!season) return 0;
  return (DB.seasonPoints[season.id] && DB.seasonPoints[season.id][studentId]) || 0;
}

/* student recent exam average (단원테스트 점수 기반) */
function recentExamAvg(studentId, n){
  const exs = [...DB.exams].sort((a,b)=>(a.date<b.date?1:-1));
  const vals=[];
  for(const ex of exs){ const v=studentTotal(ex.id, studentId); if(v!==null){ vals.push(v); if(vals.length>=(n||5)) break; } }
  return vals.length? vals.reduce((a,b)=>a+b,0)/vals.length : null;
}
/* growth rate %: compare newest half vs older half of recent n exams */
function growthRate(studentId, n){
  const exs = [...DB.exams].sort((a,b)=>(a.date<b.date?1:-1));
  const vals=[];
  for(const ex of exs){ const v=studentTotal(ex.id, studentId); if(v!==null){ vals.push(v); if(vals.length>=(n||10)) break; } }
  if(vals.length<2) return 0;
  const recent=vals[0], past=vals[vals.length-1];
  if(!past) return 0;
  return Math.round(((recent-past)/past)*1000)/10;
}
/* learning volume proxy: number of scored exams recently */
function learnVolume(studentId){
  return DB.exams.filter(ex=>studentTotal(ex.id, studentId)!==null).length;
}

/* ----- matches & statistics ----- */
function studentMatches(studentId, examType){
  return DB.rivalMatches.filter(m=>m.studentId===studentId && (!examType || m.examType===examType));
}
function computeStats(studentId, examType){
  const ms = studentMatches(studentId, examType).sort((a,b)=>(a.at<b.at?-1:1));
  let win=0,lose=0,draw=0,curStreak=0,bestStreak=0,run=0;
  ms.forEach(m=>{
    if(m.result==='win'){win++; run++; bestStreak=Math.max(bestStreak,run);}
    else if(m.result==='lose'){lose++; run=0;}
    else {draw++; run=0;}
  });
  // current streak from the end
  for(let i=ms.length-1;i>=0;i--){ if(ms[i].result==='win') curStreak++; else break; }
  const total=ms.length;
  const decided=win+lose;
  const winRate = decided? Math.round((win/decided)*1000)/10 : 0;
  const recent = ms.slice(-5).map(m=>m.result);
  const revenge = ms.filter(m=>m.revenge).length;
  return {total,win,lose,draw,winRate,curStreak,bestStreak,recent,revenge};
}

/* current rival helpers */
function getRivalId(studentId){ const r=DB.rivals[studentId]; return r? r.rivalId : null; }
/* revenge-available: with CURRENT rival, the latest match of some examType was a loss not yet avenged */
function revengeTargets(studentId){
  const rivalId = getRivalId(studentId); if(!rivalId) return [];
  const byType = {};
  DB.rivalMatches.filter(m=>m.studentId===studentId && m.rivalId===rivalId).forEach(m=>{
    byType[m.examType] = m; // last one wins (array is chronological)
  });
  return Object.values(byType).filter(m=>m.result==='lose' && !m._revengeConsumed)
    .map(m=>({examType:m.examType, rivalId}));
}
function selectedByCount(studentId){
  return Object.values(DB.rivals).filter(r=>r && r.rivalId===studentId).length;
}
function selectedByThisWeek(studentId){
  const weekAgo = Date.now()-7*86400000;
  return DB.rivalHistory.filter(h=>h.toRivalId===studentId && new Date(h.at).getTime()>=weekAgo).length;
}

/* set / change rival */
function setRival(studentId, rivalId){
  const prev = getRivalId(studentId);
  if(prev===rivalId) return;
  const firstEver = !DB.rivals[studentId];
  DB.rivals[studentId] = { rivalId, since: nowISO() };
  DB.rivalHistory.push({id:uid(), studentId, fromRivalId:prev||null, toRivalId:rivalId, at:nowISO()});
  if(prev){
    pushActivity(studentId, 'rival_change', `라이벌 변경: ${nickById(prev)} → ${nickById(rivalId)}`);
  } else {
    pushActivity(studentId, 'rival_set', `라이벌 등록: ${nickById(rivalId)}`, DB.rivalConfig.pointRules.firstRegister);
    addPoints(studentId, DB.rivalConfig.pointRules.firstRegister);
  }
  saveDB();
}
function nickById(id){ const s=DB.students.find(x=>x.id===id); return s? (s.nickname||('익명·'+s.name.slice(0,1)+'**')) : '-'; }

/* win rule -> compare two students on one exam, returns my result */
function decideResult(studentId, rivalId, examId){
  const a = studentTotal(examId, studentId);
  const b = studentTotal(examId, rivalId);
  if(a===null || b===null) return null; // need both
  const rule = DB.rivalConfig.winRule;
  if(rule==='growth'){
    const ga=growthRate(studentId), gb=growthRate(rivalId);
    return ga>gb?'win':(ga<gb?'lose':'draw');
  }
  if(rule==='mixed'){
    const sa=a+growthRate(studentId), sb=b+growthRate(rivalId);
    return sa>sb?'win':(sa<sb?'lose':'draw');
  }
  // default: score
  return a>b?'win':(a<b?'lose':'draw');
}

/* called after admin enters/updates a 단원테스트 score: recompute matches for that exam */
function recalcRivalForExam(examId){
  const exam = DB.exams.find(e=>e.id===examId); if(!exam) return;
  const examType = exam.type || '단원테스트';
  DB.students.forEach(s=>{
    const rivalId = getRivalId(s.id); if(!rivalId) return;
    // avoid duplicate match for same exam
    const dup = DB.rivalMatches.find(m=>m.studentId===s.id && m.examRef===examId);
    const res = decideResult(s.id, rivalId, examId);
    if(res===null){ return; }
    if(dup){ dup.rivalId=rivalId; dup.result=res; dup.myScore=studentTotal(examId,s.id); dup.rivalScore=studentTotal(examId,rivalId); }
    else {
      // revenge: previous match of SAME examType (with current rival) was a loss, and now win
      let isRevenge=false;
      if(res==='win'){
        const sameType = DB.rivalMatches.filter(m=>m.studentId===s.id && m.examType===examType && m.rivalId===rivalId);
        const prev = sameType[sameType.length-1];
        if(prev && prev.result==='lose' && !prev._revengeConsumed){
          isRevenge=true; prev._revengeConsumed=true;
        }
      }
      DB.rivalMatches.push({id:uid(), studentId:s.id, rivalId, examType, examRef:examId,
        myScore:studentTotal(examId,s.id), rivalScore:studentTotal(examId,rivalId), result:res, revenge:isRevenge, at:nowISO()});
      applyMatchRewards(s.id, isRevenge);
      if(res==='win') pushActivity(s.id,'win',`라이벌전 승리 (${exam.name})`, DB.rivalConfig.pointRules.win);
      if(isRevenge){
        const rb = DB.rivalConfig.pointRules.revenge||20;
        addPoints(s.id, rb);
        pushActivity(s.id,'revenge',`라이벌에게 복수에 성공했습니다.`, rb);
        s._revengeFlash = true; // consumed by UI
      }
    }
  });
  evaluateEmblems();
  refreshAllGrowth(true);   // 성장 시스템 자동 갱신(무음): 성적/라이벌 변경이 엠블럼·EXP·레벨에 반영
  saveDB();
}
/* points for a new win incl. streak bonuses */
function applyMatchRewards(studentId, isRevenge){
  const st = computeStats(studentId);
  const last = studentMatches(studentId).slice(-1)[0];
  if(!last) return;
  const pr = DB.rivalConfig.pointRules;
  if(last.result==='win'){
    let p = pr.win;
    if(st.total===1) p += pr.first; // first match win bonus
    if(st.curStreak===3) p += pr.streak3;
    if(st.curStreak===5) p += pr.streak5;
    addPoints(studentId, p);
  }
}
/* grant emblems whose condition newly satisfied */
function evaluateEmblems(){
  DB.students.forEach(s=>{
    const st = computeStats(s.id);
    if(!DB.emblems[s.id]) DB.emblems[s.id]=[];
    RIVAL_EMBLEMS.forEach(em=>{
      if(!DB.emblems[s.id].includes(em.key) && em.cond(st)){
        DB.emblems[s.id].push(em.key);
        addPoints(s.id, em.point);
        pushActivity(s.id,'emblem',`${em.name} 엠블럼 획득`, em.point);
      }
    });
  });
}

/* AI recommendation: most similar by blended metrics */
function recommendRival(studentId){
  const me = DB.students.find(x=>x.id===studentId); if(!me) return null;
  const myAvg = recentExamAvg(studentId) ?? 0;
  const myGrowth = growthRate(studentId);
  const myVol = learnVolume(studentId);
  const myPts = getPoints(studentId);
  const myWr = computeStats(studentId).winRate;
  let best=null, bestScore=Infinity, bestReasons=[];
  DB.students.forEach(o=>{
    if(o.id===studentId) return;
    const oAvg = recentExamAvg(o.id) ?? 0;
    const oGrowth = growthRate(o.id);
    const oVol = learnVolume(o.id);
    const oPts = getPoints(o.id);
    const oWr = computeStats(o.id).winRate;
    const dAvg=Math.abs(myAvg-oAvg), dGrowth=Math.abs(myGrowth-oGrowth),
          dVol=Math.abs(myVol-oVol), dPts=Math.abs(myPts-oPts)/20, dWr=Math.abs(myWr-oWr)/10;
    const dist = dAvg*1.0 + dGrowth*1.2 + dVol*1.0 + dPts*0.5 + dWr*0.8;
    if(dist<bestScore){
      bestScore=dist; best=o;
      bestReasons=[
        `최근 시험 평균이 ${Math.round(dAvg*10)/10}점 차이입니다.`,
        `최근 성장률이 ${Math.round(dGrowth*10)/10}% 차이입니다.`,
        (dVol<=1?'최근 학습량이 유사합니다.':`최근 학습량 차이 ${dVol}회.`),
      ];
    }
  });
  if(best){
    DB.recoLog.push({id:uid(), studentId, recommendedId:best.id, accepted:false, at:nowISO()});
    saveDB();
  }
  return best? {student:best, reasons:bestReasons} : null;
}
function markRecoAccepted(studentId, rivalId){
  // latest reco for this student recommending rivalId
  for(let i=DB.recoLog.length-1;i>=0;i--){
    if(DB.recoLog[i].studentId===studentId && DB.recoLog[i].recommendedId===rivalId && !DB.recoLog[i].accepted){
      DB.recoLog[i].accepted=true; break;
    }
  }
}

/* ----- seasons ----- */
function activeSeason(){ return DB.seasons.find(s=>s.active) || null; }
function seasonMatches(studentId, season){
  if(!season) return studentMatches(studentId);
  const st=new Date(season.start).getTime(), en=new Date(season.end+'T23:59:59').getTime();
  return studentMatches(studentId).filter(m=>{const t=new Date(m.at).getTime();return t>=st&&t<=en;});
}
function seasonStats(studentId, season){
  const ms=seasonMatches(studentId,season);
  let win=0,lose=0; ms.forEach(m=>{if(m.result==='win')win++;else if(m.result==='lose')lose++;});
  const decided=win+lose; return {total:ms.length,win,lose,winRate:decided?Math.round(win/decided*100):0};
}
/* season ranking by win count */
function seasonRanking(season){
  return DB.students.map(s=>({id:s.id, points:getSeasonPoints(s.id,season), ...seasonStats(s.id,season)}))
    .sort((a,b)=> b.points-a.points || b.win-a.win || b.winRate-a.winRate);
}

/* ====================================================
   RIVAL UI
   ==================================================== */
let RIVAL_TAB = 'overview';
function renderMyRival(){
  if(SESSION.role!=='student') {
    // parents: read-only summary only
    if(SESSION.role==='parent'){ renderRivalReadonly(); return; }
    return;
  }
  const wrap = document.getElementById('my-rival-wrap');
  const me = SESSION.studentId;
  const rivalId = getRivalId(me);
  const st = computeStats(me);
  const season = activeSeason();
  const ss = season? seasonStats(me, season): null;
  const cum = computeStats(me);

  const recentDots = st.recent.length? st.recent.map(r=>`<span class="rdot ${r}">${r==='win'?'승':(r==='lose'?'패':'무')}</span>`).join('') : '<span class="helper">경기 없음</span>';

  // revenge flash (one-time) + available revenge banner
  const meStu = DB.students.find(x=>x.id===me);
  let revengeFlash='';
  if(meStu && meStu._revengeFlash){
    meStu._revengeFlash=false; saveDB();
    revengeFlash = `
      <div class="revenge-flash" id="revenge-flash">
        <div class="rf-inner">
          <div class="rf-bolt">⚡</div>
          <div class="rf-title">Revenge Success!</div>
          <div class="rf-sub">지난 패배를 극복했습니다.</div>
          <div class="rf-pt">+${DB.rivalConfig.pointRules.revenge||20} Bonus Point</div>
        </div>
      </div>`;
  }
  const rt = revengeTargets(me);
  let revengeBanner='';
  if(rt.length){
    revengeBanner = `
      <div class="card revenge-avail">
        <div class="ra-left"><span class="ra-bolt">⚡</span></div>
        <div>
          <div class="ra-title">현재 Revenge 가능 &nbsp; <span class="badge badge-navy">${nickById(rt[0].rivalId)}</span></div>
          <div class="helper" style="margin-top:4px;">지난 ${rt.map(t=>t.examType).join(', ')}에서 패배 · 다음 같은 시험에서 승리하면 보너스 +${DB.rivalConfig.pointRules.revenge||20}P</div>
        </div>
      </div>`;
  }

  const rivalCard = rivalId ? `
    <div class="rival-hero">
      <div class="rival-vs">
        <div class="vs-me"><div class="vs-nick">${nickById(me)}</div><div class="vs-tag">나</div></div>
        <div class="vs-sym">VS</div>
        <div class="vs-op"><div class="vs-nick">${nickById(rivalId)}</div><div class="vs-tag">라이벌</div></div>
      </div>
      <div class="rival-stat-row">
        <div><div class="n">${st.total}</div><div class="l">총 경기</div></div>
        <div><div class="n" style="color:var(--secondary)">${st.win}</div><div class="l">승</div></div>
        <div><div class="n" style="color:var(--error)">${st.lose}</div><div class="l">패</div></div>
        <div><div class="n">${st.winRate}%</div><div class="l">승률</div></div>
        <div><div class="n">${st.curStreak}</div><div class="l">현재 연승</div></div>
        <div><div class="n">${st.bestStreak}</div><div class="l">최고 연승</div></div>
      </div>
      <div class="rival-recent">최근 경기 &nbsp; ${recentDots}</div>
    </div>` : `
    <div class="card card-pad" style="text-align:center;">
      <span class="msym" style="font-size:42px;color:var(--outline);">swords</span>
      <p style="margin:10px 0 16px;">아직 라이벌이 없습니다. AI 추천을 받거나 닉네임으로 검색해 라이벌을 정해보세요.</p>
    </div>`;

  wrap.innerHTML = `
    ${revengeFlash}
    ${revengeBanner}
    <div class="grid grid-2" style="align-items:start;margin-bottom:20px;">
      <div>${rivalCard}</div>
      <div class="card card-pad">
        <h3 class="section-title">성장 & 포인트</h3>
        <div class="rival-stat-row" style="border:none;padding:0;">
          <div><div class="n">${getPoints(me)}P</div><div class="l">포인트</div></div>
          <div><div class="n">${growthRate(me,5)>0?'+':''}${growthRate(me,5)}%</div><div class="l">최근5회 성장</div></div>
          <div><div class="n">${growthRate(me,10)>0?'+':''}${growthRate(me,10)}%</div><div class="l">최근10회 성장</div></div>
          <div><div class="n">${selectedByCount(me)}명</div><div class="l">나를 지정</div></div>
        </div>
        <p class="helper" style="margin-top:10px;">이번 주 +${selectedByThisWeek(me)}명이 나를 라이벌로 지정했습니다. (누가 지정했는지는 공개되지 않습니다)</p>
      </div>
    </div>

    <div class="rival-actions">
      <button class="btn btn-gold" onclick="doRecommend()"><span class="msym">auto_awesome</span>AI 추천</button>
      <button class="btn btn-outline" onclick="openRivalSearch()"><span class="msym">search</span>닉네임 검색</button>
      ${rivalId?`<button class="btn btn-outline" onclick="openRivalSearch()"><span class="msym">swap_horiz</span>라이벌 변경</button>`:''}
    </div>
    <div id="rival-reco-box"></div>
    <div id="rival-search-box"></div>

    ${goalCardHTML(me)}

    ${season? `
    <div class="card card-pad" style="margin-bottom:20px;">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
        <h3 class="section-title" style="margin:0;">${season.name}</h3>
        <span class="badge badge-gold">현재 순위 ${seasonRanking(season).findIndex(r=>r.id===me)+1}위</span>
      </div>
      <div class="rival-stat-row" style="border:none;">
        <div><div class="n">${ss.total}</div><div class="l">시즌 경기</div></div>
        <div><div class="n" style="color:var(--secondary)">${ss.win}</div><div class="l">승</div></div>
        <div><div class="n" style="color:var(--error)">${ss.lose}</div><div class="l">패</div></div>
        <div><div class="n">${ss.winRate}%</div><div class="l">승률</div></div>
        <div><div class="n" style="color:var(--secondary)">${getSeasonPoints(me,season)}P</div><div class="l">시즌 포인트</div></div>
      </div>
    </div>`:''}

    <div class="grid grid-2" style="align-items:start;">
      <div class="card card-pad">
        <h3 class="section-title">시험 종류별 전적</h3>
        ${rivalTypeTable(me)}
        <h4 style="font-size:13px;color:var(--secondary);margin:18px 0 8px;">전체 누적</h4>
        <div class="helper">${cum.total}전 ${cum.win}승 ${cum.lose}패 · 승률 ${cum.winRate}%</div>
      </div>
      <div class="card card-pad">
        <h3 class="section-title">🔥 라이벌 활동</h3>
        ${rivalTimeline(me)}
      </div>
    </div>`;
}

/* ===== 오늘의 목표 (자가체크, 항목별 +5P, 하루 1회) ===== */
const GOAL_DEFS = [
  {key:'problems', label:'라이벌보다 문제 20개 더 풀기', point:5},
  {key:'wrong',    label:'라이벌보다 오답 10개 더 하기', point:5},
  {key:'attend',   label:'출석 완료', point:5},
];
function todayGoals(studentId){
  if(!DB.goals[studentId]) DB.goals[studentId]={};
  const d=todayStr();
  if(!DB.goals[studentId][d]) DB.goals[studentId][d]={problems:false,wrong:false,attend:false,rewarded:0};
  return DB.goals[studentId][d];
}
function goalCardHTML(studentId){
  const g=todayGoals(studentId);
  const earned = GOAL_DEFS.filter(x=>g[x.key]).reduce((a,x)=>a+x.point,0);
  return `
    <div class="card card-pad goal-card" style="margin-bottom:20px;">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
        <h3 class="section-title" style="margin:0;">🎯 오늘의 목표</h3>
        <span class="badge badge-gold">오늘 획득 +${earned}P</span>
      </div>
      <div class="goal-list">
        ${GOAL_DEFS.map(x=>`
          <label class="goal-item ${g[x.key]?'done':''}">
            <input type="checkbox" ${g[x.key]?'checked':''} onchange="toggleGoal('${studentId}','${x.key}')">
            <span class="gbox"><span class="msym">${g[x.key]?'check_box':'check_box_outline_blank'}</span></span>
            <span class="gl">${x.label}</span>
            <span class="gp">+${x.point}P</span>
          </label>`).join('')}
      </div>
      <p class="helper" style="margin:10px 0 0;">항목을 체크하면 포인트가 지급됩니다. 보상은 하루 한 번만 적립됩니다.</p>
    </div>`;
}
function toggleGoal(studentId, key){
  const g=todayGoals(studentId);
  const def=GOAL_DEFS.find(x=>x.key===key);
  if(!g[key]){
    g[key]=true;
    addPoints(studentId, def.point);
    g.rewarded += def.point;
    pushActivity(studentId,'goal',`오늘의 목표 달성: ${def.label}`, def.point);
  } else {
    // uncheck: revoke today's point for that item (same-day correction only)
    g[key]=false;
    addPoints(studentId, -def.point);
    g.rewarded -= def.point;
  }
  saveDB();
  renderMyRival();
}

function rivalTypeTable(studentId){
  const types = ['전체', ...new Set(DB.rivalMatches.filter(m=>m.studentId===studentId).map(m=>m.examType))];
  if(types.length===1) return `<p class="helper" style="margin:0;">아직 전적이 없습니다.</p>`;
  return `<table><thead><tr><th>종류</th><th>전적</th><th>승률</th></tr></thead><tbody>${
    types.map(t=>{
      const st = computeStats(studentId, t==='전체'?null:t);
      return `<tr><td>${t}</td><td>${st.total}전 ${st.win}승 ${st.lose}패</td><td>${st.winRate}%</td></tr>`;
    }).join('')
  }</tbody></table>`;
}

function rivalTimeline(studentId){
  const acts = DB.activity[studentId]||[];
  if(!acts.length) return `<p class="helper" style="margin:0;">활동 내역이 없습니다.</p>`;
  const icon = {win:'🏆', emblem:'🎖', rival_change:'⚔', rival_set:'⚔', reco:'✅', growth:'📈', revenge:'⚡', goal:'🎯'};
  return `<div class="timeline">${acts.slice(0,12).map(a=>`
    <div class="tl-item">
      <div class="tl-when">${timeAgo(a.at)}</div>
      <div class="tl-text">${icon[a.type]||'•'} ${a.text}${a.point?` <span class="tl-pt">+${a.point}P</span>`:''}</div>
    </div>`).join('')}</div>`;
}
function timeAgo(iso){
  const d=Math.floor((Date.now()-new Date(iso).getTime())/86400000);
  if(d<=0) return '오늘'; if(d===1) return '어제'; return d+'일 전';
}

/* AI recommend */
function doRecommend(){
  const me = SESSION.studentId;
  const rec = recommendRival(me);
  const box = document.getElementById('rival-reco-box');
  document.getElementById('rival-search-box').innerHTML='';
  if(!rec){ box.innerHTML=`<div class="card card-pad"><p class="helper" style="margin:0;">추천할 수 있는 다른 학생이 없습니다.</p></div>`; return; }
  pushActivity(me,'reco',`AI가 새로운 라이벌을 추천했습니다.`); saveDB();
  box.innerHTML = `
    <div class="card card-pad reco-card">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;">
        <div>
          <div class="helper" style="margin:0;">AI 추천 라이벌</div>
          <div style="font-size:20px;font-weight:700;color:var(--primary-container);">${nickById(rec.student.id)}</div>
        </div>
        <button class="btn btn-gold" onclick="chooseRival('${rec.student.id}')"><span class="msym">check</span>이 학생을 라이벌로</button>
      </div>
      <ul class="reco-reasons">${rec.reasons.map(r=>`<li>${r}</li>`).join('')}</ul>
    </div>`;
}
function chooseRival(id){
  const me = SESSION.studentId;
  markRecoAccepted(me, id);
  setRival(me, id);
  document.getElementById('rival-reco-box').innerHTML='';
  document.getElementById('rival-search-box').innerHTML='';
  renderMyRival();
}
/* search by nickname */
function openRivalSearch(){
  document.getElementById('rival-reco-box').innerHTML='';
  const box = document.getElementById('rival-search-box');
  box.innerHTML = `
    <div class="card card-pad">
      <div class="search-box" style="margin-bottom:12px;">
        <span class="msym">search</span>
        <input type="text" id="rival-search-input" placeholder="닉네임으로 검색" oninput="renderRivalSearchResults()" style="width:100%;">
      </div>
      <div id="rival-search-results"></div>
    </div>`;
  renderRivalSearchResults();
}
function renderRivalSearchResults(){
  const q = (document.getElementById('rival-search-input')?.value||'').trim().toLowerCase();
  const me = SESSION.studentId;
  const list = DB.students.filter(s=>s.id!==me).filter(s=>{
    const nk=(s.nickname||'').toLowerCase(); return q==='' ? true : nk.includes(q);
  });
  const box = document.getElementById('rival-search-results');
  if(!list.length){ box.innerHTML=`<p class="helper" style="margin:0;">검색 결과가 없습니다.</p>`; return; }
  box.innerHTML = list.slice(0,12).map(s=>`
    <div style="display:flex;justify-content:space-between;align-items:center;padding:9px 0;border-bottom:1px solid var(--outline);">
      <span style="font-weight:600;">${s.nickname||'(닉네임 없음)'}</span>
      <button class="btn btn-outline btn-sm" onclick="chooseRival('${s.id}')">라이벌 지정</button>
    </div>`).join('');
}

/* parent read-only */
function renderRivalReadonly(){
  const wrap = document.getElementById('my-rival-wrap');
  const sid = SESSION.studentId;
  const rivalId = getRivalId(sid);
  const st = computeStats(sid);
  wrap.innerHTML = `<div class="card card-pad">
    <h3 class="section-title">${nickById(sid)} 님의 라이벌</h3>
    ${rivalId? `<p>현재 라이벌: <b>${nickById(rivalId)}</b></p><div class="helper">${st.total}전 ${st.win}승 ${st.lose}패 · 승률 ${st.winRate}%</div>`
      : `<p class="helper" style="margin:0;">아직 라이벌이 없습니다.</p>`}
  </div>`;
}

/* ===== admin rival manage ===== */
function renderRivalAdmin(){
  const wrap = document.getElementById('rival-admin-wrap');
  if(!wrap) return;
  const cfg = DB.rivalConfig;
  const season = activeSeason();
  wrap.innerHTML = `
    <div class="grid grid-2" style="align-items:start;margin-bottom:20px;">
      <div class="card card-pad">
        <h3 class="section-title">승패 기준</h3>
        <div class="field" style="margin:0;">
          <select id="rv-winrule" onchange="saveRivalConfig()">
            <option value="score">① 시험 점수</option>
            <option value="growth">② 성장률</option>
            <option value="mixed">③ 시험점수 + 성장률 혼합</option>
          </select>
        </div>
        <p class="helper">기준을 바꾸면 이후 입력되는 시험부터 적용됩니다.</p>
      </div>
      <div class="card card-pad">
        <h3 class="section-title">포인트 규칙</h3>
        <div class="field-row">
          <div class="field"><label>승리</label><input type="number" id="pr-win" value="${cfg.pointRules.win}"></div>
          <div class="field"><label>첫 승리 보너스</label><input type="number" id="pr-first" value="${cfg.pointRules.first}"></div>
        </div>
        <div class="field-row">
          <div class="field"><label>3연승</label><input type="number" id="pr-s3" value="${cfg.pointRules.streak3}"></div>
          <div class="field"><label>5연승</label><input type="number" id="pr-s5" value="${cfg.pointRules.streak5}"></div>
        </div>
        <div class="field-row">
          <div class="field"><label>복수 성공</label><input type="number" id="pr-revenge" value="${cfg.pointRules.revenge}"></div>
          <div class="field"><label>첫 라이벌 등록</label><input type="number" id="pr-reg" value="${cfg.pointRules.firstRegister}"></div>
        </div>
        <div class="field"><label>시즌 챔피언 보상</label><input type="number" id="pr-champ" value="${cfg.pointRules.seasonChampion}"></div>
        <button class="btn btn-primary btn-sm" onclick="saveRivalConfig()">포인트 규칙 저장</button>
      </div>
    </div>

    <div class="card card-pad" style="margin-bottom:20px;">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
        <h3 class="section-title" style="margin:0;">시즌</h3>
        <button class="btn btn-gold btn-sm" onclick="openSeasonPrompt()"><span class="msym">add</span>시즌 추가</button>
      </div>
      <table><thead><tr><th>시즌명</th><th>기간</th><th>상태</th><th style="text-align:right;">관리</th></tr></thead>
      <tbody>${DB.seasons.length? DB.seasons.map(s=>{
        const champ = s.championId? ((DB.students.find(x=>x.id===s.championId)||{}).name||'-') : null;
        const status = s.closed
          ? `<span class="badge badge-navy">마감</span>${champ?` <span class="helper">🏆 ${champ}</span>`:''}`
          : (s.active?'<span class="badge badge-gold">진행중</span>':'<span class="badge badge-navy">대기</span>');
        return `<tr>
        <td style="font-weight:600;">${s.name}</td><td>${s.start} ~ ${s.end}</td>
        <td>${status}</td>
        <td style="text-align:right;white-space:nowrap;">
          ${s.closed?'':`<button class="btn btn-ghost btn-sm" onclick="activateSeason('${s.id}')">활성화</button>`}
          ${(s.active&&!s.closed)?`<button class="btn btn-gold btn-sm" onclick="closeSeason('${s.id}')">마감</button>`:''}
          <button class="btn btn-danger-ghost btn-sm" onclick="deleteSeason('${s.id}')"><span class="msym">delete</span></button>
        </td></tr>`;
      }).join('') : `<tr><td colspan="4" style="text-align:center;color:var(--on-surface-variant);">등록된 시즌이 없습니다</td></tr>`}</tbody></table>
    </div>

    ${(()=>{
      const sea = activeSeason() || DB.seasons[DB.seasons.length-1];
      if(!sea) return '';
      const rk = seasonRanking(sea);
      const hasPlay = rk.some(r=>r.total>0 || r.points>0);
      return `
    <div class="card" style="margin-bottom:20px;">
      <div class="card-pad" style="border-bottom:1px solid var(--outline);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
        <h3 class="section-title" style="margin:0;">${sea.name} 순위표 ${sea.closed?'<span class="badge badge-navy">마감</span>':'<span class="badge badge-gold">진행중</span>'}</h3>
        <span class="helper">시즌 포인트 기준 · 동점 시 승수</span>
      </div>
      <div style="overflow-x:auto;"><table>
        <thead><tr><th>순위</th><th>학생</th><th>시즌 포인트</th><th>경기</th><th>승</th><th>패</th><th>승률</th></tr></thead>
        <tbody>${hasPlay? rk.map((r,i)=>{
          const s = DB.students.find(x=>x.id===r.id)||{};
          return `<tr>
            <td>${i===0?'🏆 ':''}${i+1}</td>
            <td style="font-weight:600;">${s.name||'-'} <span class="helper">(${s.nickname||'-'})</span></td>
            <td style="font-weight:700;color:var(--secondary);">${r.points}P</td>
            <td>${r.total}</td><td>${r.win}</td><td>${r.lose}</td><td>${r.winRate}%</td>
          </tr>`;
        }).join('') : `<tr><td colspan="7" style="text-align:center;color:var(--on-surface-variant);">아직 이 시즌의 경기·포인트 기록이 없습니다</td></tr>`}</tbody>
      </table></div>
    </div>`;
    })()}

    <div class="card">
      <div class="card-pad" style="border-bottom:1px solid var(--outline);"><h3 class="section-title" style="margin:0;">학생별 라이벌 관계 (실명 확인 가능)</h3></div>
      <div style="overflow-x:auto;"><table>
        <thead><tr><th>실명</th><th>닉네임</th><th>현재 라이벌</th><th>전적</th><th>연승</th><th>나를 지정</th><th>변경이력</th></tr></thead>
        <tbody>${DB.students.map(s=>{
          const st=computeStats(s.id); const rid=getRivalId(s.id);
          const changes=DB.rivalHistory.filter(h=>h.studentId===s.id).length;
          return `<tr>
            <td style="font-weight:600;">${s.name}</td>
            <td>${s.nickname||'-'}</td>
            <td>${rid? s.name&&DB.students.find(x=>x.id===rid)?DB.students.find(x=>x.id===rid).name:'-' : '<span class="helper">없음</span>'}</td>
            <td>${st.total}전 ${st.win}승 ${st.lose}패</td>
            <td>${st.curStreak} (최고 ${st.bestStreak})</td>
            <td>${selectedByCount(s.id)}명</td>
            <td>${changes}회</td>
          </tr>`;
        }).join('')}</tbody>
      </table></div>
    </div>`;
  document.getElementById('rv-winrule').value = cfg.winRule;
}
function saveRivalConfig(){
  const cfg = DB.rivalConfig;
  cfg.winRule = document.getElementById('rv-winrule').value;
  const g=(id,d)=>{const el=document.getElementById(id);return el?Number(el.value)||0:d;};
  cfg.pointRules = { win:g('pr-win',20), first:g('pr-first',10), streak3:g('pr-s3',50), streak5:g('pr-s5',100), firstRegister:g('pr-reg',20), revenge:g('pr-revenge',20), seasonChampion:g('pr-champ',200) };
  saveDB();
}
function openSeasonPrompt(){
  const name = prompt('시즌 이름 (예: 2026 Summer Season)'); if(!name) return;
  const start = prompt('시작일 (YYYY-MM-DD)', todayStr()); if(!start) return;
  const end = prompt('종료일 (YYYY-MM-DD)', todayStr()); if(!end) return;
  DB.seasons.forEach(s=>s.active=false);
  DB.seasons.push({id:uid(), name, start, end, active:true});
  saveDB(); renderRivalAdmin();
}
function activateSeason(id){ DB.seasons.forEach(s=>{ if(s.id===id && s.closed) return; s.active=(s.id===id && !s.closed); }); saveDB(); renderRivalAdmin(); }
function deleteSeason(id){ if(!confirm('삭제할까요?'))return; DB.seasons=DB.seasons.filter(s=>s.id!==id); saveDB(); renderRivalAdmin(); }
function closeSeason(id){
  const s = DB.seasons.find(x=>x.id===id); if(!s || s.closed) return;
  const rk = seasonRanking(s);
  const winner = rk.find(r=>r.total>0 || r.points>0) || null;
  const wName = winner? ((DB.students.find(x=>x.id===winner.id)||{}).name||'-') : '없음';
  if(!confirm(`'${s.name}'을(를) 마감할까요?\n\n현재 1위: ${wName}\n마감하면 순위가 확정되고 챔피언 보상이 지급됩니다. (되돌릴 수 없음)`)) return;
  s.active = false;
  s.closed = true;
  s.closedAt = nowISO();
  s.standings = rk.map(r=>({id:r.id, points:r.points, win:r.win, lose:r.lose, total:r.total, winRate:r.winRate}));
  if(winner){
    s.championId = winner.id;
    const bonus = DB.rivalConfig.pointRules.seasonChampion||200;
    // season is now inactive -> credits lifetime points only (standings already finalized)
    addPoints(winner.id, bonus);
    if(!DB.emblems[winner.id]) DB.emblems[winner.id]=[];
    const ek = 'season_champ_'+s.id;
    if(!DB.emblems[winner.id].includes(ek)) DB.emblems[winner.id].push(ek);
    pushActivity(winner.id, 'win', `${s.name} 시즌 챔피언 달성!`, bonus);
  }
  saveDB(); renderRivalAdmin();
  alert(winner? `🏆 ${wName} 학생이 ${s.name} 챔피언으로 확정되었습니다.` : `${s.name}을(를) 마감했습니다. (기록이 없어 챔피언은 지정되지 않았습니다)`);
}

/* ===== admin rival stats ===== */
function renderRivalStats(){
  const wrap = document.getElementById('rival-stats-wrap');
  if(!wrap) return;
  const studs = DB.students;
  const top = (arr, valFn, unit)=> arr.slice(0,10).map((s,i)=>`<tr><td>${i+1}</td><td>${s.name} <span class="helper">(${s.nickname||'-'})</span></td><td style="font-weight:600;">${valFn(s)}${unit||''}</td></tr>`).join('');

  const bySelected = [...studs].sort((a,b)=>selectedByCount(b.id)-selectedByCount(a.id));
  const byWinrate  = [...studs].sort((a,b)=>computeStats(b.id).winRate-computeStats(a.id).winRate);
  const byGrowth   = [...studs].sort((a,b)=>growthRate(b.id)-growthRate(a.id));
  const byStreak   = [...studs].sort((a,b)=>computeStats(b.id).bestStreak-computeStats(a.id).bestStreak);
  const byChanges  = [...studs].sort((a,b)=>DB.rivalHistory.filter(h=>h.studentId===b.id).length - DB.rivalHistory.filter(h=>h.studentId===a.id).length);

  // exam-type winrate (aggregate)
  const types = [...new Set(DB.rivalMatches.map(m=>m.examType))];
  const typeRows = types.length? types.map(t=>{
    const ms=DB.rivalMatches.filter(m=>m.examType===t);
    const w=ms.filter(m=>m.result==='win').length, l=ms.filter(m=>m.result==='lose').length;
    const dec=w+l; return `<tr><td>${t}</td><td>${ms.length}전</td><td>${dec?Math.round(w/dec*100):0}%</td></tr>`;
  }).join('') : `<tr><td colspan="3" style="text-align:center;color:var(--on-surface-variant);">데이터 없음</td></tr>`;

  // AI reco success rate
  const recoTotal = DB.recoLog.length, recoOk = DB.recoLog.filter(r=>r.accepted).length;
  const recoRate = recoTotal? Math.round(recoOk/recoTotal*100):0;
  // participation: students with at least one rival
  const participants = studs.filter(s=>getRivalId(s.id)).length;
  const partRate = studs.length? Math.round(participants/studs.length*100):0;

  const card = (title, bodyRows, head)=>`<div class="card card-pad"><h3 class="section-title">${title}</h3>
    <table><thead><tr>${head}</tr></thead><tbody>${bodyRows}</tbody></table></div>`;

  wrap.innerHTML = `
    <div class="grid grid-3" style="margin-bottom:20px;">
      <div class="card stat-card"><div class="lbl"><span class="msym">auto_awesome</span>AI 추천 성공률</div><div class="val">${recoRate}%</div><div class="sub">${recoOk}/${recoTotal} 채택</div></div>
      <div class="card stat-card gold"><div class="lbl"><span class="msym">groups</span>학생 참여율</div><div class="val">${partRate}%</div><div class="sub">${participants}/${studs.length}명 라이벌 보유</div></div>
      <div class="card stat-card"><div class="lbl"><span class="msym">sports_kabaddi</span>총 라이벌전</div><div class="val">${DB.rivalMatches.length}전</div><div class="sub">누적 경기수</div></div>
    </div>
    <div class="grid grid-2" style="align-items:start;">
      ${card('라이벌 지정 많은 학생 TOP10', top(bySelected, s=>selectedByCount(s.id), '명'), '<th>순위</th><th>학생</th><th>지정수</th>')}
      ${card('승률 TOP10', top(byWinrate, s=>computeStats(s.id).winRate, '%'), '<th>순위</th><th>학생</th><th>승률</th>')}
      ${card('성장률 TOP10', top(byGrowth, s=>(growthRate(s.id)>0?'+':'')+growthRate(s.id), '%'), '<th>순위</th><th>학생</th><th>성장률</th>')}
      ${card('연승 TOP10', top(byStreak, s=>computeStats(s.id).bestStreak, '연승'), '<th>순위</th><th>학생</th><th>최고연승</th>')}
      ${card('라이벌 변경 많은 학생', top(byChanges, s=>DB.rivalHistory.filter(h=>h.studentId===s.id).length, '회'), '<th>순위</th><th>학생</th><th>변경수</th>')}
      <div class="card card-pad"><h3 class="section-title">시험별 승률</h3>
        <table><thead><tr><th>시험 종류</th><th>경기수</th><th>승률</th></tr></thead><tbody>${typeRows}</tbody></table></div>
    </div>`;
}

