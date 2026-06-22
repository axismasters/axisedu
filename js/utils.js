/* ============================================================
   AXIS LMS · utils.js
   (이 파일은 원본 app.js의 연속 구간이며, index.html에서
    원본과 동일한 순서로 로드되어 동작이 100% 동일합니다.)
   ============================================================ */
/* ===== 공통 유틸 (검증 / 참조 정리) ===== */
/** 휴대폰 형식 검사: 010xxxxxxxx / 010-xxxx-xxxx 등 (01로 시작, 숫자 10~11자리) */
function isValidPhone(p){ return /^01[0-9]{8,9}$/.test((p||'').replace(/[^0-9]/g,'')); }

/** 학생 삭제 시 흩어진 모든 참조를 정리한다 (라이벌/매치/포인트/연결 등 dangling 방지) */
function purgeStudentRefs(id){
  try{
    if(DB.rivals){
      Object.keys(DB.rivals).forEach(sid=>{ if(DB.rivals[sid] && DB.rivals[sid].rivalId===id) delete DB.rivals[sid]; });
      delete DB.rivals[id];
    }
    DB.rivalMatches  = (DB.rivalMatches||[]).filter(m=> m && m.studentId!==id && m.rivalId!==id);
    DB.rivalHistory  = (DB.rivalHistory||[]).filter(h=> h && h.studentId!==id && h.fromRivalId!==id && h.toRivalId!==id);
    DB.recoLog       = (DB.recoLog||[]).filter(r=> r && r.studentId!==id && r.recommendedId!==id);
    Object.values(DB.scores||{}).forEach(map=>{ if(map) delete map[id]; });
    ['activity','points','emblems','goals','achievement'].forEach(k=>{ if(DB[k]) delete DB[k][id]; });
    if(DB.seasonPoints) Object.keys(DB.seasonPoints).forEach(seasonId=>{ if(DB.seasonPoints[seasonId]) delete DB.seasonPoints[seasonId][id]; });
    if(Array.isArray(DB.guardianLinks)) DB.guardianLinks = DB.guardianLinks.filter(l=> l && l.studentId!==id);
    if(Array.isArray(DB.parents)) DB.parents = DB.parents.filter(p=> p && DB.guardianLinks.some(l=> l.parentId===p.id)); // 고아 학부모 정리
  }catch(e){ console.error('purgeStudentRefs failed', e); }
}

/** 시험 삭제 시 점수 + 해당 시험을 참조하는 라이벌 매치를 정리한다 */
function purgeExamRefs(id){
  try{
    if(DB.scores) delete DB.scores[id];
    DB.rivalMatches = (DB.rivalMatches||[]).filter(m=> m && m.examRef!==id);
  }catch(e){ console.error('purgeExamRefs failed', e); }
}

/** 차트 데이터가 없을 때 캔버스에 안내 문구 출력 */
function chartEmpty(canvas, msg){
  if(!canvas || !canvas.getContext) return;
  const w = canvas.width || canvas.clientWidth || 320, h = canvas.height || canvas.clientHeight || 160;
  const c = canvas.getContext('2d'); if(!c) return;
  c.clearRect(0,0,w,h); c.save();
  c.fillStyle='#9aa3b5'; c.textAlign='center'; c.textBaseline='middle';
  c.font='14px "Hanken Grotesk", sans-serif';
  c.fillText(msg, w/2, h/2); c.restore();
}
function uid(){ return 'id_' + Math.random().toString(36).slice(2,10) + Date.now().toString(36); }

/** 공통 조회 헬퍼 (없으면 null) — 곳곳의 중복 find 패턴 대체용 */
function findStudent(id){ return (DB.students||[]).find(s=>s&&s.id===id) || null; }
function findExam(id){ return (DB.exams||[]).find(e=>e&&e.id===id) || null; }
function findTeacher(id){ return (DB.teachers||[]).find(t=>t&&t.id===id) || null; }
/* 공통 모달 열기/닫기 (overlay id 기준) */
function openModal(id){ const m=document.getElementById(id); if(m) m.classList.add('active'); }
function closeModal(id){ const m=document.getElementById(id); if(m) m.classList.remove('active'); }
/* 계정 생성 결과 분류/집계 (성공/기존/실패) */
function classifyAcctResult(r){
  if(r && r.ok) return 'ok';
  if(/already|exists|registered/i.test((r && r.error) || '')) return 'exists';
  return 'fail';
}
function acctTally(results){
  let ok=0, ex=0, fail=0; const failed=[];
  (results||[]).forEach(r=>{
    const k = classifyAcctResult(r);
    if(k==='ok') ok++;
    else if(k==='exists') ex++;
    else { fail++; failed.push(`${r.name}(${r.login_id}): ${r.error||''}`); }
  });
  return { ok, ex, fail, failed };
}

/* ---------- seed sample data (only if empty) ---------- */
function seedIfEmpty(){
  if(DB.students.length) return;

  DB.teachers = [
    {id: uid(), name:'최고문', subject:'고등 수학', phone:'010-1000-0001'},
    {id: uid(), name:'박서준', subject:'중등 수학', phone:'010-1000-0002'},
  ];
  const tHigh = DB.teachers[0].id, tMid = DB.teachers[1].id;

  const names = ['김민준','이서연','박지호','정하윤','최도윤','강서아'];
  const nicks = ['민준파이터','서연샤프','지호제로','하윤스타','도윤킹','서아무적'];
  const grades = ['중1','중1','중2','중2','중3','중3'];
  DB.students = names.map((n,i)=>({
    id: uid(), name:n, nickname:nicks[i], grade:grades[i], cls:'A반',
    account:'student'+(i+1),
    phone:'010-2000-000'+(i+1),
    parentPhone:'010-3000-000'+(i+1),
    kakao:'', parentKakao:'', note:'',
    teacherId: i<4 ? tMid : tHigh,
    courseTrack: i%2===0 ? '현행' : '선행',
    courseLevel: i%3===0 ? '심화' : '기본',
    courseStage: i<4 ? 'mid' : 'high',
    courseSubjects: i<4 ? [MID_SUBJECTS[i]] : [HIGH_SUBJECTS[i-4]],
    naesin: [],   // 내신: [{id,term,subject,score,rank,total}]
    mock: [],     // 모의고사: [{id,date,name,subjects:{국어,수학,영어,탐구}}]
    createdAt: new Date().toISOString().slice(0,10)
  }));

  // exam 1: question-based (5 mc + 1 essay), exam 2: legacy total
  const q1 = [
    {no:1, points:15, type:'mc'},
    {no:2, points:15, type:'mc'},
    {no:3, points:15, type:'mc'},
    {no:4, points:15, type:'mc'},
    {no:5, points:20, type:'mc'},
    {no:6, points:20, type:'essay'},
  ];
  DB.exams = [
    {id: uid(), name:'5월 단원평가', date:'2026-05-10', type:'중간고사', max:100, questions:q1},
    {id: uid(), name:'6월 모의고사', date:'2026-06-10', type:'모의고사', max:100, questions:[]},
  ];

  // scores for exam1 (question-based)
  const ex1 = DB.exams[0];
  DB.scores[ex1.id] = {};
  DB.students.forEach((s,si)=>{
    const byQ = {};
    ex1.questions.forEach((q,qi)=>{
      if(q.type==='mc'){
        byQ[q.no] = { correct: (si+qi)%4 !== 0 }; // mostly correct
      } else {
        byQ[q.no] = { got: Math.max(0, q.points - (si%3)*5) };
      }
    });
    DB.scores[ex1.id][s.id] = { byQ };
  });

  // scores for exam2 (legacy total)
  const ex2 = DB.exams[1];
  DB.scores[ex2.id] = {};
  DB.students.forEach((s,si)=>{
    DB.scores[ex2.id][s.id] = Math.max(45, Math.min(100, 72 + (si*6) % 28 - 4));
  });

  // sample lectures
  DB.lectures = [
    {id:uid(), title:'이차방정식 핵심 정리', stage:'mid', subject:'중2-1', teacherId:tMid,
     youtube:'https://youtu.be/dQw4w9WgXcQ', note:'교재 p.42~58 / 판서 요약은 첨부 노트 참고. 근의 공식 유도 과정 복습 필수.',
     date:'2026-06-05'},
    {id:uid(), title:'미적분 극한 개념', stage:'high', subject:'미적분1', teacherId:tHigh,
     youtube:'https://youtu.be/dQw4w9WgXcQ', note:'극한의 정의와 좌극한/우극한. 다음 시간 도함수 들어갑니다.',
     date:'2026-06-08'},
  ];

  // sample season
  DB.seasons = [{id:uid(), name:'2026 Summer Season', start:'2026-06-01', end:'2026-08-31', active:true}];

  // sample rival pairings (mutual-ish), then generate matches from existing exams
  const S = DB.students;
  const pairs = [[0,1],[2,3],[4,5],[1,0],[3,2],[5,4]];
  pairs.forEach(([a,b])=>{
    if(S[a] && S[b]){
      DB.rivals[S[a].id] = { rivalId:S[b].id, since:'2026-06-01T00:00:00.000Z' };
      DB.rivalHistory.push({id:uid(), studentId:S[a].id, fromRivalId:null, toRivalId:S[b].id, at:'2026-06-01T00:00:00.000Z'});
    }
  });
  saveDB();
  // generate matches & rewards from existing exam scores (in date order)
  [...DB.exams].sort((a,b)=>(a.date>b.date?1:-1)).forEach(ex=> recalcRivalForExam(ex.id));

  saveDB();
}

/* ---------- navigation ---------- */
document.querySelectorAll('.nav a').forEach(a=>{
  a.addEventListener('click', ()=>{
    const navParent = a.closest('.nav');
    if(navParent) navParent.querySelectorAll('a').forEach(x=>x.classList.remove('active'));
    a.classList.add('active');
    const view = a.dataset.view;
    document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
    const viewEl = document.getElementById('view-'+view);
    if(viewEl) viewEl.classList.add('active');
    renderAll();
    // charts need a visible container to size correctly
    if(view==='stats'){ renderStatsCharts(); }
    if(view==='my-trend'){ renderMyTrend(); }
  });
});

/* ---------- helpers ---------- */
function studentName(id){
  const s = findStudent(id);
  return s ? s.name : '(삭제된 학생)';
}
function teacherName(id){
  const t = findTeacher(id);
  return t ? t.name : '';
}
function courseLabel(s){
  if(!s) return '';
  const parts = [];
  if(s.courseTrack) parts.push(s.courseTrack);
  if(s.courseLevel) parts.push(s.courseLevel);
  const subs = studentSubjects(s);
  if(subs.length) parts.push(subs.join(', '));
  return parts.join(' · ');
}
/* resolve a student's total for an exam, handling both schemas. returns number or null */
function studentTotal(examId, studentId){
  const map = DB.scores[examId];
  if(!map) return null;
  const v = map[studentId];
  if(v===null || v===undefined || v==='') return null;
  if(typeof v === 'object'){
    const exam = findExam(examId);
    if(!exam || !exam.questions || !exam.questions.length) return null;
    let sum = 0, answered = false;
    exam.questions.forEach(q=>{
      const r = v.byQ ? v.byQ[q.no] : null;
      if(!r) return;
      if(q.type==='mc'){
        if(r.correct===true){ sum += Number(q.points)||0; answered = true; }
        else if(r.correct===false){ answered = true; }
      } else {
        if(r.got!==undefined && r.got!=='' && r.got!==null){ sum += Number(r.got)||0; answered = true; }
      }
    });
    return answered ? sum : null;
  }
  return Number(v);
}
function examScoreList(examId){
  const map = DB.scores[examId] || {};
  return Object.keys(map)
    .map(sid=>({studentId:sid, score:studentTotal(examId, sid)}))
    .filter(x=>x.score!==null && x.score!==undefined && !isNaN(x.score));
}
function examAverage(examId){
  const list = examScoreList(examId);
  if(!list.length) return null;
  const sum = list.reduce((a,b)=>a+b.score,0);
  return sum/list.length;
}
function examRanks(examId){
  const list = examScoreList(examId).sort((a,b)=>b.score-a.score);
  let rank = 0, lastScore = null;
  return list.map((item,idx)=>{
    if(item.score !== lastScore){ rank = idx+1; lastScore = item.score; }
    return {...item, rank};
  });
}
function fmt(n){ return (n===null||n===undefined||isNaN(n)) ? '-' : Math.round(n*10)/10; }

