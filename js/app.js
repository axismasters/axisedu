const LOGO_SRC = 'data:image/png;base64,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';
/* ---------- storage ---------- */
const STORE_KEY = 'axis_gradebook_v2';
/* DB.scores[examId][studentId] can be:
   - a number / '' (legacy total score), OR
   - an object { byQ: { qNo: {correct:bool}|{got:number} }, total:number }
   examScoreTotal() resolves both. */
let DB = { students: [], teachers: [], exams: [], scores: {}, lectures: [],
  rivals: {},          // studentId -> { rivalId, since }
  rivalHistory: [],    // {id, studentId, fromRivalId, toRivalId, at}
  rivalMatches: [],    // {id, studentId, rivalId, examType, examRef, myScore, rivalScore, result, at}
  activity: {},        // studentId -> [{id, type, text, point, at}]
  points: {},          // studentId -> number
  emblems: {},         // studentId -> [emblemKey...]
  rivalConfig: { winRule:'score', pointRules:{win:20,streak3:50,streak5:100,first:10,firstRegister:20,revenge:20,seasonChampion:200} },
  seasons: [],         // {id, name, start, end, active, closed, closedAt, championId, standings}
  seasonPoints: {},    // seasonId -> { studentId -> number }
  recoLog: [],         // {id, studentId, recommendedId, accepted, at}
  goals: {}            // studentId -> { 'YYYY-MM-DD': {problems:bool, wrong:bool, attend:bool, rewarded:number} }
};

/* course option sets */
const MID_SUBJECTS = ['중1-1','중1-2','중2-1','중2-2','중3-1','중3-2'];
const HIGH_SUBJECTS = ['공통수학1','공통수학2','대수','미적분1','미적분2','확률과통계','기하'];
const SPECIAL_SUBJECTS = ['특강-내신대비','특강-모의고사','특강-심화','특강-서술형','특강-기타'];
/* normalize a student's course subjects into an array */
function studentSubjects(s){
  if(!s) return [];
  if(Array.isArray(s.courseSubjects)) return s.courseSubjects;
  if(s.courseSubject) return [s.courseSubject];
  return [];
}

function loadDB(){
  try{
    const raw = localStorage.getItem(STORE_KEY);
    if(raw) DB = JSON.parse(raw);
  }catch(e){ console.error('load failed', e); }
  if(!DB.teachers) DB.teachers = [];
  if(!DB.lectures) DB.lectures = [];
  if(!DB.rivals) DB.rivals = {};
  if(!DB.rivalHistory) DB.rivalHistory = [];
  if(!DB.rivalMatches) DB.rivalMatches = [];
  if(!DB.activity) DB.activity = {};
  if(!DB.points) DB.points = {};
  if(!DB.emblems) DB.emblems = {};
  if(!DB.rivalConfig) DB.rivalConfig = { winRule:'score', pointRules:{win:20,streak3:50,streak5:100,first:10,firstRegister:20,revenge:20} };
  if(!DB.seasons) DB.seasons = [];
  if(!DB.recoLog) DB.recoLog = [];
  if(DB.rivalConfig && DB.rivalConfig.pointRules && DB.rivalConfig.pointRules.revenge===undefined) DB.rivalConfig.pointRules.revenge=20;
  if(DB.rivalConfig && DB.rivalConfig.pointRules && DB.rivalConfig.pointRules.seasonChampion===undefined) DB.rivalConfig.pointRules.seasonChampion=200;
  if(!DB.seasonPoints) DB.seasonPoints = {};
  if(!DB.goals) DB.goals = {};
  if(!DB.achievement) DB.achievement = {};   // studentId -> achievementData (Growth System)
  if(!DB.auth) DB.auth = {};                  // { master, creds }  (로그인 자격증명)
  if(!Array.isArray(DB.parents)) DB.parents = [];             // 학부모 계정 (휴대폰 dedupe)
  if(!Array.isArray(DB.guardianLinks)) DB.guardianLinks = []; // 보호자-학생 M:N 연결
  if(!Array.isArray(DB.notices)) DB.notices = [];     // 공지 {id,title,body,scope,createdAt}
  if(!Array.isArray(DB.homeworks)) DB.homeworks = []; // 숙제 {id,title,subject,dueDate,teacherId,createdAt,done:{sid:true}}
  if(!Array.isArray(DB.schedules)) DB.schedules = []; // 일정 {id,type('수업'|'상담'),title,date,time,studentId,teacherId,createdAt}
}
function saveDB(){
  try{ if(typeof Auth!=='undefined') Auth.sync(); }catch(e){ console.error('auth sync failed', e); }
  let okLocal = false;
  try{
    localStorage.setItem(STORE_KEY, JSON.stringify(DB));
    okLocal = true;
  }catch(e){
    console.error('save failed', e);
    const quota = e && (e.name==='QuotaExceededError' || e.code===22 || /quota|exceeded/i.test(e.message||''));
    if(!saveDB._warned){
      saveDB._warned = true;
      alert(quota
        ? '저장 공간이 가득 찼습니다. 불필요한 데이터를 정리하거나 백업 후 삭제해 주세요.'
        : '데이터 저장에 실패했습니다. (시크릿 모드 등에서는 저장이 제한될 수 있습니다)');
    }
  }
  // 클라우드 연결 시 서버에도 반영 (staff만 쓰기 가능, 실패해도 로컬은 유지)
  try{ if(window.CLOUD && window.CLOUD.enabled) window.CLOUD.scheduleSave(); }catch(e){ console.error('cloud schedule failed', e); }
  return okLocal;
}

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
  const s = DB.students.find(x=>x.id===id);
  return s ? s.name : '(삭제된 학생)';
}
function teacherName(id){
  const t = DB.teachers.find(x=>x.id===id);
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
    const exam = DB.exams.find(e=>e.id===examId);
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

/* ---------- render: dashboard ---------- */
/* ===== 공지 / 숙제 / 일정 (운영 데이터) ===== */
function todayStr(){ return new Date().toISOString().slice(0,10); }

function activeNotices(scope){
  const list = (DB.notices||[]).slice().sort((a,b)=>((a.createdAt||'')<(b.createdAt||'')?1:-1));
  if(!scope || scope==='all') return list;
  return list.filter(n=> !n.scope || n.scope==='all' || n.scope===scope);
}
function openNoticeModal(){ if(!isStaff()){alert('공지는 선생님/마스터만 등록할 수 있습니다.');return;}
  document.getElementById('notice-title').value='';
  document.getElementById('notice-body').value='';
  document.getElementById('notice-scope').value='all';
  document.getElementById('notice-modal-overlay').classList.add('active');
}
function closeNoticeModal(){ const m=document.getElementById('notice-modal-overlay'); if(m) m.classList.remove('active'); }
function saveNotice(){
  const title=document.getElementById('notice-title').value.trim();
  if(!title){ alert('공지 제목을 입력해주세요.'); return; }
  DB.notices.unshift({id:uid(), title, body:document.getElementById('notice-body').value.trim(),
    scope:document.getElementById('notice-scope').value||'all', createdAt:nowISO()});
  saveDB(); closeNoticeModal(); renderAll();
}
function deleteNotice(id){ if(!confirm('이 공지를 삭제하시겠습니까?')) return;
  DB.notices=(DB.notices||[]).filter(n=>n.id!==id); saveDB(); renderAll(); }

function dueHomeworks(){ const t=todayStr();
  return (DB.homeworks||[]).filter(h=> !h.dueDate || h.dueDate>=t).sort((a,b)=>((a.dueDate||'')>(b.dueDate||'')?1:-1)); }
function homeworkStats(h){ const targets=managedStudents(); return {total:targets.length, done:targets.filter(s=> h.done && h.done[s.id]).length}; }
function openHomeworkModal(){ if(!isStaff()){alert('숙제는 선생님/마스터만 등록할 수 있습니다.');return;}
  document.getElementById('hw-title').value='';
  document.getElementById('hw-subject').value='';
  document.getElementById('hw-due').value=todayStr();
  document.getElementById('homework-modal-overlay').classList.add('active');
}
function closeHomeworkModal(){ const m=document.getElementById('homework-modal-overlay'); if(m) m.classList.remove('active'); }
function saveHomework(){
  const title=document.getElementById('hw-title').value.trim();
  if(!title){ alert('숙제 제목을 입력해주세요.'); return; }
  const due=document.getElementById('hw-due').value;
  if(due && isNaN(new Date(due).getTime())){ alert('마감일이 올바르지 않습니다.'); return; }
  DB.homeworks.unshift({id:uid(), title, subject:document.getElementById('hw-subject').value.trim(),
    dueDate:due, teacherId:(SESSION&&SESSION.teacherId)||'', createdAt:nowISO(), done:{}});
  saveDB(); closeHomeworkModal(); renderAll();
}
function deleteHomework(id){ if(!confirm('이 숙제를 삭제하시겠습니까?')) return;
  DB.homeworks=(DB.homeworks||[]).filter(h=>h.id!==id); saveDB(); renderAll(); }
function toggleHomeworkDone(hid, sid){ const h=(DB.homeworks||[]).find(x=>x.id===hid); if(!h) return;
  if(!h.done) h.done={}; if(h.done[sid]) delete h.done[sid]; else h.done[sid]=true; saveDB(); renderAll(); }

function todaySchedules(type){ const t=todayStr();
  return (DB.schedules||[]).filter(s=> s.date===t && (!type||s.type===type)).sort((a,b)=>((a.time||'')>(b.time||'')?1:-1)); }
function openScheduleModal(type){ if(!isStaff()){alert('일정은 선생님/마스터만 등록할 수 있습니다.');return;}
  document.getElementById('sch-type').value=type||'수업';
  document.getElementById('sch-title').value='';
  document.getElementById('sch-date').value=todayStr();
  document.getElementById('sch-time').value='';
  const ssel=document.getElementById('sch-student');
  if(ssel) ssel.innerHTML='<option value="">(개별 학생 선택 안 함)</option>'+managedStudents().map(s=>`<option value="${s.id}">${s.name}</option>`).join('');
  document.getElementById('schedule-modal-overlay').classList.add('active');
}
function closeScheduleModal(){ const m=document.getElementById('schedule-modal-overlay'); if(m) m.classList.remove('active'); }
function saveSchedule(){
  const title=document.getElementById('sch-title').value.trim();
  if(!title){ alert('일정 제목을 입력해주세요.'); return; }
  const date=document.getElementById('sch-date').value;
  if(!date){ alert('날짜를 선택해주세요.'); return; }
  const ssel=document.getElementById('sch-student');
  DB.schedules.unshift({id:uid(), type:document.getElementById('sch-type').value||'수업', title, date,
    time:document.getElementById('sch-time').value, studentId:ssel?ssel.value:'',
    teacherId:(SESSION&&SESSION.teacherId)||'', createdAt:nowISO()});
  saveDB(); closeScheduleModal(); renderAll();
}
function deleteSchedule(id){ if(!confirm('이 일정을 삭제하시겠습니까?')) return;
  DB.schedules=(DB.schedules||[]).filter(s=>s.id!==id); saveDB(); renderAll(); }

function nextExamDDay(){ const t=todayStr();
  const up=(DB.exams||[]).filter(e=>e.date && e.date>=t).sort((a,b)=>(a.date>b.date?1:-1))[0];
  if(!up) return null;
  const d=Math.round((new Date(up.date+'T00:00:00')-new Date(t+'T00:00:00'))/86400000);
  return { name:up.name, date:up.date, dday:d };
}
function decliningStudents(){ const out=[];
  managedStudents().forEach(s=>{
    const totals=(DB.exams||[]).map(e=>({d:e.date,sc:studentTotal(e.id,s.id)}))
      .filter(x=>x.sc!==null&&x.sc!==undefined&&!isNaN(x.sc))
      .sort((a,b)=>((a.d||'')>(b.d||'')?1:-1)).map(x=>x.sc);
    if(totals.length>=2){ const drop=totals[totals.length-1]-totals[totals.length-2];
      if(drop<=-5) out.push({name:s.name, id:s.id, grade:s.grade, drop}); }
  });
  return out.sort((a,b)=>a.drop-b.drop);
}

function renderDashboardToday(){
  const box=document.getElementById('dash-today'); if(!box) return;
  const staff=isStaff();
  const t=todayStr();
  const todayClasses=todaySchedules('수업'), todayConsults=todaySchedules('상담');
  const todayExams=(DB.exams||[]).filter(e=>e.date===t);
  const hws=dueHomeworks(), notices=activeNotices('all').slice(0,4), declining=decliningStudents(), dday=nextExamDDay();
  const sName=id=>{const s=findStudent(id);return s?s.name:'';};

  const bits=[];
  if(todayExams.length) bits.push(`오늘 시험 <b>${todayExams.length}건</b>`);
  if(todayClasses.length) bits.push(`오늘 수업 <b>${todayClasses.length}건</b>`);
  if(todayConsults.length) bits.push(`상담 <b>${todayConsults.length}건</b>`);
  const dueToday=hws.filter(h=>h.dueDate===t).length;
  if(dueToday) bits.push(`오늘 마감 숙제 <b>${dueToday}건</b>`);
  if(declining.length) bits.push(`성적 하락 주의 <b>${declining.length}명</b>`);
  const aiMsg = bits.length ? bits.join(' · ')+' 입니다. 우선순위대로 챙겨보세요.' : '오늘 급한 일정은 없습니다. 학생 성장 현황을 점검해 보세요.';

  const addBtn=(fn,label)=> staff?`<button class="btn btn-gold btn-sm today-add" onclick="${fn}"><span class="msym">add</span>${label}</button>`:'';
  const del=(fn)=> staff?`<button class="lk-del" onclick="${fn}" title="삭제"><span class="msym">close</span></button>`:'';
  const empty=m=>`<div class="today-empty">${m}</div>`;
  const card=(icon,title,btn,inner)=>`<div class="card today-card"><div class="today-h"><span class="msym">${icon}</span><span class="tt">${title}</span>${btn||''}</div><div class="today-c">${inner}</div></div>`;

  box.innerHTML = `
    <div class="card ai-alert"><div class="ai-h"><span class="msym">smart_toy</span>AI 알림</div><div class="ai-b">${aiMsg}</div></div>
    <div class="today-grid">
      ${card('event_available','오늘 수업', addBtn("openScheduleModal('수업')",'추가'),
        todayClasses.length? todayClasses.map(s=>`<div class="today-item"><span>${s.time?`<b>${s.time}</b> `:''}${s.title}${s.studentId?` · ${sName(s.studentId)}`:''}</span>${del(`deleteSchedule('${s.id}')`)}</div>`).join('') : empty('오늘 등록된 수업이 없습니다.'))}
      ${card('quiz','오늘 시험','',
        todayExams.length? todayExams.map(e=>`<div class="today-item"><span>${e.name} <span class="badge badge-navy">${e.type}</span></span></div>`).join('') : empty('오늘 예정된 시험이 없습니다.'))}
      ${card('record_voice_over','오늘 상담', addBtn("openScheduleModal('상담')",'추가'),
        todayConsults.length? todayConsults.map(s=>`<div class="today-item"><span>${s.time?`<b>${s.time}</b> `:''}${s.title}${s.studentId?` · ${sName(s.studentId)}`:''}</span>${del(`deleteSchedule('${s.id}')`)}</div>`).join('') : empty('오늘 예정된 상담이 없습니다.'))}
      ${card('assignment','숙제 제출', addBtn('openHomeworkModal()','추가'),
        hws.length? hws.slice(0,4).map(h=>{const st=homeworkStats(h);return `<div class="today-item"><span>${h.title}${h.dueDate?` <span class="helper">~${h.dueDate}</span>`:''}<br><span class="helper">제출 ${st.done}/${st.total}</span></span>${del(`deleteHomework('${h.id}')`)}</div>`;}).join('') : empty('등록된 숙제가 없습니다.'))}
      ${card('campaign','공지', addBtn('openNoticeModal()','추가'),
        notices.length? notices.map(n=>`<div class="today-item"><span><b>${n.title}</b>${n.body?`<br><span class="helper">${n.body}</span>`:''}</span>${del(`deleteNotice('${n.id}')`)}</div>`).join('') : empty('등록된 공지가 없습니다.'))}
      ${card('trending_down','최근 성적 하락','',
        declining.length? declining.slice(0,5).map(d=>`<div class="today-item"><span class="sd-name-link" onclick="openStudentDrawer('${d.id}')">${d.name} <span class="helper">${d.grade||''}</span></span><span class="badge badge-red">${d.drop}점</span></div>`).join('') : empty('성적이 하락한 학생이 없습니다.'))}
    </div>
    ${dday?`<div class="card dday-card"><span class="msym">flag</span>다음 시험 <b>${dday.name}</b> · ${dday.dday===0?'<b style="color:#eac076;">오늘!</b>':`<b style="color:#eac076;">D-${dday.dday}</b>`} <span class="helper">(${dday.date})</span></div>`:''}
  `;
}
function renderDashboard(){
  renderDashboardToday();
  const mine = managedStudents();
  const mineIds = new Set(mine.map(s=>s.id));
  const teacherScoped = isTeacherUser();
  const totalStudents = mine.length;
  const totalExams = DB.exams.length;
  // averages scoped to managed students for teachers,全体 for admin
  const scoreOf = (examId)=> examScoreList(examId).filter(x=> teacherScoped ? mineIds.has(x.studentId) : true);
  const allScores = DB.exams.flatMap(ex=>scoreOf(ex.id).map(s=>s.score));
  const overallAvg = allScores.length ? allScores.reduce((a,b)=>a+b,0)/allScores.length : null;
  const lastExam = [...DB.exams].sort((a,b)=> (a.date<b.date?1:-1))[0];
  const lastList = lastExam ? scoreOf(lastExam.id) : [];
  const lastAvg = lastList.length ? lastList.reduce((a,b)=>a+b.score,0)/lastList.length : null;

  document.getElementById('dash-stats').innerHTML = `
    <div class="card stat-card">
      <div class="lbl"><span class="msym">group</span>${teacherScoped?'담당 학생':'전체 학생'}</div>
      <div class="val">${totalStudents}명</div>
      <div class="sub">${teacherScoped?'내가 담당하는 학생':'등록된 학생 수'}</div>
    </div>
    <div class="card stat-card gold">
      <div class="lbl"><span class="msym">quiz</span>등록된 시험</div>
      <div class="val">${totalExams}회</div>
      <div class="sub">전체 시험 횟수</div>
    </div>
    <div class="card stat-card">
      <div class="lbl"><span class="msym">analytics</span>${teacherScoped?'담당 평균':'전체 평균'}</div>
      <div class="val">${fmt(overallAvg)}</div>
      <div class="sub">모든 시험 평균 점수</div>
    </div>
    <div class="card stat-card gold">
      <div class="lbl"><span class="msym">event</span>최근 시험 평균</div>
      <div class="val">${fmt(lastAvg)}</div>
      <div class="sub">${lastExam ? lastExam.name : '시험 없음'}</div>
    </div>
  `;

  const recentExams = [...DB.exams].sort((a,b)=> (a.date<b.date?1:-1)).slice(0,5);
  document.getElementById('dash-recent-exams').innerHTML = recentExams.length ? recentExams.map(ex=>{
    const list = scoreOf(ex.id);
    const avg = list.length ? list.reduce((a,b)=>a+b.score,0)/list.length : null;
    return `<tr><td>${ex.name}</td><td>${ex.date||'-'}</td><td>${list.length}명</td><td>${fmt(avg)}</td></tr>`;
  }).join('') : `<tr><td colspan="4" style="text-align:center;color:var(--on-surface-variant);">등록된 시험이 없습니다</td></tr>`;

  // watch list: managed students whose latest exam score < 60
  let watchRows = [];
  if(lastExam){
    const ranks = examRanks(lastExam.id);
    ranks.filter(r=>r.score<60 && mineIds.has(r.studentId)).forEach(r=>{
      const s = DB.students.find(x=>x.id===r.studentId);
      if(s) watchRows.push(`<tr><td>${s.name}</td><td>${s.grade} ${s.cls||''}</td><td><span class="badge badge-red">${r.score}</span></td></tr>`);
    });
  }
  document.getElementById('dash-watch').innerHTML = watchRows.length ? watchRows.join('') :
    `<tr><td colspan="3" style="text-align:center;color:var(--on-surface-variant);">해당하는 학생이 없습니다</td></tr>`;
}

/* ========== LECTURES ========== */
function ytId(url){
  if(!url) return '';
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([A-Za-z0-9_-]{6,})/);
  return m ? m[1] : '';
}
function lectureCard(lec, forViewer){
  const vid = ytId(lec.youtube);
  const thumb = vid ? `https://img.youtube.com/vi/${vid}/hqdefault.jpg` : '';
  const stageLabel = lec.stage==='high' ? '고등' : '중등';
  const tname = teacherName(lec.teacherId);
  const adminBtns = forViewer ? '' : `
    <div style="display:flex;gap:6px;margin-top:10px;">
      <button class="btn btn-ghost btn-sm" onclick="openLectureModal('${lec.id}')"><span class="msym">edit</span>수정</button>
      <button class="btn btn-danger-ghost btn-sm" onclick="deleteLecture('${lec.id}')"><span class="msym">delete</span>삭제</button>
    </div>`;
  const playArea = vid
    ? `<a href="${lec.youtube}" target="_blank" rel="noopener" class="lec-thumb" style="background-image:url('${thumb}');"><span class="msym lec-play">play_circle</span></a>`
    : `<div class="lec-thumb lec-thumb-empty"><span class="msym">videocam_off</span><span style="font-size:12px;margin-top:6px;">영상 링크 없음</span></div>`;
  return `
    <div class="card lec-card">
      ${playArea}
      <div class="card-pad" style="padding:18px 20px;">
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px;">
          <span class="badge badge-navy">${stageLabel}</span>
          <span class="badge badge-gold">${lec.subject||'-'}</span>
        </div>
        <h3 style="font-size:17px;color:var(--primary-container);margin:0 0 6px;">${lec.title}</h3>
        <p class="helper" style="margin:0 0 10px;">${tname?tname+' 선생님':''}${lec.date?' · '+lec.date:''}</p>
        ${lec.note?`<div class="lec-note">${lec.note.replace(/</g,'&lt;').replace(/\n/g,'<br>')}</div>`:''}
        ${adminBtns}
      </div>
    </div>`;
}
function renderLecturesAdmin(){
  const grid = document.getElementById('lecture-admin-grid');
  if(!grid) return;
  const list = [...DB.lectures].sort((a,b)=> (a.date<b.date?1:-1));
  document.getElementById('lecture-admin-empty').style.display = list.length?'none':'block';
  grid.innerHTML = list.map(l=>lectureCard(l,false)).join('');
}
function renderMyLectures(){
  const grid = document.getElementById('my-lecture-grid');
  if(!grid) return;
  // show lectures matching the viewer's current course stage/subject first, then all
  const me = DB.students.find(x=>x.id===SESSION.studentId);
  let list = [...DB.lectures];
  const mysubs = studentSubjects(me);
  list.sort((a,b)=>{
    const am = mysubs.includes(a.subject) ? 0:1;
    const bm = mysubs.includes(b.subject) ? 0:1;
    if(am!==bm) return am-bm;
    return a.date<b.date?1:-1;
  });
  document.getElementById('my-lecture-empty').style.display = list.length?'none':'block';
  grid.innerHTML = list.map(l=>lectureCard(l,true)).join('');
}
function syncLectureSubject(sel){
  const stage = document.getElementById('lecture-stage').value;
  const s = document.getElementById('lecture-subject');
  const opts = stage==='high'?HIGH_SUBJECTS:MID_SUBJECTS;
  s.innerHTML = opts.map(o=>`<option value="${o}">${o}</option>`).join('');
  if(sel && opts.includes(sel)) s.value=sel;
}
function openLectureModal(id){
  document.getElementById('lecture-modal-title').textContent = id?'강의 수정':'강의 추가';
  document.getElementById('lecture-id').value = id||'';
  const tsel = document.getElementById('lecture-teacher');
  tsel.innerHTML = `<option value="">미지정</option>` + DB.teachers.map(t=>`<option value="${t.id}">${t.name}</option>`).join('');
  if(id){
    const l = (DB.lectures||[]).find(x=>x.id===id);
    if(!l) return;
    document.getElementById('lecture-title').value = l.title||'';
    document.getElementById('lecture-stage').value = l.stage||'mid';
    syncLectureSubject(l.subject);
    tsel.value = l.teacherId||'';
    document.getElementById('lecture-date').value = l.date||'';
    document.getElementById('lecture-youtube').value = l.youtube||'';
    document.getElementById('lecture-note').value = l.note||'';
  } else {
    document.getElementById('lecture-title').value='';
    document.getElementById('lecture-stage').value='mid';
    syncLectureSubject();
    tsel.value = SESSION && SESSION.teacherId ? SESSION.teacherId : '';
    document.getElementById('lecture-date').value = new Date().toISOString().slice(0,10);
    document.getElementById('lecture-youtube').value='';
    document.getElementById('lecture-note').value='';
  }
  document.getElementById('lecture-modal-overlay').classList.add('active');
}
function closeLectureModal(){ document.getElementById('lecture-modal-overlay').classList.remove('active'); }
function saveLecture(){
  const title = document.getElementById('lecture-title').value.trim();
  if(!title){ alert('강의 제목을 입력해주세요.'); return; }
  const id = document.getElementById('lecture-id').value;
  const data = {
    title,
    stage: document.getElementById('lecture-stage').value,
    subject: document.getElementById('lecture-subject').value,
    teacherId: document.getElementById('lecture-teacher').value,
    date: document.getElementById('lecture-date').value,
    youtube: document.getElementById('lecture-youtube').value.trim(),
    note: document.getElementById('lecture-note').value.trim(),
  };
  if(id){ Object.assign(DB.lectures.find(x=>x.id===id), data); }
  else { DB.lectures.push({ id:uid(), ...data }); }
  saveDB();
  closeLectureModal();
  renderAll();
}
function deleteLecture(id){
  if(!confirm('이 강의를 삭제하시겠습니까?')) return;
  DB.lectures = DB.lectures.filter(x=>x.id!==id);
  saveDB();
  renderAll();
}

/* ========== HOMER (what-if) GRADING ========== */
function selectHomerExam(id){
  document.getElementById('homer-exam-select').value = id;
  renderHomer();
}
function renderHomer(){
  const sel = document.getElementById('homer-exam-select');
  const wrap = document.getElementById('homer-wrap');
  const listBox = document.getElementById('homer-exam-list');
  // only question-based exams
  const examsQ = [...DB.exams].filter(e=>e.questions && e.questions.length).sort((a,b)=>(a.date<b.date?1:-1));
  const prev = sel.value;
  sel.innerHTML = examsQ.map(e=>`<option value="${e.id}">${e.name}</option>`).join('');
  if(examsQ.length){ sel.value = examsQ.find(e=>e.id===prev)?prev:examsQ[0].id; }

  if(listBox){
    listBox.innerHTML = examsQ.length ? examsQ.map(e=>`
      <button class="homer-exam-item ${e.id===sel.value?'active':''}" onclick="selectHomerExam('${e.id}')">
        ${e.name}<div class="d">${e.date||''} · ${e.type||''}</div>
      </button>`).join('') : `<p class="helper" style="margin:0;">문항별로 채점된 시험이 없습니다.</p>`;
  }

  if(!examsQ.length){
    wrap.innerHTML = `<div class="card"><div class="empty"><span class="msym">psychology</span>문항별로 채점된 시험이 아직 없습니다.</div></div>`;
    return;
  }
  const examId = sel.value;
  const exam = DB.exams.find(e=>e.id===examId);
  const studentId = SESSION.studentId;
  const rec = (DB.scores[examId] && typeof DB.scores[examId][studentId]==='object') ? DB.scores[examId][studentId] : {byQ:{}};
  const byQ = rec.byQ||{};
  const realTotal = studentTotal(examId, studentId);
  if(realTotal===null){
    wrap.innerHTML = `<div class="card"><div class="empty"><span class="msym">quiz</span>이 시험은 아직 채점 결과가 없습니다.</div></div>`;
    return;
  }

  // wrong MC questions are candidates
  const whatif = HOMER_STATE[examId] || {};
  let homerTotal = 0;
  const rows = exam.questions.map(q=>{
    const r = byQ[q.no]||{};
    let earned=0, status='', canToggle=false, checked=false;
    if(q.type==='mc'){
      if(r.correct===true){ earned=q.points; status='정답'; }
      else if(r.correct===false){
        status='오답'; canToggle=true;
        checked = !!whatif[q.no];
        if(checked) earned=q.points;
      } else { status='미응시'; }
    } else {
      earned = (r.got!==undefined&&r.got!=='')?Number(r.got):0;
      status = `서술형 ${earned}/${q.points}`;
    }
    homerTotal += earned;
    const toggle = canToggle
      ? `<button class="btn btn-sm ${checked?'btn-gold':'btn-outline'}" onclick="toggleHomer('${examId}',${q.no})">${checked?'✓ 맞출 수 있었음':'맞출 수 있었음'}</button>`
      : `<span style="color:var(--on-surface-variant);font-size:13px;">-</span>`;
    return `<tr>
      <td>${q.no}번</td>
      <td>${q.type==='mc'?'객관식':'서술형'}</td>
      <td>${q.points}점</td>
      <td>${q.type==='mc'?(r.correct===true?'<span class="badge badge-gold">정답</span>':(r.correct===false?'<span class="badge badge-red">오답</span>':'-')):status}</td>
      <td>${toggle}</td>
    </tr>`;
  }).join('');

  const diff = homerTotal - realTotal;
  wrap.innerHTML = `
    <div class="grid grid-3" style="margin-bottom:20px;">
      <div class="card stat-card"><div class="lbl"><span class="msym">grading</span>실제 점수</div><div class="val">${realTotal}</div></div>
      <div class="card stat-card gold"><div class="lbl"><span class="msym">auto_awesome</span>호머식 점수</div><div class="val">${homerTotal}</div></div>
      <div class="card stat-card"><div class="lbl"><span class="msym">trending_up</span>차이</div><div class="val">${diff>0?'+'+diff:diff}</div></div>
    </div>
    <div class="card">
      <table>
        <thead><tr><th>문항</th><th>유형</th><th>배점</th><th>채점</th><th>호머식 (만약에)</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <div class="card-pad" style="border-top:1px solid var(--outline);">
        <p class="helper" style="margin:0;">오답인 객관식 문항에 "맞출 수 있었음"을 누르면 그 문항을 맞았다고 가정해 점수를 다시 계산합니다. 실제 성적·등수에는 영향을 주지 않습니다.</p>
      </div>
    </div>`;
}
let HOMER_STATE = {}; // {examId:{qNo:true}}
function toggleHomer(examId, qNo){
  if(!HOMER_STATE[examId]) HOMER_STATE[examId]={};
  if(HOMER_STATE[examId][qNo]) delete HOMER_STATE[examId][qNo];
  else HOMER_STATE[examId][qNo]=true;
  renderHomer();
}

/* ========== GRADEBOOK (내신 · 모의고사) ========== */
let GB_TARGET = null;
/* ranking board (TOP5 by nickname) */
function nickOf(s){ return (s && (s.nickname && s.nickname.trim())) ? s.nickname : (s?('익명·'+s.name.slice(0,1)+'**'):'-'); }
function renderRankBoard(){
  if(!isViewer()) return;
  const sel = document.getElementById('rank-exam-select');
  if(!sel) return;
  const exams = [...DB.exams].sort((a,b)=>(a.date<b.date?1:-1));
  const prev = sel.value;
  sel.innerHTML = exams.map(e=>`<option value="${e.id}">${e.name} (${e.date||''})</option>`).join('');
  if(exams.length){ sel.value = exams.find(e=>e.id===prev)?prev:exams[0].id; }
  const wrap = document.getElementById('rank-board');
  if(!exams.length){ wrap.innerHTML=`<div class="empty"><span class="msym">leaderboard</span>시험이 없습니다.</div>`; return; }
  const examId = sel.value;
  const ranks = examRanks(examId).slice(0,5);
  const myId = SESSION.studentId;
  if(!ranks.length){ wrap.innerHTML=`<div class="empty"><span class="msym">leaderboard</span>아직 채점 결과가 없습니다.</div>`; return; }
  const medal=['🥇','🥈','🥉','4','5'];
  wrap.innerHTML = `<table><thead><tr><th style="width:60px;">등수</th><th>닉네임</th><th>점수</th></tr></thead><tbody>${
    ranks.map((r,i)=>{
      const s=DB.students.find(x=>x.id===r.studentId);
      const me = r.studentId===myId;
      return `<tr style="${me?'background:rgba(200,161,90,.12);':''}">
        <td style="font-size:16px;">${medal[i]||(i+1)}</td>
        <td style="font-weight:600;">${me?'나 ('+nickOf(s)+')':nickOf(s)}</td>
        <td style="font-weight:700;color:var(--primary-container);">${r.score}</td>
      </tr>`;
    }).join('')
  }</tbody></table>`;
}
let GB_TARGET2_UNUSED = null; // studentId being edited (admin selects; student = self)
function gradebookTarget(){
  if(isViewer()) return SESSION.studentId;
  return GB_TARGET;
}
function canEditGrades(){ return isViewer() || isStaff(); } // students edit own; staff can edit too

function gradebookHTML(studentId, editable){
  const s = DB.students.find(x=>x.id===studentId);
  if(!s) return `<div class="card"><div class="empty"><span class="msym">person_off</span>학생을 선택하세요.</div></div>`;
  if(!Array.isArray(s.naesin)) s.naesin=[];
  if(!Array.isArray(s.mock)) s.mock=[];

  const naesinRows = s.naesin.length ? s.naesin.map(r=>`
    <tr>
      <td>${r.term||'-'}</td>
      <td style="font-weight:600;">${r.subject||'-'}</td>
      <td>${r.score!==''&&r.score!=null?r.score:'-'}</td>
      <td>${r.grade?`<span class="badge badge-navy">${r.grade}등급</span>`:'-'}</td>
      ${editable?`<td style="text-align:right;">
        <button class="btn btn-ghost btn-sm" onclick="openNaesinModal('${studentId}','${r.id}')"><span class="msym">edit</span></button>
        <button class="btn btn-danger-ghost btn-sm" onclick="deleteNaesin('${studentId}','${r.id}')"><span class="msym">delete</span></button>
      </td>`:''}
    </tr>`).join('') : `<tr><td colspan="${editable?5:4}" style="text-align:center;color:var(--on-surface-variant);">입력된 내신 성적이 없습니다</td></tr>`;

  const mockRows = s.mock.length ? [...s.mock].sort((a,b)=>(a.date<b.date?1:-1)).map(m=>{
    const g=m.subjects||{};
    const vals=['국어','수학','영어','탐구'].map(k=>g[k]?g[k]+'등급':'-');
    const nums=Object.values(g).filter(v=>v); const avg=nums.length?(nums.reduce((a,b)=>a+Number(b),0)/nums.length).toFixed(2):'-';
    return `<tr>
      <td>${m.date||'-'}</td>
      <td style="font-weight:600;">${m.name||'-'}</td>
      <td>${vals[0]}</td><td>${vals[1]}</td><td>${vals[2]}</td><td>${vals[3]}</td>
      <td><b>${avg}</b></td>
      ${editable?`<td style="text-align:right;">
        <button class="btn btn-ghost btn-sm" onclick="openMockModal('${studentId}','${m.id}')"><span class="msym">edit</span></button>
        <button class="btn btn-danger-ghost btn-sm" onclick="deleteMock('${studentId}','${m.id}')"><span class="msym">delete</span></button>
      </td>`:''}
    </tr>`;
  }).join('') : `<tr><td colspan="${editable?8:7}" style="text-align:center;color:var(--on-surface-variant);">입력된 모의고사가 없습니다</td></tr>`;

  return `
    <div class="card" style="margin-bottom:24px;">
      <div class="card-pad" style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--outline);">
        <h3 class="section-title" style="margin:0;">내신 성적</h3>
        ${editable?`<button class="btn btn-primary btn-sm" onclick="openNaesinModal('${studentId}')"><span class="msym">add</span>내신 추가</button>`:''}
      </div>
      <table>
        <thead><tr><th>학기</th><th>과목</th><th>원점수</th><th>등급</th>${editable?'<th style="text-align:right;">관리</th>':''}</tr></thead>
        <tbody>${naesinRows}</tbody>
      </table>
    </div>
    <div class="card">
      <div class="card-pad" style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--outline);">
        <h3 class="section-title" style="margin:0;">모의고사</h3>
        ${editable?`<button class="btn btn-primary btn-sm" onclick="openMockModal('${studentId}')"><span class="msym">add</span>모의고사 추가</button>`:''}
      </div>
      <div style="overflow-x:auto;"><table>
        <thead><tr><th>일자</th><th>시행</th><th>국어</th><th>수학</th><th>영어</th><th>탐구</th><th>평균등급</th>${editable?'<th style="text-align:right;">관리</th>':''}</tr></thead>
        <tbody>${mockRows}</tbody>
      </table></div>
    </div>`;
}
function renderMyGradebook(){
  if(!isViewer()) return;
  const wrap = document.getElementById('my-gradebook-wrap');
  if(wrap) wrap.innerHTML = gradebookHTML(SESSION.studentId, SESSION.role==='student'); // parents view-only
}
function renderGradebookAdmin(){
  const sel = document.getElementById('gradebook-student-select');
  if(!sel) return;
  const mine = managedStudents();
  const prev = sel.value;
  sel.innerHTML = mine.map(s=>`<option value="${s.id}">${s.name} (${s.grade} ${s.cls||''})</option>`).join('');
  if(mine.length){ sel.value = mine.find(s=>s.id===prev)?prev:mine[0].id; GB_TARGET=sel.value; }
  const wrap = document.getElementById('gradebook-admin-wrap');
  if(wrap) wrap.innerHTML = mine.length ? gradebookHTML(sel.value, true)
    : `<div class="card"><div class="empty"><span class="msym">group_off</span>담당 학생이 없습니다.</div></div>`;
}
/* naesin modal */
let GB_EDIT_SID=null;
function openNaesinModal(sid, rid){
  GB_EDIT_SID=sid;
  document.getElementById('naesin-modal-title').textContent = rid?'내신 성적 수정':'내신 성적 추가';
  document.getElementById('naesin-id').value = rid||'';
  const s=findStudent(sid);
  if(rid){
    const r=(s && Array.isArray(s.naesin)) ? s.naesin.find(x=>x.id===rid) : null;
    if(r){
      document.getElementById('naesin-term').value=r.term||'1학년 1학기';
      document.getElementById('naesin-subject').value=r.subject||'';
      document.getElementById('naesin-score').value=r.score!=null?r.score:'';
      document.getElementById('naesin-grade').value=r.grade||'';
    }
  } else {
    document.getElementById('naesin-subject').value='';
    document.getElementById('naesin-score').value='';
    document.getElementById('naesin-grade').value='';
  }
  document.getElementById('naesin-modal-overlay').classList.add('active');
}
function closeNaesinModal(){ document.getElementById('naesin-modal-overlay').classList.remove('active'); }
function saveNaesin(){
  const sid=GB_EDIT_SID; const s=DB.students.find(x=>x.id===sid); if(!s) return;
  if(!Array.isArray(s.naesin)) s.naesin=[];
  const rid=document.getElementById('naesin-id').value;
  const data={ term:document.getElementById('naesin-term').value, subject:document.getElementById('naesin-subject').value.trim(),
    score:document.getElementById('naesin-score').value===''?'':Number(document.getElementById('naesin-score').value),
    grade:document.getElementById('naesin-grade').value };
  if(!data.subject){ alert('과목을 입력하세요.'); return; }
  if(rid){ Object.assign(s.naesin.find(x=>x.id===rid), data); }
  else { s.naesin.push({ id:uid(), ...data }); }
  saveDB(); closeNaesinModal(); refreshGradebookViews();
}
function deleteNaesin(sid, rid){
  if(!confirm('이 내신 기록을 삭제하시겠습니까?')) return;
  const s=findStudent(sid); if(!s) return;
  s.naesin=(s.naesin||[]).filter(x=>x.id!==rid);
  saveDB(); refreshGradebookViews();
}
/* mock modal */
function openMockModal(sid, mid){
  GB_EDIT_SID=sid;
  document.getElementById('mock-modal-title').textContent = mid?'모의고사 수정':'모의고사 추가';
  document.getElementById('mock-id').value = mid||'';
  const s=findStudent(sid);
  const rec = (mid && s && Array.isArray(s.mock)) ? s.mock.find(x=>x.id===mid) : null;
  const g = (rec && rec.subjects) || {};
  document.getElementById('mock-name').value = rec ? (rec.name||'') : '';
  document.getElementById('mock-date').value = rec ? (rec.date||'') : new Date().toISOString().slice(0,10);
  document.getElementById('mock-kor').value=g['국어']||''; document.getElementById('mock-math').value=g['수학']||'';
  document.getElementById('mock-eng').value=g['영어']||''; document.getElementById('mock-sci').value=g['탐구']||'';
  document.getElementById('mock-modal-overlay').classList.add('active');
}
function closeMockModal(){ document.getElementById('mock-modal-overlay').classList.remove('active'); }
function saveMock(){
  const sid=GB_EDIT_SID; const s=DB.students.find(x=>x.id===sid); if(!s) return;
  if(!Array.isArray(s.mock)) s.mock=[];
  const mid=document.getElementById('mock-id').value;
  const subjects={};
  const gv=(id,k)=>{const v=document.getElementById(id).value; if(v!=='') subjects[k]=Number(v);};
  gv('mock-kor','국어'); gv('mock-math','수학'); gv('mock-eng','영어'); gv('mock-sci','탐구');
  const data={ name:document.getElementById('mock-name').value.trim(), date:document.getElementById('mock-date').value, subjects };
  if(!data.name){ alert('시행명을 입력하세요.'); return; }
  if(mid){ Object.assign(s.mock.find(x=>x.id===mid), data); }
  else { s.mock.push({ id:uid(), ...data }); }
  saveDB(); closeMockModal(); refreshGradebookViews();
}
function deleteMock(sid, mid){
  if(!confirm('이 모의고사 기록을 삭제하시겠습니까?')) return;
  const s=findStudent(sid); if(!s) return;
  s.mock=(s.mock||[]).filter(x=>x.id!==mid);
  saveDB(); refreshGradebookViews();
}
function refreshGradebookViews(){
  if(isViewer()) renderMyGradebook(); else renderGradebookAdmin();
}

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

/* ========== MY INFO (profile edit) ========== */
function renderMyInfo(){
  const body = document.getElementById('myinfo-body');
  if(!body || !SESSION) return;
  if(SESSION.role==='admin'){
    // editing a teacher record if logged in via teacher phone; else generic admin
    const t = DB.teachers.find(x=>x.id===SESSION.teacherId);
    if(t){
      body.innerHTML = `
        <div class="field"><label>이름</label><input type="text" id="mi-name" value="${t.name||''}"></div>
        <div class="field"><label>담당 과목</label><input type="text" id="mi-subject" value="${t.subject||''}"></div>
        <div class="field"><label>전화번호 (로그인 ID)</label><input type="text" id="mi-phone" value="${t.phone||''}"></div>
        <div style="display:flex;justify-content:flex-end;margin-top:8px;"><button class="btn btn-primary" onclick="saveMyInfo()">저장</button></div>
        <p class="helper" style="margin-top:14px;">비밀번호는 데모에서 공통 1234로 고정되어 있습니다.</p>`;
    } else {
      body.innerHTML = `<p class="helper" style="margin:0;">기본 관리자(admin) 계정입니다. 선생님 본인 전화번호로 로그인하면 여기에서 신상정보를 수정할 수 있습니다.</p>`;
    }
    return;
  }
  if(SESSION.role==='parent'){
    const kids = (SESSION.childIds||[]).map(id=>DB.students.find(s=>s.id===id)).filter(Boolean);
    body.innerHTML = `
      <div class="field"><label>학부모 전화번호 (로그인 ID)</label><input type="text" id="mi-pphone" value="${SESSION.parentPhone||''}"></div>
      <p class="helper" style="margin:-6px 0 16px;">번호를 바꾸면 연결된 자녀(${kids.map(k=>k.name).join(', ')})의 학부모 연락처도 함께 변경됩니다.</p>
      <div style="display:flex;justify-content:flex-end;"><button class="btn btn-primary" onclick="saveMyInfo()">저장</button></div>`;
    return;
  }
  // student
  const s = DB.students.find(x=>x.id===SESSION.studentId);
  if(!s){ body.innerHTML=''; return; }
  body.innerHTML = `
    <div class="field-row">
      <div class="field"><label>이름</label><input type="text" id="mi-name" value="${s.name||''}"></div>
      <div class="field"><label>아이디 (로그인)</label><input type="text" value="${s.account||''}" readonly style="background:var(--surface-low);"></div>
    </div>
    <div class="field">
      <label>닉네임 (등수표에 표시됨)</label>
      <input type="text" id="mi-nickname" value="${s.nickname||''}" placeholder="다른 학생에게 보여질 별명">
    </div>
    <div class="field-row">
      <div class="field"><label>내 전화번호 (로그인 ID · 변경 불가)</label><input type="text" id="mi-phone" value="${s.phone||''}" readonly style="background:var(--surface-low);"></div>
      <div class="field"><label>학부모 전화번호</label><input type="text" id="mi-pphone" value="${s.parentPhone||''}"></div>
    </div>
    <div class="field-row">
      <div class="field"><label>내 카카오톡 ID</label><input type="text" id="mi-kakao" value="${s.kakao||''}"></div>
      <div class="field"><label>학부모 카카오톡 ID</label><input type="text" id="mi-pkakao" value="${s.parentKakao||''}"></div>
    </div>
    <div style="display:flex;justify-content:flex-end;margin-top:8px;"><button class="btn btn-primary" onclick="saveMyInfo()">저장</button></div>
    <p class="helper" style="margin-top:14px;">학년/반, 담당 선생님, 학습 과정은 선생님이 관리합니다. 변경이 필요하면 선생님께 문의하세요.</p>`;
}
async function saveMyInfo(){
  if(SESSION.role==='admin'){
    const t = DB.teachers.find(x=>x.id===SESSION.teacherId);
    if(t){
      t.name = document.getElementById('mi-name').value.trim()||t.name;
      t.subject = document.getElementById('mi-subject').value.trim();
      t.phone = document.getElementById('mi-phone').value.trim();
      SESSION.name = t.name;
    }
    saveDB();
  } else if(SESSION.role==='parent'){
    const np = document.getElementById('mi-pphone').value.trim();
    (SESSION.childIds||[]).forEach(id=>{ const s=DB.students.find(x=>x.id===id); if(s) s.parentPhone=np; });
    SESSION.parentPhone = normalizePhone(np);
    saveDB();
  } else {
    // 학생: 본인 항목만 서버에 안전하게 저장 (전화번호=로그인ID는 변경 불가)
    const s = DB.students.find(x=>x.id===SESSION.studentId);
    let updates = null;
    if(s){
      const newName = document.getElementById('mi-name').value.trim();
      const nn = document.getElementById('mi-nickname');
      updates = {
        name: newName || s.name,
        nickname: nn ? nn.value.trim() : (s.nickname||''),
        parentPhone: document.getElementById('mi-pphone').value.trim(),
        kakao: document.getElementById('mi-kakao').value.trim(),
        parentKakao: document.getElementById('mi-pkakao').value.trim(),
      };
      Object.assign(s, updates);   // 로컬 즉시 반영
      SESSION.name = s.name;
    }
    if(updates && window.CLOUD && window.CLOUD.enabled){
      try{
        const { data, error } = await CLOUD.sb.functions.invoke('self-update', { body:{ updates } });
        if(error || (data && data.error)){
          alert('서버 저장 실패: ' + ((error && error.message) || (data && data.error) || '') + '\n(self-update 함수가 배포돼 있는지 확인하세요)');
        }
      }catch(e){ console.error('self-update failed', e); alert('서버 저장 중 오류가 발생했습니다.'); }
    }
    try{ localStorage.setItem(STORE_KEY, JSON.stringify(DB)); }catch(e){}
  }
  // refresh session storage copy
  const store = localStorage.getItem(SESSION_KEY) ? localStorage : sessionStorage;
  store.setItem(SESSION_KEY, JSON.stringify(SESSION));
  const un = document.getElementById('user-name'); if(un) un.textContent = SESSION.name;
  alert('저장되었습니다.');
  renderAll();
}

/* ---------- render: teachers ---------- */
function renderTeachers(){
  const body = document.getElementById('teacher-table-body');
  if(!body) return;
  document.getElementById('teacher-empty').style.display = DB.teachers.length ? 'none':'block';
  body.innerHTML = DB.teachers.map(t=>{
    const count = DB.students.filter(s=>s.teacherId===t.id).length;
    return `<tr>
      <td style="font-weight:600;">${t.name}</td>
      <td>${t.subject||'-'}</td>
      <td>${t.phone||'-'}</td>
      <td>${count}명</td>
      <td style="text-align:right;">
        ${isAdminUser() ? `<button class="btn btn-ghost btn-sm" onclick="resetAccountPassword('${t.phone||''}','${(t.name||'').replace(/'/g,'')} 선생님')" title="비밀번호 초기화"><span class="msym">key</span></button>` : ''}
        <button class="btn btn-ghost btn-sm" onclick="openTeacherModal('${t.id}')"><span class="msym">edit</span>수정</button>
        <button class="btn btn-danger-ghost btn-sm" onclick="deleteTeacher('${t.id}')"><span class="msym">delete</span>삭제</button>
      </td>
    </tr>`;
  }).join('');
}
/* ===== 개별 추가 시 로그인 계정 자동 생성 (마스터 + 클라우드 + 휴대폰 있을 때) ===== */
function acctToast(msg){ try{ gwToast('', msg, ''); }catch(e){ console.log(msg); } }
async function autoCreateAccount(role, name, phone){
  if(!(window.CLOUD && window.CLOUD.enabled)) return;   // 로컬 모드면 생략
  if(!isAdminUser()) return;                              // 마스터만 계정 생성
  if(!isValidPhone(phone)) return;                        // 휴대폰 없으면 계정 생략
  const login_id = Auth.norm(phone);
  try{
    const { data, error } = await CLOUD.sb.functions.invoke('create-students', { body:{ students:[{ name, login_id, role }] } });
    if(error){ acctToast(`⚠️ ${name} 계정 생성 실패: ${error.message||error}`); return; }
    if(data && data.error){ acctToast(`⚠️ ${data.error}`); return; }
    const r = (data && data.results && data.results[0]) || {};
    if(r.ok) acctToast(`✓ ${name} 로그인 계정 생성됨 · 휴대폰 + 초기비번 axis1234`);
    else if(/already|exists|registered/i.test(r.error||'')) acctToast(`${name} · 이미 계정이 있습니다`);
    else acctToast(`⚠️ ${name} 계정 생성 실패: ${r.error||''}`);
  }catch(e){ console.error('autoCreateAccount', e); acctToast(`⚠️ ${name} 계정 생성 중 오류`); }
}

/* ===== 학부모 로그인 계정 생성 (학생의 학부모 전화번호 기준, 마스터 전용) ===== */
async function createParentAccounts(){
  if(!isAdminUser()){ alert('학부모 계정 생성은 마스터(최고관리자)만 사용할 수 있습니다.'); return; }
  if(!(window.CLOUD && window.CLOUD.enabled)){ alert('클라우드(Supabase) 연결 상태에서만 계정을 생성할 수 있습니다.'); return; }
  const map = {};
  DB.students.forEach(s=>{
    if(isValidPhone(s.parentPhone)){
      const p = Auth.norm(s.parentPhone);
      if(!map[p]) map[p] = (s.parentName && s.parentName.trim()) ? s.parentName : ((s.name||'')+' 학부모');
    }
  });
  const targets = Object.keys(map).map(p=>({ name:map[p], login_id:p, role:'parent' }));
  if(!targets.length){ alert('학부모 전화번호가 등록된 학생이 없습니다.\n학생 정보(또는 학생 마이페이지)에 학부모 전화번호를 먼저 입력해주세요.'); return; }
  if(!confirm(`학부모 ${targets.length}명의 로그인 계정을 생성합니다.\n초기 비밀번호는 axis1234이며, 첫 로그인 시 변경됩니다.\n(이미 계정이 있는 학부모는 건너뜁니다.)\n\n학부모는 본인 휴대폰 번호로 로그인해 자녀 정보를 볼 수 있습니다.\n진행할까요?`)) return;
  try{
    const { data, error } = await CLOUD.sb.functions.invoke('create-students', { body:{ students: targets } });
    if(error){ alert('계정 생성 함수 호출 실패: '+(error.message||error)); return; }
    if(data && data.error){ alert(data.error); return; }
    const results = (data && data.results) || [];
    let ok=0, ex=0, fail=0; const failed=[];
    results.forEach(r=>{
      if(r.ok) ok++;
      else if(/already|exists|registered/i.test(r.error||'')) ex++;
      else { fail++; failed.push(`${r.name}(${r.login_id}): ${r.error||''}`); }
    });
    let msg = `학부모 계정 — 생성 ${ok} · 기존 ${ex} · 실패 ${fail}`;
    if(failed.length) msg += `\n\n실패:\n`+failed.join('\n');
    msg += `\n\n학부모께 "휴대폰 번호 + 초기비밀번호 axis1234"를 안내하세요.`;
    alert(msg);
  }catch(e){ console.error('parent account create failed', e); alert('계정 생성 중 오류: '+(e.message||e)); }
}

/* ===== 선생님 로그인 계정 생성 (마스터 전용) ===== */
async function createTeacherAccounts(){
  if(!isAdminUser()){ alert('선생님 계정 생성은 마스터(최고관리자)만 사용할 수 있습니다.'); return; }
  if(!(window.CLOUD && window.CLOUD.enabled)){ alert('클라우드(Supabase) 연결 상태에서만 계정을 생성할 수 있습니다.'); return; }
  const targets = DB.teachers.filter(t=>isValidPhone(t.phone)).map(t=>({ name:t.name, login_id:Auth.norm(t.phone), role:'teacher' }));
  const noPhone = DB.teachers.filter(t=>!isValidPhone(t.phone));
  if(!targets.length){ alert('휴대폰 번호가 등록된 선생님이 없습니다. 먼저 선생님의 휴대폰 번호를 입력해주세요.'); return; }
  if(!confirm(`휴대폰이 등록된 선생님 ${targets.length}명의 로그인 계정을 생성합니다.\n초기 비밀번호는 axis1234이며, 첫 로그인 시 변경됩니다.\n(이미 계정이 있는 선생님은 건너뜁니다.)\n\n진행할까요?`)) return;
  try{
    const { data, error } = await CLOUD.sb.functions.invoke('create-students', { body:{ students: targets } });
    if(error){ alert('계정 생성 함수 호출 실패: '+(error.message||error)+'\n\ncreate-students 함수가 최신 코드로 배포돼 있는지 확인하세요.'); return; }
    if(data && data.error){ alert(data.error); return; }
    const results = (data && data.results) || [];
    let ok=0, ex=0, fail=0; const failed=[];
    results.forEach(r=>{
      if(r.ok) ok++;
      else if(/already|exists|registered/i.test(r.error||'')) ex++;
      else { fail++; failed.push(`${r.name}(${r.login_id}): ${r.error||''}`); }
    });
    let msg = `선생님 계정 — 생성 ${ok} · 기존 ${ex} · 실패 ${fail}`;
    if(noPhone.length) msg += `\n\n(휴대폰 미입력으로 제외: ${noPhone.map(t=>t.name).join(', ')})`;
    if(failed.length) msg += `\n\n실패:\n`+failed.join('\n');
    msg += `\n\n선생님께 "휴대폰 번호 + 초기비밀번호 axis1234"를 안내하세요.`;
    alert(msg);
  }catch(e){ console.error('teacher account create failed', e); alert('계정 생성 중 오류: '+(e.message||e)); }
}

function openTeacherModal(id){
  document.getElementById('teacher-modal-title').textContent = id ? '선생님 정보 수정' : '선생님 추가';
  document.getElementById('teacher-id').value = id||'';
  if(id){
    const t = findTeacher(id);
    if(!t) return;
    document.getElementById('teacher-name').value = t.name||'';
    document.getElementById('teacher-subject').value = t.subject||'';
    document.getElementById('teacher-phone').value = t.phone||'';
  } else {
    ['teacher-name','teacher-subject','teacher-phone'].forEach(i=>document.getElementById(i).value='');
  }
  document.getElementById('teacher-modal-overlay').classList.add('active');
}
function closeTeacherModal(){ document.getElementById('teacher-modal-overlay').classList.remove('active'); }
function saveTeacher(){
  const name = document.getElementById('teacher-name').value.trim();
  if(!name){ alert('이름을 입력해주세요.'); return; }
  const id = document.getElementById('teacher-id').value;
  const phone = document.getElementById('teacher-phone').value.trim();
  // 이름 중복 검사 (다른 선생님과 동일)
  if(DB.teachers.some(t=> t.id!==id && (t.name||'').trim()===name)){
    alert('이미 같은 이름의 선생님이 등록되어 있습니다.'); return;
  }
  // 휴대폰: 입력 시 형식 검사 + 중복(로그인 ID) 검사
  if(phone){
    if(!isValidPhone(phone)){ alert('휴대폰 번호 형식이 올바르지 않습니다. (예: 010-1234-5678)'); return; }
    const np = phone.replace(/[^0-9]/g,'');
    if(DB.teachers.some(t=> t.id!==id && (t.phone||'').replace(/[^0-9]/g,'')===np)){
      alert('이미 등록된 휴대폰 번호입니다.'); return;
    }
  }
  const data = {
    name,
    subject: document.getElementById('teacher-subject').value.trim(),
    phone,
  };
  if(id){
    const t = DB.teachers.find(x=>x.id===id);
    if(!t){ alert('대상 선생님을 찾을 수 없습니다. 목록을 새로고침해 주세요.'); return; }
    Object.assign(t, data);
  }
  else { DB.teachers.push({ id: uid(), ...data }); }
  saveDB();
  closeTeacherModal();
  renderAll();
  if(!id) autoCreateAccount('teacher', name, phone);   // 신규 선생님 → 로그인 계정 자동 생성
}
function deleteTeacher(id){
  const count = DB.students.filter(s=>s.teacherId===id).length;
  const msg = count ? `이 선생님에게 배정된 학생 ${count}명의 담당이 '미지정'으로 바뀝니다. 삭제할까요?` : '이 선생님을 삭제하시겠습니까?';
  if(!confirm(msg)) return;
  DB.teachers = DB.teachers.filter(x=>x.id!==id);
  DB.students.forEach(s=>{ if(s.teacherId===id) s.teacherId=''; });
  saveDB();
  renderAll();
}

/* ---------- render: students ---------- */
function statusBadge(s){
  const st = (s&&s.status)||'재원';
  if(st==='휴원') return ' <span class="badge" style="background:#fef3c7;color:#92400e;">휴원</span>';
  if(st==='퇴원') return ' <span class="badge" style="background:#fee2e2;color:#991b1b;">퇴원</span>';
  return '';
}
function setStudentStatus(id, val){
  if(!isAdminUser()){ alert('상태 변경은 마스터(최고관리자)만 가능합니다.'); renderStudents(); return; }
  const s = DB.students.find(x=>x.id===id); if(!s){ return; }
  const prev = s.status||'재원';
  if(val===prev) return;
  if(val==='퇴원'){
    if(!confirm(`${s.name} 학생을 '퇴원' 처리합니다.\n\n• 선생님 화면의 명단에서 자동으로 제외됩니다.\n• 데이터는 그대로 보존되며, 언제든 '재원'으로 되돌릴 수 있습니다.\n• 로그인 계정은 유지됩니다(필요하면 따로 관리).\n\n진행할까요?`)){ renderStudents(); return; }
  }
  s.status = val;
  saveDB();
  renderStudents();
  try{ gwToast('', `${s.name} → ${val} 처리됨`, ''); }catch(e){}
}
async function resetAccountPassword(phoneOrId, label){
  if(!isAdminUser()){ alert('비밀번호 초기화는 마스터(최고관리자)만 가능합니다.'); return; }
  if(!(window.CLOUD && window.CLOUD.enabled)){ alert('클라우드(Supabase) 연결 상태에서만 비밀번호를 초기화할 수 있습니다.'); return; }
  const raw = String(phoneOrId||'').trim();
  const lid = /\d/.test(raw) ? Auth.norm(raw) : raw.toLowerCase();
  if(!lid){ alert('이 계정은 전화번호(로그인 ID)가 없어 초기화할 수 없습니다.'); return; }
  if(!confirm(`${label||lid} 계정의 비밀번호를 초기화합니다.\n\n초기 비밀번호는 axis1234가 되고,\n다음 로그인 때 새 비밀번호로 변경하게 됩니다.\n\n진행할까요?`)) return;
  try{
    const { data, error } = await CLOUD.sb.functions.invoke('reset-password', { body:{ login_id: lid } });
    if(error){ alert('초기화 함수 호출 실패: '+(error.message||error)+'\n(reset-password 함수가 배포돼 있는지 확인하세요)'); return; }
    if(data && data.error){ alert(data.error); return; }
    alert(`${data.name||label||lid} 계정의 비밀번호를 axis1234로 초기화했습니다.\n해당 사용자에게 "휴대폰 번호 + axis1234"로 로그인 후 변경하도록 안내하세요.`);
  }catch(e){ console.error('reset-password failed', e); alert('비밀번호 초기화 중 오류: '+(e.message||e)); }
}
var studentStatusFilter = '전체';
function setStudentFilter(val){ studentStatusFilter = val; renderStudents(); }
function renderStudentFilterChips(counts){
  const box = document.getElementById('student-filter'); if(!box) return;
  const items = [['전체','전체'],['재원','재원'],['휴원','휴원']];
  if(isAdminUser()) items.push(['퇴원','퇴원']);
  box.innerHTML = items.map(([val,label])=>{
    const active = (studentStatusFilter===val) ? ' active' : '';
    const n = counts[val]!=null ? counts[val] : 0;
    return `<button class="chip${active}" onclick="setStudentFilter('${val}')">${label}<span class="cnt">${n}</span></button>`;
  }).join('');
}
/* ===== 학생 상세 Drawer ===== */
function studentRecentExam(sid){
  const withScore = (DB.exams||[])
    .map(e=>({e, sc: studentTotal(e.id, sid)}))
    .filter(x=> x.sc!==null && x.sc!==undefined && !isNaN(x.sc))
    .sort((a,b)=> ((a.e.date||'')>(b.e.date||'')?-1:1));
  if(!withScore.length) return null;
  const top = withScore[0];
  const ranks = examRanks(top.e.id);
  const r = ranks.find(x=>x.studentId===sid);
  return { name: top.e.name, date: top.e.date, score: top.sc, max: top.e.max||100, rank: r?r.rank:null, total: ranks.length };
}
function drawerRivalInfo(sid){
  const rv = DB.rivals && DB.rivals[sid];
  if(!rv || !rv.rivalId) return { name:'없음', record:'' };
  const rival = findStudent(rv.rivalId);
  const name = rival ? rival.name : '-';
  const matches = (DB.rivalMatches||[]).filter(m=> m && m.studentId===sid && m.rivalId===rv.rivalId);
  let w=0,l=0; matches.forEach(m=>{ if(m.result==='win')w++; else if(m.result==='lose')l++; });
  return { name, record: (w||l)?`${w}승 ${l}패`:'' };
}
function drawerAIAnalysis(s){
  const totals = (DB.exams||[])
    .map(e=>({d:e.date, sc:studentTotal(e.id, s.id)}))
    .filter(x=>x.sc!==null && x.sc!==undefined && !isNaN(x.sc))
    .sort((a,b)=>((a.d||'')>(b.d||'')?1:-1))
    .map(x=>x.sc);
  if(totals.length<2){
    return '아직 분석할 시험 데이터가 충분하지 않습니다. 시험을 2회 이상 응시하면 성적 추세를 자동으로 분석해 드립니다.';
  }
  const avg = arr=> arr.reduce((a,b)=>a+b,0)/arr.length;
  const recent = totals.slice(-3);
  const prev = totals.slice(-6,-3);
  const rAvg = avg(recent), pAvg = prev.length?avg(prev):totals[0];
  const diff = rAvg - pAvg;
  let trend;
  if(diff>3) trend = `최근 성적이 <b>상승세</b>입니다 (직전 구간 대비 +${diff.toFixed(1)}점). 현재 학습 페이스를 유지하도록 격려해 주세요.`;
  else if(diff<-3) trend = `최근 성적이 <b>하락</b>하고 있습니다 (직전 구간 대비 ${diff.toFixed(1)}점). 원인 파악을 위한 상담을 권장합니다.`;
  else trend = `최근 성적이 <b>안정적</b>으로 유지되고 있습니다 (변동 ${diff>=0?'+':''}${diff.toFixed(1)}점).`;
  const ach = (DB.achievement && DB.achievement[s.id]) || {};
  let extra = '';
  if((ach.attendance||0)>=10) extra = ' 출석이 성실해 학습 태도가 좋습니다.';
  else if((ach.attendance||0)===0) extra = ' 출결 기록이 없어 학습 참여 확인이 필요합니다.';
  return trend + extra;
}
function openStudentDrawer(id){
  const s = findStudent(id); if(!s) return;
  const head=document.getElementById('sd-head'), body=document.getElementById('sd-body'), foot=document.getElementById('sd-foot');
  if(!head||!body||!foot) return;
  const init = (s.name||'?').slice(0,1);
  head.innerHTML = `
    <button class="sd-close" onclick="closeStudentDrawer()" title="닫기"><span class="msym">close</span></button>
    <div class="sd-ava">${init}</div>
    <div class="sd-htxt">
      <div class="nm">${s.name||'-'}${statusBadge(s)}</div>
      <div class="sub">${s.grade||''} ${s.cls||''} · ${s.nickname?('닉네임 '+s.nickname):('학번 '+(s.studentNo||'-'))}</div>
    </div>`;
  const ex = studentRecentExam(s.id);
  const rivalInfo = drawerRivalInfo(s.id);
  const ach = (DB.achievement && DB.achievement[s.id]) || {};
  const acts = (DB.activity && DB.activity[s.id]) || [];
  const tn = teacherName(s.teacherId);
  body.innerHTML = `
    <div class="sd-sec"><h4><span class="msym">badge</span>기본 정보</h4>
      <div class="sd-card">
        <div class="sd-row"><span class="k">담당 선생님</span><span class="v">${tn?tn+' 선생님':'미지정'}</span></div>
        <div class="sd-row"><span class="k">학년 / 반</span><span class="v">${s.grade||'-'} ${s.cls||''}</span></div>
        <div class="sd-row"><span class="k">학습 과정</span><span class="v">${courseLabel(s)||'-'}</span></div>
        <div class="sd-row"><span class="k">연락처</span><span class="v">${s.phone||'-'}</span></div>
      </div></div>
    <div class="sd-sec"><h4><span class="msym">quiz</span>최근 시험</h4>
      <div class="sd-card">${ex ? `
        <div class="sd-row"><span class="k">${ex.name}</span><span class="v">${fmt(ex.score)}점 / ${ex.max}점</span></div>
        <div class="sd-row"><span class="k">석차</span><span class="v">${ex.rank?ex.rank+'위 / '+ex.total+'명':'-'}</span></div>
        <div class="sd-row"><span class="k">응시일</span><span class="v">${ex.date||'-'}</span></div>`
        : `<div class="sd-actlog">아직 응시한 시험이 없습니다.</div>`}</div></div>
    <div class="sd-sec"><h4><span class="msym">sports_kabaddi</span>라이벌</h4>
      <div class="sd-card"><div class="sd-row"><span class="k">현재 라이벌</span><span class="v">${rivalInfo.name}</span></div>${rivalInfo.record?`<div class="sd-row"><span class="k">전적</span><span class="v">${rivalInfo.record}</span></div>`:''}</div></div>
    <div class="sd-sec"><h4><span class="msym">auto_awesome</span>AI 분석</h4>
      <div class="sd-ai"><div class="badge-ai"><span class="msym" style="font-size:14px;">smart_toy</span>AXIS AI 자동 분석</div>${drawerAIAnalysis(s)}</div></div>
    <div class="sd-sec"><h4><span class="msym">fact_check</span>출결 · 숙제</h4>
      <div class="sd-card">
        <div class="sd-row"><span class="k">누적 출석</span><span class="v">${ach.attendance||0}회</span></div>
        <div class="sd-row"><span class="k">학습일수</span><span class="v">${ach.studyDays||0}일</span></div>
        <div class="sd-row"><span class="k">숙제 제출</span><span class="v">${ach.homeworkCompleted||0}회</span></div>
      </div></div>
    <div class="sd-sec"><h4><span class="msym">forum</span>최근 상담 · 활동</h4>
      <div class="sd-card sd-actlog">${acts.length ? acts.slice(0,5).map(a=>`<div>${(a.at||'').slice(0,10)} · ${a.text||a.type||'-'}</div>`).join('') : '기록이 없습니다.'}</div></div>`;
  foot.innerHTML = isStaff()
    ? `<button class="btn btn-ghost" onclick="closeStudentDrawer()">닫기</button><button class="btn btn-primary" onclick="closeStudentDrawer();openStudentModal('${s.id}')"><span class="msym">edit</span>정보 수정</button>`
    : `<button class="btn btn-ghost" onclick="closeStudentDrawer()">닫기</button>`;
  const ov=document.getElementById('sd-overlay'), dr=document.getElementById('sd-drawer');
  if(ov) ov.classList.add('active');
  if(dr){ dr.classList.add('active'); dr.setAttribute('aria-hidden','false'); }
}
function closeStudentDrawer(){
  const ov=document.getElementById('sd-overlay'), dr=document.getElementById('sd-drawer');
  if(ov) ov.classList.remove('active');
  if(dr){ dr.classList.remove('active'); dr.setAttribute('aria-hidden','true'); }
}
function renderStudents(){
  const q = (document.getElementById('student-search').value||'').trim().toLowerCase();
  const base = managedStudents();
  const counts = { 전체:base.length, 재원:0, 휴원:0, 퇴원:0 };
  base.forEach(s=>{ const st=s.status||'재원'; if(counts[st]!=null) counts[st]++; });
  renderStudentFilterChips(counts);
  let list = base;
  if(studentStatusFilter!=='전체') list = list.filter(s=>(s.status||'재원')===studentStatusFilter);
  list = list.filter(s=>s.name.toLowerCase().includes(q));
  const body = document.getElementById('student-table-body');
  const empty = document.getElementById('student-empty');
  if(empty){
    if(base.length===0){ empty.style.display='block'; empty.innerHTML = `<span class="msym">group_off</span>등록된 학생이 없습니다. '학생 추가'로 시작해보세요.`; }
    else if(list.length===0){ empty.style.display='block'; empty.innerHTML = `<span class="msym">filter_alt_off</span>'${studentStatusFilter}' 상태의 학생이 없습니다.`; }
    else { empty.style.display='none'; }
  }
  body.innerHTML = list.map(s=>{
    const course = courseLabel(s);
    const tname = teacherName(s.teacherId);
    const st = s.status||'재원';
    const adminCtl = isAdminUser();
    const statusCell = adminCtl
      ? `<select class="status-sel" onchange="setStudentStatus('${s.id}', this.value)" title="재원 상태">
           <option value="재원" ${st==='재원'?'selected':''}>재원</option>
           <option value="휴원" ${st==='휴원'?'selected':''}>휴원</option>
           <option value="퇴원" ${st==='퇴원'?'selected':''}>퇴원</option>
         </select>`
      : '';
    const resetBtn = adminCtl
      ? `<button class="btn btn-ghost btn-sm" onclick="resetAccountPassword('${s.phone||''}','${(s.name||'').replace(/'/g,'')} 학생')" title="비밀번호 초기화"><span class="msym">key</span></button>`
      : '';
    return `
    <tr>
      <td style="font-weight:600;"><span class="sd-name-link" onclick="openStudentDrawer('${s.id}')">${s.name}</span>${statusBadge(s)}
        <div style="font-weight:400;font-size:11px;color:var(--on-surface-variant);margin-top:3px;">학번 ${s.studentNo||'-'}${gwBadge(s.id)}</div></td>
      <td>${s.grade} ${s.cls||''}</td>
      <td>${tname ? tname : '<span style="color:var(--on-surface-variant);">미지정</span>'}</td>
      <td>${course ? `<span class="badge badge-gold">${course}</span>` : '<span style="color:var(--on-surface-variant);">-</span>'}</td>
      <td>${s.phone||'-'}<br><span style="color:var(--on-surface-variant);font-size:12px;">학부모 ${s.parentPhone||'-'}</span></td>
      <td>${s.kakao||'-'} <span style="color:var(--outline);">/</span> ${s.parentKakao||'-'}</td>
      <td style="text-align:right;white-space:nowrap;">
        ${statusCell}
        ${resetBtn}
        <button class="btn btn-ghost btn-sm" onclick="openStudentModal('${s.id}')"><span class="msym">edit</span>수정</button>
        <button class="btn btn-danger-ghost btn-sm" onclick="deleteStudent('${s.id}')"><span class="msym">delete</span>삭제</button>
      </td>
    </tr>
  `;}).join('');
}
document.getElementById('student-search').addEventListener('input', renderStudents);

function renderSubjectChips(selected){
  selected = selected || [];
  const box = document.getElementById('student-subjects-box');
  const group = (title, arr, special)=>`
    <div class="subj-group">
      <div class="gt">${title}</div>
      <div class="subj-chips">
        ${arr.map(o=>`<label class="subj-chip ${special?'special':''} ${selected.includes(o)?'on':''}">
          <input type="checkbox" value="${o}" ${selected.includes(o)?'checked':''} onchange="this.closest('.subj-chip').classList.toggle('on', this.checked)">${o}
        </label>`).join('')}
      </div>
    </div>`;
  box.innerHTML = group('중등', MID_SUBJECTS, false) + group('고등', HIGH_SUBJECTS, false) + group('특강', SPECIAL_SUBJECTS, true);
}
function collectSubjects(){
  return [...document.querySelectorAll('#student-subjects-box input:checked')].map(i=>i.value);
}

function populateTeacherSelect(teacherId){
  const tsel = document.getElementById('student-teacher');
  if(!tsel) return;
  tsel.innerHTML = `<option value="">미지정</option>` + DB.teachers.map(t=>`<option value="${t.id}">${t.name}</option>`).join('');
  tsel.value = teacherId || '';
}
function openStudentModal(id){
  document.getElementById('student-modal-title').textContent = id ? '학생 정보 수정' : '학생 추가';
  document.getElementById('student-id').value = id||'';
  if(id){
    const s = findStudent(id);
    if(!s) return;
    document.getElementById('student-name').value = s.name||'';
    document.getElementById('student-grade').value = s.grade;
    document.getElementById('student-class').value = s.cls||'';
    document.getElementById('student-phone').value = s.phone||'';
    document.getElementById('student-parent-phone').value = s.parentPhone||'';
    document.getElementById('student-kakao').value = s.kakao||'';
    document.getElementById('student-parent-kakao').value = s.parentKakao||'';
    document.getElementById('student-note').value = s.note||'';
    populateTeacherSelect(s.teacherId);
    document.getElementById('student-track').value = s.courseTrack||'현행';
    document.getElementById('student-level').value = s.courseLevel||'기본';
    renderSubjectChips(studentSubjects(s));
  } else {
    ['student-name','student-class','student-phone','student-parent-phone','student-kakao','student-parent-kakao','student-note'].forEach(id=>document.getElementById(id).value='');
    document.getElementById('student-grade').value='중1';
    populateTeacherSelect('');
    document.getElementById('student-track').value='현행';
    document.getElementById('student-level').value='기본';
    renderSubjectChips([]);
  }
  document.getElementById('student-modal-overlay').classList.add('active');
}
function closeStudentModal(){ document.getElementById('student-modal-overlay').classList.remove('active'); }

/* ===== 학생 일괄 등록 + Supabase 계정 자동 생성 (마스터 전용) ===== */
function openBulkStudentModal(){
  if(!isAdminUser()){ alert('학생 일괄 등록·계정 생성은 마스터(최고관리자)만 사용할 수 있습니다.'); return; }
  if(!(window.CLOUD && window.CLOUD.enabled)){ alert('클라우드(Supabase) 연결 상태에서만 계정을 생성할 수 있습니다.'); return; }
  document.getElementById('bulk-input').value='';
  const tsel = document.getElementById('bulk-teacher');
  if(tsel) tsel.innerHTML = `<option value="">미지정</option>` + DB.teachers.map(t=>`<option value="${t.id}">${t.name}</option>`).join('');
  const res = document.getElementById('bulk-result'); res.style.display='none'; res.textContent='';
  const btn = document.getElementById('bulk-submit-btn'); btn.disabled=false; btn.textContent='등록하고 계정 생성';
  document.getElementById('bulk-modal-overlay').classList.add('active');
}
function closeBulkStudentModal(){ document.getElementById('bulk-modal-overlay').classList.remove('active'); }

function parseBulkLines(text){
  const rows=[], errs=[];
  (text||'').split(/\r?\n/).forEach((line,i)=>{
    const raw=line.trim(); if(!raw) return;
    const p = raw.split(/[,\t]/).map(s=>s.trim());
    const name=p[0]||'', phone=p[1]||'', grade=p[2]||'';
    if(!name){ errs.push(`${i+1}행: 이름 없음`); return; }
    if(!isValidPhone(phone)){ errs.push(`${i+1}행: 휴대폰 형식 오류 (${phone||'빈칸'})`); return; }
    rows.push({ name, phone: Auth.norm(phone), grade });
  });
  return { rows, errs };
}

async function submitBulkStudents(){
  if(!isAdminUser()){ alert('마스터만 사용할 수 있습니다.'); return; }
  const res = document.getElementById('bulk-result');
  const btn = document.getElementById('bulk-submit-btn');
  const { rows, errs } = parseBulkLines(document.getElementById('bulk-input').value);
  res.style.display='block';
  if(errs.length){ res.textContent = '입력 오류:\n' + errs.join('\n') + '\n\n위 줄을 고치고 다시 시도하세요.'; return; }
  if(!rows.length){ res.textContent='등록할 학생이 없습니다.'; return; }

  // 배치 내 중복 휴대폰 제거
  const seen=new Set(), uniq=[];
  rows.forEach(r=>{ if(!seen.has(r.phone)){ seen.add(r.phone); uniq.push(r); } });

  const teacherId = (document.getElementById('bulk-teacher')||{}).value || '';
  btn.disabled=true; btn.textContent='처리 중…';
  let added=0, skipped=0; const toCreate=[];
  uniq.forEach(r=>{
    const exists = DB.students.find(s=>Auth.norm(s.phone)===r.phone);
    if(!exists){
      DB.students.push({
        id: uid(), name:r.name, grade:r.grade||'중1', cls:'', phone:r.phone,
        parentPhone:'', kakao:'', parentKakao:'', teacherId, courseTrack:'', courseLevel:'',
        courseSubjects:[], note:'', nickname:'', naesin:[], mock:[],
        createdAt:new Date().toISOString().slice(0,10)
      });
      added++;
    } else skipped++;
    toCreate.push({ name:r.name, login_id:r.phone });
  });
  saveDB(); renderAll();

  res.textContent = `학생 레코드: ${added}명 추가${skipped?`, ${skipped}명 기존(건너뜀)`:''}\n로그인 계정 생성 중…`;
  try{
    const { data, error } = await CLOUD.sb.functions.invoke('create-students', { body:{ students: toCreate } });
    if(error){
      res.textContent += `\n\n⚠️ 계정 생성 함수 호출 실패: ${error.message||error}\n('create-students' Edge Function이 배포되어 있는지 확인하세요.)`;
      btn.disabled=false; btn.textContent='다시 시도'; return;
    }
    if(data && data.error){
      res.textContent += `\n\n⚠️ ${data.error}`;
      btn.disabled=false; btn.textContent='다시 시도'; return;
    }
    const results = (data && data.results) || [];
    let ok=0, ex=0, fail=0; const lines=[];
    results.forEach(r=>{
      if(r.ok){ ok++; lines.push(`✓ ${r.name} (${r.login_id})`); }
      else if(/already|exists|registered/i.test(r.error||'')){ ex++; lines.push(`• ${r.name} (${r.login_id}) 이미 계정 있음`); }
      else { fail++; lines.push(`✗ ${r.name} (${r.login_id}) ${r.error||''}`); }
    });
    res.textContent = `학생 ${added}명 추가${skipped?`, ${skipped}명 기존`:''}\n계정: 생성 ${ok} · 기존 ${ex} · 실패 ${fail}\n\n`
      + lines.join('\n')
      + `\n\n학생에게 "휴대폰 번호 + 초기비밀번호 axis1234"를 안내하세요. 첫 로그인 시 비밀번호를 변경합니다.`;
  }catch(e){
    console.error('bulk create failed', e);
    res.textContent += `\n\n⚠️ 계정 생성 중 오류: ${e.message||e}`;
  }
  btn.disabled=false; btn.textContent='완료 (다시 등록)';
}

function saveStudent(){
  const name = document.getElementById('student-name').value.trim();
  if(!name){ alert('이름을 입력해주세요.'); return; }
  const id = document.getElementById('student-id').value;
  const phone = document.getElementById('student-phone').value.trim();
  const parentPhone = document.getElementById('student-parent-phone').value.trim();
  // 휴대폰 형식 검사 (입력된 경우)
  if(phone && !isValidPhone(phone)){ alert('학생 휴대폰 번호 형식이 올바르지 않습니다. (예: 010-1234-5678)'); return; }
  if(parentPhone && !isValidPhone(parentPhone)){ alert('학부모 휴대폰 번호 형식이 올바르지 않습니다.'); return; }
  // 휴대폰 중복(로그인 ID) 검사
  if(phone){
    const np = phone.replace(/[^0-9]/g,'');
    if(DB.students.some(s=> s.id!==id && (s.phone||'').replace(/[^0-9]/g,'')===np)){
      alert('이미 등록된 학생 휴대폰 번호입니다.'); return;
    }
  }
  // 동명이인 안내 (차단하지 않고 확인)
  if(DB.students.some(s=> s.id!==id && (s.name||'').trim()===name)){
    if(!confirm('같은 이름의 학생이 이미 있습니다. 그래도 등록할까요?')) return;
  }
  const data = {
    name,
    grade: document.getElementById('student-grade').value,
    cls: document.getElementById('student-class').value.trim(),
    phone,
    parentPhone,
    kakao: document.getElementById('student-kakao').value.trim(),
    parentKakao: document.getElementById('student-parent-kakao').value.trim(),
    teacherId: document.getElementById('student-teacher').value,
    courseTrack: document.getElementById('student-track').value,
    courseLevel: document.getElementById('student-level').value,
    courseSubjects: collectSubjects(),
    note: document.getElementById('student-note').value.trim(),
  };
  if(id){
    const s = DB.students.find(x=>x.id===id);
    if(!s){ alert('대상 학생을 찾을 수 없습니다. 목록을 새로고침해 주세요.'); return; }
    delete s.courseSubject; delete s.courseStage;
    Object.assign(s, data);
  } else {
    let n = DB.students.length + 1;
    let acc = 'student'+n;
    while(DB.students.some(x=>x.account===acc)){ n++; acc='student'+n; }
    DB.students.push({ id: uid(), ...data, account:acc, nickname:'', naesin:[], mock:[], createdAt: new Date().toISOString().slice(0,10) });
  }
  saveDB();
  closeStudentModal();
  renderAll();
  if(!id) autoCreateAccount('student', name, phone);   // 신규 학생 → 로그인 계정 자동 생성
  if(!id && isValidPhone(parentPhone)) autoCreateAccount('parent', name+' 학부모', parentPhone); // 학부모 계정도 자동 생성
}
function deleteStudent(id){
  const s = DB.students.find(x=>x.id===id);
  if(!s){ return; }
  if(!confirm(`'${s.name}' 학생을 삭제하시겠습니까?\n\n삭제 시 성적·라이벌·상담(활동)·포인트·엠블럼·목표·학부모 연결 기록도 함께 삭제됩니다. (되돌릴 수 없음)`)) return;
  DB.students = DB.students.filter(x=>x.id!==id);
  purgeStudentRefs(id);
  if(saveDB()) renderAll();
}

/* ---------- render: exams ---------- */
function renderExams(){
  const body = document.getElementById('exam-table-body');
  document.getElementById('exam-empty').style.display = DB.exams.length ? 'none':'block';
  const sorted = [...DB.exams].sort((a,b)=> (a.date<b.date?1:-1));
  body.innerHTML = sorted.map(ex=>{
    const list = examScoreList(ex.id);
    const qn = (ex.questions && ex.questions.length) ? ex.questions.length+'문항' : '<span style="color:var(--on-surface-variant);">총점입력</span>';
    return `
      <tr>
        <td style="font-weight:600;">${ex.name}</td>
        <td>${ex.date||'-'}</td>
        <td><span class="badge badge-navy">${ex.type}</span></td>
        <td>${qn}</td>
        <td>${ex.max||'-'}</td>
        <td>${list.length}명</td>
        <td>${fmt(examAverage(ex.id))}</td>
        <td style="text-align:right;">
          <button class="btn btn-ghost btn-sm" onclick="openExamModal('${ex.id}')"><span class="msym">edit</span>수정</button>
          <button class="btn btn-danger-ghost btn-sm" onclick="deleteExam('${ex.id}')"><span class="msym">delete</span>삭제</button>
        </td>
      </tr>
    `;
  }).join('');

  // score exam select
  const sel = document.getElementById('score-exam-select');
  const prevVal = sel.value;
  sel.innerHTML = sorted.map(ex=>`<option value="${ex.id}">${ex.name} (${ex.date||'일자없음'})</option>`).join('');
  if(sorted.length){
    sel.value = sorted.find(e=>e.id===prevVal) ? prevVal : sorted[0].id;
  }
  renderScoreTable();
}

function openExamModal(id){
  document.getElementById('exam-modal-title').textContent = id ? '시험 정보 수정' : '시험 추가';
  document.getElementById('exam-id').value = id||'';
  if(id){
    const ex = findExam(id);
    if(!ex) return;
    document.getElementById('exam-name').value = ex.name||'';
    document.getElementById('exam-date').value = ex.date||'';
    document.getElementById('exam-type').value = ex.type;
    renderQuestionRows(ex.questions||[]);
  } else {
    document.getElementById('exam-name').value='';
    document.getElementById('exam-date').value = new Date().toISOString().slice(0,10);
    document.getElementById('exam-type').value='모의고사';
    renderQuestionRows([]);
  }
  document.getElementById('exam-modal-overlay').classList.add('active');
}
function closeExamModal(){ document.getElementById('exam-modal-overlay').classList.remove('active'); }

/* ---- question builder in exam modal ---- */
function renderQuestionRows(questions){
  const wrap = document.getElementById('question-rows');
  wrap.innerHTML = '';
  questions.forEach(q=>appendQuestionRow(q));
  recalcExamMax();
}
function appendQuestionRow(q){
  const wrap = document.getElementById('question-rows');
  const idx = wrap.children.length + 1;
  const row = document.createElement('div');
  row.className = 'q-row';
  row.innerHTML = `
    <span class="q-no">${idx}</span>
    <select class="q-type" onchange="recalcExamMax()">
      <option value="mc">객관식</option>
      <option value="essay">서술형</option>
    </select>
    <input type="number" class="q-points" min="0" placeholder="배점" value="${q&&q.points!==undefined?q.points:''}" oninput="recalcExamMax()">
    <button type="button" class="btn btn-danger-ghost btn-sm" onclick="this.parentElement.remove();renumberQuestions();recalcExamMax();"><span class="msym">close</span></button>
  `;
  wrap.appendChild(row);
  if(q && q.type) row.querySelector('.q-type').value = q.type;
}
function addQuestionRow(){ appendQuestionRow({type:'mc', points:''}); }
function renumberQuestions(){
  document.querySelectorAll('#question-rows .q-row .q-no').forEach((el,i)=>el.textContent=i+1);
}
function collectQuestions(){
  const rows = [...document.querySelectorAll('#question-rows .q-row')];
  return rows.map((row,i)=>({
    no: i+1,
    type: row.querySelector('.q-type').value,
    points: Number(row.querySelector('.q-points').value)||0,
  }));
}
function recalcExamMax(){
  const total = collectQuestions().reduce((a,q)=>a+q.points,0);
  const maxEl = document.getElementById('exam-max');
  // if no questions, leave editable default 100
  if(document.querySelectorAll('#question-rows .q-row').length){
    maxEl.value = total;
  } else {
    maxEl.value = 100;
  }
}

function saveExam(){
  const name = document.getElementById('exam-name').value.trim();
  if(!name){ alert('시험명을 입력해주세요.'); return; }
  const date = document.getElementById('exam-date').value;
  if(!date){ alert('시험 날짜를 선택해주세요.'); return; }
  if(isNaN(new Date(date).getTime())){ alert('시험 날짜가 올바르지 않습니다.'); return; }
  const questions = collectQuestions();
  const hasQ = questions.length>0;
  if(hasQ){
    const sum = questions.reduce((a,q)=>a+(Number(q.points)||0),0);
    if(sum<=0){ alert('문항 배점의 합계가 0입니다. 배점을 확인해주세요.'); return; }
    if(questions.some(q=>(Number(q.points)||0)<=0)){
      if(!confirm('배점이 0인 문항이 있습니다. 이대로 저장할까요?')) return;
    }
  } else {
    const maxv = Number(document.getElementById('exam-max').value);
    if(document.getElementById('exam-max').value!=='' && (isNaN(maxv) || maxv<=0)){
      alert('총점(만점)이 올바르지 않습니다.'); return;
    }
  }
  const id = document.getElementById('exam-id').value;
  const data = {
    name,
    date,
    type: document.getElementById('exam-type').value,
    max: hasQ ? questions.reduce((a,q)=>a+(Number(q.points)||0),0) : (Number(document.getElementById('exam-max').value)||100),
    questions,
  };
  if(id){
    const ex = DB.exams.find(x=>x.id===id);
    if(!ex){ alert('대상 시험을 찾을 수 없습니다. 목록을 새로고침해 주세요.'); return; }
    Object.assign(ex, data);
  } else {
    const newId = uid();
    DB.exams.push({ id:newId, ...data });
    DB.scores[newId] = {};
  }
  saveDB();
  closeExamModal();
  renderAll();
}
function deleteExam(id){
  const ex = DB.exams.find(x=>x.id===id);
  if(!ex){ return; }
  if(!confirm(`'${ex.name}' 시험을 삭제하시겠습니까?\n\n입력된 점수와 이 시험으로 만들어진 라이벌 대결 기록도 함께 삭제됩니다. (되돌릴 수 없음)`)) return;
  DB.exams = DB.exams.filter(x=>x.id!==id);
  purgeExamRefs(id);
  if(saveDB()) renderAll();
}

/* ---------- score input ---------- */
function renderScoreTable(){
  const sel = document.getElementById('score-exam-select');
  const body = document.getElementById('score-table-body');
  const head = document.getElementById('score-table-head');
  const emptyEl = document.getElementById('score-empty');
  if(!sel || !body || !emptyEl) return;
  const examId = sel.value;
  const exam = DB.exams.find(e=>e.id===examId);
  const guide = document.getElementById('score-guide');

  if(!examId || !DB.students.length || !exam){
    body.innerHTML = ''; if(head) head.innerHTML='';
    emptyEl.style.display='block';
    if(guide) guide.innerHTML='';
    return;
  }
  emptyEl.style.display='none';

  const ranks = examRanks(examId);
  const rankMap = {}; ranks.forEach(r=>rankMap[r.studentId]=r.rank);

  const hasQuestions = exam.questions && exam.questions.length;

  if(guide){
    guide.innerHTML = hasQuestions
      ? `문항별 채점 · 객관식은 O/X를 누르고, 서술형은 받은 점수를 입력하면 총점이 자동 계산됩니다. (총 ${exam.questions.length}문항 / 만점 ${exam.questions.reduce((a,q)=>a+(Number(q.points)||0),0)}점)`
      : `이 시험은 문항이 등록되어 있지 않습니다. 총점을 직접 입력하세요. 문항별 채점을 원하면 시험 수정에서 문항을 추가하세요.`;
  }

  if(hasQuestions){
    // header: 이름 / 반 / 문항들 / 총점 / 등수
    head.innerHTML = `
      <tr>
        <th style="position:sticky;left:0;background:#f3f1ec;">이름</th>
        <th>반</th>
        ${exam.questions.map(q=>`<th style="text-align:center;white-space:nowrap;">${q.no}번<br><span style="font-weight:400;text-transform:none;letter-spacing:0;">${q.type==='mc'?'객관식':'서술형'} · ${q.points}점</span></th>`).join('')}
        <th style="text-align:center;">총점</th>
        <th>등수</th>
      </tr>`;
    body.innerHTML = managedStudents().map(s=>{
      const rec = (DB.scores[examId] && typeof DB.scores[examId][s.id]==='object') ? DB.scores[examId][s.id] : {byQ:{}};
      const byQ = rec.byQ || {};
      const total = studentTotal(examId, s.id);
      const rank = rankMap[s.id];
      const cells = exam.questions.map(q=>{
        const r = byQ[q.no] || {};
        if(q.type==='mc'){
          const state = r.correct===true ? 'o' : (r.correct===false ? 'x' : '');
          return `<td style="text-align:center;">
            <div class="ox-toggle">
              <button class="ox ox-o ${state==='o'?'active':''}" onclick="setMC('${examId}','${s.id}',${q.no},true)" title="정답">O</button>
              <button class="ox ox-x ${state==='x'?'active':''}" onclick="setMC('${examId}','${s.id}',${q.no},false)" title="오답">X</button>
            </div>
          </td>`;
        } else {
          const got = (r.got!==undefined && r.got!=='') ? r.got : '';
          return `<td style="text-align:center;">
            <input type="number" class="score-input" style="width:64px;" min="0" max="${q.points}" value="${got}" placeholder="/${q.points}"
              onchange="setEssay('${examId}','${s.id}',${q.no},this.value,${q.points})">
          </td>`;
        }
      }).join('');
      return `<tr>
        <td style="font-weight:600;position:sticky;left:0;background:#fff;">${s.name}</td>
        <td>${s.grade} ${s.cls||''}</td>
        ${cells}
        <td style="text-align:center;font-weight:700;color:var(--primary-container);">${total===null?'-':total}</td>
        <td>${rank ? (rank===1?`<span class="rank-1">${rank}위</span>`:rank+'위') : '-'}</td>
      </tr>`;
    }).join('');
  } else {
    // legacy total input
    head.innerHTML = `<tr><th>이름</th><th>학년/반</th><th style="width:120px;">점수</th><th>등수</th></tr>`;
    body.innerHTML = managedStudents().map(s=>{
      const raw = (DB.scores[examId] && DB.scores[examId][s.id]!==undefined && typeof DB.scores[examId][s.id]!=='object') ? DB.scores[examId][s.id] : '';
      const rank = rankMap[s.id];
      return `<tr>
        <td style="font-weight:600;">${s.name}</td>
        <td>${s.grade} ${s.cls||''}</td>
        <td><input type="number" class="score-input" min="0" value="${raw}" data-student="${s.id}" onchange="updateScore('${examId}', this)"></td>
        <td>${rank ? (rank===1?`<span class="rank-1">${rank}위</span>`:rank+'위') : '-'}</td>
      </tr>`;
    }).join('');
  }
}

function ensureRec(examId, studentId){
  if(!DB.scores[examId]) DB.scores[examId] = {};
  let rec = DB.scores[examId][studentId];
  if(typeof rec !== 'object' || rec===null){ rec = {byQ:{}}; DB.scores[examId][studentId] = rec; }
  if(!rec.byQ) rec.byQ = {};
  return rec;
}
function setMC(examId, studentId, qNo, correct){
  const rec = ensureRec(examId, studentId);
  const cur = rec.byQ[qNo];
  // toggle off if same state clicked again
  if(cur && cur.correct===correct){ delete rec.byQ[qNo]; }
  else { rec.byQ[qNo] = {correct}; }
  saveDB();
  recalcRivalForExam(examId);
  renderScoreTable();
  renderExams();
}
function setEssay(examId, studentId, qNo, val, maxPts){
  const rec = ensureRec(examId, studentId);
  if(val===''){ delete rec.byQ[qNo]; }
  else {
    let n = Number(val); if(isNaN(n)) n=0;
    if(n<0) n=0; if(n>maxPts) n=maxPts;
    rec.byQ[qNo] = {got:n};
  }
  saveDB();
  recalcRivalForExam(examId);
  renderScoreTable();
  renderExams();
}
function updateScore(examId, inputEl){
  if(!DB.scores[examId]) DB.scores[examId] = {};
  const exam = DB.exams.find(e=>e.id===examId);
  const max = exam ? (Number(exam.max)||100) : 100;
  const raw = (inputEl.value||'').trim();
  let stored;
  if(raw===''){ stored=''; }
  else {
    let n = Number(raw);
    if(isNaN(n)){ n = 0; }
    n = Math.max(0, Math.min(max, n));   // 0~만점 범위로 보정
    stored = n;
    if(String(n)!==raw) inputEl.value = n; // 보정값을 입력칸에도 반영
  }
  DB.scores[examId][inputEl.dataset.student] = stored;
  saveDB();
  recalcRivalForExam(examId);
  renderScoreTable();
  renderExams();
}

/* ---------- stats charts ---------- */
let examStatsChartInst, trendChartInst;

/* fill a <select> with exam-type options (전체 + existing types), preserving selection */
function fillTypeFilter(selectId){
  const sel = document.getElementById(selectId);
  if(!sel) return '전체';
  const types = [...new Set(DB.exams.map(e=>e.type).filter(Boolean))];
  const prev = sel.value || '전체';
  sel.innerHTML = `<option value="전체">전체 종류</option>` + types.map(t=>`<option value="${t}">${t}</option>`).join('');
  sel.value = (prev==='전체' || types.includes(prev)) ? prev : '전체';
  return sel.value;
}
/* exams of a given type, oldest first (recent on the right) */
function examsByType(type){
  return [...DB.exams]
    .filter(e=> type==='전체' || e.type===type)
    .sort((a,b)=> (a.date>b.date?1:-1));
}

function renderStatsCharts(){
  const type = fillTypeFilter('stats-type-filter');
  const sorted = examsByType(type);
  const labels = sorted.map(e=>e.name);
  const avgData = sorted.map(e=> examAverage(e.id));
  const maxData = sorted.map(e=>{
    const list = examScoreList(e.id);
    return list.length ? Math.max(...list.map(x=>x.score)) : null;
  });
  const minData = sorted.map(e=>{
    const list = examScoreList(e.id);
    return list.length ? Math.min(...list.map(x=>x.score)) : null;
  });

  const ctx = document.getElementById('examStatsChart');
  if(!ctx) return;
  if(examStatsChartInst){ examStatsChartInst.destroy(); examStatsChartInst=null; }
  if(!labels.length){ chartEmpty(ctx, '표시할 시험 데이터가 없습니다. 시험을 먼저 생성하세요.'); }
  else examStatsChartInst = new Chart(ctx, {
    type:'bar',
    data:{
      labels,
      datasets:[
        {label:'최고', data:maxData, backgroundColor:'#eac076'},
        {label:'평균', data:avgData, backgroundColor:'#081f4d'},
        {label:'최저', data:minData, backgroundColor:'#c5c6d0'},
      ]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{ display:false } },
      scales:{ y:{ beginAtZero:true, max:100 } }
    }
  });

  // trend student select
  const trendSel = document.getElementById('trend-student-select');
  if(trendSel){
    const prevVal = trendSel.value;
    trendSel.innerHTML = managedStudents().map(s=>`<option value="${s.id}">${s.name}</option>`).join('');
    if(DB.students.length){
      trendSel.value = DB.students.find(s=>s.id===prevVal) ? prevVal : DB.students[0].id;
    }
  }
  renderTrendChart();
}

function renderTrendChart(){
  const trendSel = document.getElementById('trend-student-select');
  if(!trendSel) return;
  const studentId = trendSel.value;
  const type = document.getElementById('stats-type-filter') ? document.getElementById('stats-type-filter').value : '전체';
  const sorted = examsByType(type);
  const labels = sorted.map(e=>e.name);
  const data = sorted.map(e=> studentTotal(e.id, studentId));
  const avgData = sorted.map(e=>examAverage(e.id));

  const ctx = document.getElementById('trendChart');
  if(!ctx) return;
  if(trendChartInst){ trendChartInst.destroy(); trendChartInst=null; }
  if(!labels.length){ chartEmpty(ctx, '표시할 데이터가 없습니다.'); return; }
  trendChartInst = new Chart(ctx, {
    type:'line',
    data:{
      labels,
      datasets:[
        {label:'학생 점수', data, borderColor:'#785919', backgroundColor:'#785919', tension:.3, spanGaps:true, borderWidth:3, pointRadius:4},
        {label:'전체 평균', data:avgData, borderColor:'#9aa3b5', backgroundColor:'#9aa3b5', borderDash:[5,4], tension:.3, spanGaps:true, borderWidth:2, pointRadius:3},
      ]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{ display:false } },
      scales:{ y:{ beginAtZero:true, max:100 } }
    }
  });
}

/* ---------- report card ---------- */
function renderReportSelect(){
  const sel = document.getElementById('report-student-select');
  const prevVal = sel.value;
  sel.innerHTML = managedStudents().map(s=>`<option value="${s.id}">${s.name} (${s.grade} ${s.cls||''})</option>`).join('');
  if(DB.students.length){
    sel.value = DB.students.find(s=>s.id===prevVal) ? prevVal : DB.students[0].id;
  }
  renderReportCard();
}

function renderReportCard(){
  const wrap = document.getElementById('report-wrap');
  const studentId = document.getElementById('report-student-select').value;
  if(!studentId || !DB.students.length){
    wrap.innerHTML = `<div class="empty" id="report-empty"><span class="msym">description</span>학생을 선택하면 성적표가 표시됩니다.</div>`;
    return;
  }
  const s = DB.students.find(x=>x.id===studentId);
  const sortedExams = [...DB.exams].sort((a,b)=> (a.date<b.date?1:-1));

  const rows = sortedExams.map(ex=>{
    const v = studentTotal(ex.id, studentId);
    if(v===null) return null;
    const ranks = examRanks(ex.id);
    const rankInfo = ranks.find(r=>r.studentId===studentId);
    const avg = examAverage(ex.id);
    return {exam:ex, score:v, rank:rankInfo?rankInfo.rank:null, total:examScoreList(ex.id).length, avg};
  }).filter(Boolean);

  const scores = rows.map(r=>r.score);
  const myAvg = scores.length ? scores.reduce((a,b)=>a+b,0)/scores.length : null;
  const best = scores.length ? Math.max(...scores) : null;
  const bestRank = rows.length ? Math.min(...rows.map(r=>r.rank||999)) : null;

  wrap.innerHTML = `
    <div class="report-card">
      <div class="report-header">
        <div>
          <div class="brand">AXIS</div>
          <div class="brand-sub">Student Performance Report</div>
        </div>
        <div class="doc-type">
          <div class="t">성적표</div>
          <div class="d">발행일 ${new Date().toISOString().slice(0,10)}</div>
        </div>
      </div>
      <div class="report-student">
        <div>
          <h2>${s.name}</h2>
          <div class="meta">${s.grade} ${s.cls||''}${courseLabel(s)?' · '+courseLabel(s):''}${teacherName(s.teacherId)?' · 담당 '+teacherName(s.teacherId)+' 선생님':''}${s.note ? ' · '+s.note : ''}</div>
        </div>
        <div class="meta" style="text-align:right;">
          학생 연락처 ${s.phone||'-'}<br>학부모 연락처 ${s.parentPhone||'-'}<br>학생 카톡 ${s.kakao||'-'} · 학부모 카톡 ${s.parentKakao||'-'}
        </div>
      </div>
      <div class="report-summary">
        <div><div class="lbl">응시 시험</div><div class="num">${rows.length}회</div></div>
        <div><div class="lbl">평균 점수</div><div class="num">${fmt(myAvg)}</div></div>
        <div><div class="lbl">최고 점수</div><div class="num">${fmt(best)}</div></div>
      </div>
      <div class="report-body">
        <h4>시험별 상세 기록</h4>
        <table>
          <thead><tr><th>일자</th><th>시험명</th><th>구분</th><th>점수</th><th>전체 평균</th><th>등수</th></tr></thead>
          <tbody>
            ${rows.length ? rows.map(r=>`
              <tr>
                <td>${r.exam.date||'-'}</td>
                <td style="font-weight:600;">${r.exam.name}</td>
                <td><span class="badge badge-navy">${r.exam.type}</span></td>
                <td style="font-weight:700;color:var(--primary-container);">${r.score}</td>
                <td>${fmt(r.avg)}</td>
                <td>${r.rank ? r.rank+' / '+r.total : '-'}</td>
              </tr>
            `).join('') : `<tr><td colspan="6" style="text-align:center;color:var(--on-surface-variant);">입력된 성적이 없습니다</td></tr>`}
          </tbody>
        </table>
      </div>
      <div class="report-foot">
        본 성적표는 AXIS 성적 관리 시스템에서 자동 생성되었습니다. 문의사항은 담당 선생님께 연락해주세요.
      </div>
    </div>
  `;
}

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

/* ====================================================
   AUTH / LOGIN
   ==================================================== */
const SESSION_KEY = 'axis_session_v1';
const INIT_PW = 'axis1234';   // 초기 비밀번호 (첫 로그인 시 강제 변경)

/* ====================================================================
   AUTH / ACCOUNT MODULE  ·  Master · Teacher · Student · Parent
   - 휴대폰 번호를 모든 계정의 기본 식별자로 사용 (카카오 연동 대비)
   - Parent ↔ Student 는 1:1이 아닌 M:N (guardianLinks 중간 테이블)
   - 초기 비밀번호 axis1234, 첫 로그인 시 강제 변경, 자동 로그인 지원
   - 기존 데이터(students/teachers/parentPhone)는 sync()로 무중단 마이그레이션
   ==================================================================== */
/** @typedef {{pw:string, mustChange:boolean}} Cred */
/** @typedef {{id:string,name:string,phone:string,memo:string}} ParentAccount */
/** @typedef {{id:string,parentId:string,studentId:string,relation:string}} GuardianLink */
const Auth = {
  /** 휴대폰 정규화(숫자만). 01012345678 / 010-1234-5678 모두 허용 @param {string} p */
  norm(p){ return (p||'').replace(/[^0-9]/g,''); },

  /** 필수 컬렉션 보장 */
  ensure(){
    if(!DB.auth) DB.auth = {};
    if(!DB.auth.master) DB.auth.master = { id:'AxMaster', pw:INIT_PW, mustChange:true };
    if(!DB.auth.creds)  DB.auth.creds  = {};            // normPhone -> Cred
    if(!Array.isArray(DB.parents)) DB.parents = [];           // ParentAccount[]
    if(!Array.isArray(DB.guardianLinks)) DB.guardianLinks = []; // GuardianLink[]
  },

  /** 학생번호 생성: YYMMDD + 당일 4자리 순번 (예: 2606200001) */
  genStudentNo(createdAt){
    let base = (createdAt||'').slice(0,10);
    if(!/^\d{4}-\d{2}-\d{2}$/.test(base)) base = new Date().toISOString().slice(0,10);
    const ymd = base.slice(2).replace(/-/g,'');         // YYMMDD
    let max = 0;
    DB.students.forEach(s=>{ if(s.studentNo && String(s.studentNo).slice(0,6)===ymd){
      const seq = parseInt(String(s.studentNo).slice(6),10); if(seq>max) max=seq; }});
    return ymd + String(max+1).padStart(4,'0');
  },
  /** 선생님 내부 아이디: AXT001 ... */
  genTeacherNo(){
    let max=0; DB.teachers.forEach(t=>{ if(t.teacherNo){ const n=parseInt(String(t.teacherNo).slice(3),10); if(n>max) max=n; }});
    return 'AXT' + String(max+1).padStart(3,'0');
  },

  /** 자격증명 기본값(없을 때만). 이미 변경된 비번은 보존 @param {string} phone */
  ensureCred(phone){
    const p = this.norm(phone); if(p.length<8) return;
    if(!DB.auth.creds[p]) DB.auth.creds[p] = { pw:INIT_PW, mustChange:true };
  },

  /** 학부모 dedupe(휴대폰 기준) → ParentAccount */
  upsertParent(name, phone, memo){
    const p = this.norm(phone); if(p.length<8) return null;
    let par = DB.parents.find(x=>this.norm(x.phone)===p);
    if(!par){ par = { id:uid(), name:name||'학부모', phone:p, memo:memo||'' }; DB.parents.push(par); }
    else if(name && (!par.name || par.name==='학부모')) par.name = name;
    return par;
  },
  /** 보호자-학생 연결(M:N). relation: 부/모/보호자 등 */
  linkGuardian(parentId, studentId, relation){
    if(!parentId||!studentId) return;
    const ex = DB.guardianLinks.find(l=>l.parentId===parentId && l.studentId===studentId);
    if(ex){ if(relation) ex.relation = relation; return; }
    DB.guardianLinks.push({ id:uid(), parentId, studentId, relation:relation||'보호자' });
  },

  /** 번호/계정/크리덴셜/학부모 junction 보정 (idempotent, 무중단 마이그레이션) */
  sync(){
    try{
      this.ensure();
      DB.teachers.forEach(t=>{ if(!t.teacherNo) t.teacherNo = this.genTeacherNo(); this.ensureCred(t.phone); });
      DB.students.forEach(s=>{
        if(!s.studentNo) s.studentNo = this.genStudentNo(s.createdAt);
        if(!s.account || !/^AX\d{10}$/.test(s.account)) s.account = 'AX' + s.studentNo;
        this.ensureCred(s.phone);
        if(s.parentPhone){
          const par = this.upsertParent(s.parentName, s.parentPhone, s.parentMemo);
          if(par){ this.linkGuardian(par.id, s.id, s.parentRelation||'보호자'); this.ensureCred(par.phone); }
        }
      });
    }catch(e){ console.error('Auth.sync failed', e); }
  },
  migrate(){ this.ensure(); this.sync(); },

  /** 학부모 휴대폰 → 연결 학생 id 목록 (junction 우선, parentPhone fallback) */
  childrenOf(phone){
    const p = this.norm(phone);
    const par = DB.parents.find(x=>this.norm(x.phone)===p);
    let ids = [];
    if(par) ids = DB.guardianLinks.filter(l=>l.parentId===par.id).map(l=>l.studentId);
    if(!ids.length) ids = DB.students.filter(s=>this.norm(s.parentPhone)===p).map(s=>s.id);
    return ids.filter(id=>DB.students.some(s=>s.id===id));
  },

  /** @returns {{ok:boolean,mustChange:boolean}|null} */
  checkMaster(id, pw){
    this.ensure(); const m = DB.auth.master;
    if(id!==m.id || pw!==m.pw) return null;
    return { ok:true, mustChange:!!m.mustChange };
  },
  /** @returns {{ok:boolean,mustChange:boolean}|null} */
  checkPhone(phone, pw){
    this.ensure(); const p = this.norm(phone);
    const c = DB.auth.creds[p];
    if(!c){ if(pw===INIT_PW){ DB.auth.creds[p] = { pw:INIT_PW, mustChange:true }; return { ok:true, mustChange:true }; } return null; }
    if(pw!==c.pw) return null;
    return { ok:true, mustChange:!!c.mustChange };
  },

  setMasterPw(newPw){ this.ensure(); DB.auth.master.pw = newPw; DB.auth.master.mustChange = false; saveDB(); },
  setPhonePw(phone, newPw){ this.ensure(); DB.auth.creds[this.norm(phone)] = { pw:newPw, mustChange:false }; saveDB(); }
};

const ADMIN_USER = 'AxMaster';   // (호환) 최고관리자 아이디
let SESSION = null;
let loginRole = 'teacher';
/* 강제 비밀번호 변경 대기 상태 */
let pendingSession = null, pendingCred = null, pendingRemember = true;

function normalizePhone(p){ return (p||'').replace(/[^0-9]/g,''); }

const ROLE_META = {
  master:  {idLabel:'아이디',      icon:'shield_person',   ph:'AxMaster',     master:true},
  teacher: {idLabel:'휴대폰 번호',  icon:'person',          ph:'010-1234-5678'},
  student: {idLabel:'휴대폰 번호',  icon:'school',          ph:'010-1234-5678'},
  parent:  {idLabel:'휴대폰 번호',  icon:'family_restroom', ph:'010-1234-5678'},
};

function setLoginRole(role){
  loginRole = role || 'auto';
  const idEl = document.getElementById('login-id'); if(idEl) idEl.value = '';
  const pwEl = document.getElementById('login-pw'); if(pwEl) pwEl.value = '';
  const er = document.getElementById('login-error'); if(er) er.style.display='none';
  hideForceChange();
  updateLoginHint();
}

function updateLoginHint(){
  const hint = document.getElementById('login-hint');
  if(!hint) return;
  hint.innerHTML = `휴대폰 번호와 비밀번호로 로그인하세요.<br>처음 로그인하면 초기 비밀번호를 반드시 새 비밀번호로 변경해야 합니다.`;
}

/**
 * 로그인 진입점. 클라우드(Supabase) 연결 시 클라우드 로그인, 아니면 기존 로컬 로그인.
 */
function doLogin(){
  if(window.CLOUD && window.CLOUD.enabled) return doLoginCloud();
  return doLoginLocal();
}

/**
 * 로컬(localStorage) 로그인. Master=아이디, Teacher/Student/Parent=휴대폰 번호 + 비밀번호.
 * 초기 비밀번호(axis1234) 사용 계정은 강제 비밀번호 변경 화면으로 이동한다.
 */
function doLoginLocal(){
  const idRaw   = document.getElementById('login-id').value.trim();
  const pw      = document.getElementById('login-pw').value;
  const remember= document.getElementById('login-remember').checked;
  const errEl   = document.getElementById('login-error');

  let session = null, must = false, credRef = null;
  try{
    if(loginRole==='master'){
      const r = Auth.checkMaster(idRaw, pw);
      if(r){ session = { role:'admin', name:'최고관리자', account:'AxMaster', master:true };
             must = r.mustChange; credRef = { kind:'master' }; }
    } else {
      const phone = Auth.norm(idRaw);                 // 01012345678 / 010-1234-5678 모두 허용
      if(phone.length>=8){
        const r = Auth.checkPhone(phone, pw);
        if(r){
          must = r.mustChange; credRef = { kind:'phone', phone };
          if(loginRole==='teacher'){
            const t = DB.teachers.find(t=>Auth.norm(t.phone)===phone);
            if(t) session = { role:'teacher', name:t.name, teacherId:t.id, phone };
          } else if(loginRole==='student'){
            const s = DB.students.find(s=>Auth.norm(s.phone)===phone);
            if(s) session = { role:'student', name:s.name, account:s.account, studentId:s.id, phone };
          } else if(loginRole==='parent'){
            const kids = Auth.childrenOf(phone);
            if(kids.length){
              const par = DB.parents.find(x=>Auth.norm(x.phone)===phone);
              session = { role:'parent', name:(par&&par.name?par.name:'학부모')+' 학부모',
                          parentPhone:phone, childIds:kids, studentId:kids[0] };
            }
          }
        }
      }
    }
  }catch(e){ console.error('login error', e); }

  if(!session){ errEl.style.display='block'; return; }
  errEl.style.display='none';

  if(must){                                            // 첫 로그인 → 비밀번호 강제 변경
    pendingSession = session; pendingCred = credRef; pendingRemember = remember;
    showForceChange();
    return;
  }
  finalizeLogin(session, remember);
}

/** 세션 확정 + 자동 로그인 저장(remember=localStorage, 아니면 sessionStorage) */
function finalizeLogin(session, remember){
  SESSION = session;
  try{
    if(remember){ localStorage.setItem(SESSION_KEY, JSON.stringify(session)); sessionStorage.removeItem(SESSION_KEY); }
    else        { sessionStorage.setItem(SESSION_KEY, JSON.stringify(session)); localStorage.removeItem(SESSION_KEY); }
  }catch(e){ console.error('session save failed', e); }
  enterApp();
}

/* ---- 강제 비밀번호 변경 화면 ---- */
function showForceChange(){
  const f = document.getElementById('login-form'); if(f) f.style.display='none';
  const tabs = document.querySelector('#login-screen .role-tabs'); if(tabs) tabs.style.display='none';
  const hint = document.getElementById('login-hint'); if(hint) hint.style.display='none';
  const fc = document.getElementById('force-change'); if(fc) fc.style.display='block';
  const e = document.getElementById('fc-error'); if(e) e.style.display='none';
  const p1 = document.getElementById('fc-pw1'), p2 = document.getElementById('fc-pw2');
  if(p1) p1.value=''; if(p2) p2.value=''; if(p1) p1.focus();
}
function hideForceChange(){
  const fc = document.getElementById('force-change'); if(fc) fc.style.display='none';
  const f = document.getElementById('login-form'); if(f) f.style.display='';
  const tabs = document.querySelector('#login-screen .role-tabs'); if(tabs) tabs.style.display='';
  const hint = document.getElementById('login-hint'); if(hint) hint.style.display='';
}
function submitForceChange(){
  if(window.CLOUD && window.CLOUD.enabled && pendingCred && pendingCred.kind==='cloud') return submitForceChangeCloud();
  return submitForceChangeLocal();
}
function submitForceChangeLocal(){
  const p1 = document.getElementById('fc-pw1').value;
  const p2 = document.getElementById('fc-pw2').value;
  const err = document.getElementById('fc-error');
  if(!p1 || p1.length<4 || p1!==p2 || p1===INIT_PW){
    err.textContent = (p1===INIT_PW) ? '초기 비밀번호와 다른 비밀번호를 사용하세요.' : '비밀번호가 일치하지 않거나 너무 짧습니다.(4자 이상)';
    err.style.display='block'; return;
  }
  try{
    if(pendingCred && pendingCred.kind==='master') Auth.setMasterPw(p1);
    else if(pendingCred && pendingCred.kind==='phone') Auth.setPhonePw(pendingCred.phone, p1);
  }catch(e){ console.error('pw change failed', e); }
  const s = pendingSession, r = pendingRemember;
  pendingSession = pendingCred = null;
  hideForceChange();
  finalizeLogin(s, r);
}

function doLogout(){
  SESSION = null;
  try{ if(window.CLOUD && window.CLOUD.enabled) window.CLOUD.signOut(); }catch(e){}
  try{ localStorage.removeItem(SESSION_KEY); sessionStorage.removeItem(SESSION_KEY); }catch(e){}
  document.getElementById('app-root').classList.add('hidden');
  document.getElementById('login-screen').style.display='flex';
  document.getElementById('login-pw').value='';
  hideForceChange();
  setLoginRole('teacher');
}

/** 자동 로그인 복원. 저장된 세션을 현재 DB로 검증한다. */
function restoreSession(){
  let raw = null;
  try{ raw = localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY); }catch(e){ return false; }
  if(!raw) return false;
  try{
    const s = JSON.parse(raw);
    if(s.role==='admin'){
      // 최고관리자 (master)
    } else if(s.role==='teacher'){
      const t = DB.teachers.find(x=>x.id===s.teacherId) || DB.teachers.find(x=>Auth.norm(x.phone)===Auth.norm(s.phone));
      if(!t) return false; s.name = t.name; s.teacherId = t.id;
    } else if(s.role==='student'){
      const stu = DB.students.find(x=>x.id===s.studentId) || DB.students.find(x=>Auth.norm(x.phone)===Auth.norm(s.phone));
      if(!stu) return false; s.studentId = stu.id; s.name = stu.name; s.account = stu.account;
    } else if(s.role==='parent'){
      const kids = Auth.childrenOf(s.parentPhone);
      if(!kids.length) return false;
      s.childIds = kids;
      if(!kids.includes(s.studentId)) s.studentId = kids[0];
    } else return false;
    SESSION = s;
    return true;
  }catch(e){ console.error('restore failed', e); return false; }
}

/* is the current session a "viewer" (student or parent) seeing student data? */
function isViewer(){ return SESSION && (SESSION.role==='student' || SESSION.role==='parent'); }
function isStaff(){ return SESSION && (SESSION.role==='admin' || SESSION.role==='teacher'); }
function isAdminUser(){ return SESSION && SESSION.role==='admin'; }
function isTeacherUser(){ return SESSION && SESSION.role==='teacher'; }
/* students the current staff user is allowed to manage/see */
function managedStudents(){
  if(isTeacherUser()) return DB.students.filter(s=>s.teacherId===SESSION.teacherId && (s.status||'재원')!=='퇴원');
  return DB.students.slice();
}
function canSeeStudent(id){
  if(isAdminUser()) return true;
  if(isTeacherUser()) { const s=DB.students.find(x=>x.id===id); return s && s.teacherId===SESSION.teacherId; }
  return false;
}

function enterApp(){
  document.getElementById('login-screen').style.display='none';
  document.getElementById('app-root').classList.remove('hidden');

  const staff = isStaff();
  const adminOnly = isAdminUser();
  const viewer = isViewer();
  document.getElementById('nav-admin').classList.toggle('hidden', !staff);
  document.getElementById('nav-student').classList.toggle('hidden', !viewer);
  // teacher-list management is admin-only
  const teacherNav = document.querySelector('#nav-admin a[data-view="teachers"]');
  if(teacherNav) teacherNav.style.display = adminOnly ? '' : 'none';
  // homer grading is student-only
  const homerNav = document.querySelector('#nav-student a[data-view="my-homer"]');
  if(homerNav) homerNav.style.display = (SESSION.role==='parent') ? 'none' : '';
  // 라이벌은 학부모에게 숨김 (학생만 표시)
  const rivalNav = document.querySelector('#nav-student a[data-view="my-rival"]');
  if(rivalNav) rivalNav.style.display = (SESSION.role==='parent') ? 'none' : '';

  // user box
  document.getElementById('user-avatar').textContent = SESSION.name.slice(0,1);
  document.getElementById('user-name').textContent = SESSION.name + (SESSION.role==='teacher' ? ' 선생님' : '');
  document.getElementById('user-role').textContent =
    SESSION.role==='admin' ? 'Master' : (SESSION.role==='teacher' ? 'Teacher' : (SESSION.role==='parent' ? 'Parent' : 'Student'));
  // 학생: 레벨 · 칭호 표시 (성장 시스템 연동)
  if(SESSION.role==='student' && SESSION.studentId){
    try{ const gd = getAchievement(SESSION.studentId);
      document.getElementById('user-role').textContent = 'Lv ' + gd.level + ' · ' + (gd.title || '분석가'); }catch(e){}
  }

  // parent child switcher
  renderChildSwitcher();

  // course/teacher panel (viewer only)
  const uc = document.getElementById('user-course');
  if(viewer){
    const s = DB.students.find(x=>x.id===SESSION.studentId);
    const course = courseLabel(s);
    const tname = teacherName(s && s.teacherId);
    uc.innerHTML = `
      <div class="row"><span class="msym">badge</span><span class="k">담당</span> ${tname?tname+' 선생님':'미지정'}</div>
      <div class="row"><span class="msym">menu_book</span><span class="k">과정</span> ${course||'-'}</div>
    `;
    uc.classList.remove('hidden');
  } else if(SESSION.role==='teacher'){
    const n = managedStudents().length;
    uc.innerHTML = `<div class="row"><span class="msym">groups</span><span class="k">담당 학생</span> ${n}명</div>`;
    uc.classList.remove('hidden');
  } else {
    uc.classList.add('hidden');
  }

  // reset active view to the first menu of the role
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.querySelectorAll('.nav a').forEach(x=>x.classList.remove('active'));
  if(staff){
    document.getElementById('view-dashboard').classList.add('active');
    document.querySelector('#nav-admin a[data-view="dashboard"]').classList.add('active');
  } else {
    document.getElementById('view-my-growth').classList.add('active');
    document.querySelector('#nav-student a[data-view="my-growth"]').classList.add('active');
  }
  renderAll();
}

/* parent: switch among children */
function renderChildSwitcher(){
  const box = document.getElementById('child-switcher');
  if(!box) return;
  if(SESSION && SESSION.role==='parent' && SESSION.childIds && SESSION.childIds.length>1){
    box.innerHTML = `<label style="color:rgba(255,255,255,.6);font-size:11px;margin:0 0 6px;">자녀 선택</label>
      <select id="child-select" onchange="switchChild(this.value)">
        ${SESSION.childIds.map(id=>{const s=DB.students.find(x=>x.id===id);return `<option value="${id}" ${id===SESSION.studentId?'selected':''}>${s?s.name:''}</option>`;}).join('')}
      </select>`;
    box.classList.remove('hidden');
  } else {
    box.innerHTML=''; box.classList.add('hidden');
  }
}
function switchChild(id){
  SESSION.studentId = id;
  // refresh course panel + views
  const s = DB.students.find(x=>x.id===id);
  const uc = document.getElementById('user-course');
  if(uc){
    uc.innerHTML = `
      <div class="row"><span class="msym">badge</span><span class="k">담당</span> ${teacherName(s&&s.teacherId)?teacherName(s.teacherId)+' 선생님':'미지정'}</div>
      <div class="row"><span class="msym">menu_book</span><span class="k">과정</span> ${courseLabel(s)||'-'}</div>`;
  }
  renderAll();
}

/* ---------- student views ---------- */
function buildReportHTML(studentId){
  const s = DB.students.find(x=>x.id===studentId);
  if(!s) return `<div class="empty"><span class="msym">person_off</span>학생 정보를 찾을 수 없습니다.</div>`;
  const sortedExams = [...DB.exams].sort((a,b)=> (a.date<b.date?1:-1));
  const rows = sortedExams.map(ex=>{
    const v = studentTotal(ex.id, studentId);
    if(v===null) return null;
    const ranks = examRanks(ex.id);
    const rankInfo = ranks.find(r=>r.studentId===studentId);
    const avg = examAverage(ex.id);
    return {exam:ex, score:v, rank:rankInfo?rankInfo.rank:null, total:examScoreList(ex.id).length, avg};
  }).filter(Boolean);
  const scores = rows.map(r=>r.score);
  const myAvg = scores.length ? scores.reduce((a,b)=>a+b,0)/scores.length : null;
  const best = scores.length ? Math.max(...scores) : null;

  return `
    <div class="report-card">
      <div class="report-header">
        <div>
          <div class="brand">AXIS</div>
          <div class="brand-sub">Student Performance Report</div>
        </div>
        <div class="doc-type">
          <div class="t">성적표</div>
          <div class="d">발행일 ${new Date().toISOString().slice(0,10)}</div>
        </div>
      </div>
      <div class="report-student">
        <div>
          <h2>${s.name}</h2>
          <div class="meta">${s.grade} ${s.cls||''}${courseLabel(s)?' · '+courseLabel(s):''}${teacherName(s.teacherId)?' · 담당 '+teacherName(s.teacherId)+' 선생님':''}${s.note ? ' · '+s.note : ''}</div>
        </div>
        <div class="meta" style="text-align:right;">
          학생 연락처 ${s.phone||'-'}<br>학부모 연락처 ${s.parentPhone||'-'}<br>학생 카톡 ${s.kakao||'-'} · 학부모 카톡 ${s.parentKakao||'-'}
        </div>
      </div>
      <div class="report-summary">
        <div><div class="lbl">응시 시험</div><div class="num">${rows.length}회</div></div>
        <div><div class="lbl">평균 점수</div><div class="num">${fmt(myAvg)}</div></div>
        <div><div class="lbl">최고 점수</div><div class="num">${fmt(best)}</div></div>
      </div>
      <div class="report-body">
        <h4>시험별 상세 기록</h4>
        <table>
          <thead><tr><th>일자</th><th>시험명</th><th>구분</th><th>점수</th><th>전체 평균</th><th>등수</th></tr></thead>
          <tbody>
            ${rows.length ? rows.map(r=>`
              <tr>
                <td>${r.exam.date||'-'}</td>
                <td style="font-weight:600;">${r.exam.name}</td>
                <td><span class="badge badge-navy">${r.exam.type}</span></td>
                <td style="font-weight:700;color:var(--primary-container);">${r.score}</td>
                <td>${fmt(r.avg)}</td>
                <td>${r.rank ? r.rank+' / '+r.total : '-'}</td>
              </tr>
            `).join('') : `<tr><td colspan="6" style="text-align:center;color:var(--on-surface-variant);">입력된 성적이 없습니다</td></tr>`}
          </tbody>
        </table>
      </div>
      <div class="report-foot">
        본 성적표는 AXIS 성적 관리 시스템에서 자동 생성되었습니다. 문의사항은 담당 선생님께 연락해주세요.
      </div>
    </div>
  `;
}

function renderMyReport(){
  if(!isViewer()) return;
  document.getElementById('my-report-wrap').innerHTML = buildReportHTML(SESSION.studentId);
}

let myTrendChartInst;
function renderMyTrend(){
  if(!isViewer()) return;
  const studentId = SESSION.studentId;

  // course/teacher banner
  const me = DB.students.find(x=>x.id===studentId);
  const course = courseLabel(me);
  const tname = teacherName(me && me.teacherId);
  document.getElementById('my-course-banner').innerHTML = `
    <div class="card card-pad" style="margin-bottom:24px;display:flex;gap:28px;flex-wrap:wrap;align-items:center;">
      <div style="display:flex;align-items:center;gap:10px;">
        <span class="msym" style="color:var(--secondary);">badge</span>
        <div><div class="helper" style="margin:0;">담당 선생님</div><div style="font-weight:600;color:var(--primary-container);">${tname?tname+' 선생님':'미지정'}</div></div>
      </div>
      <div style="display:flex;align-items:center;gap:10px;">
        <span class="msym" style="color:var(--secondary);">menu_book</span>
        <div><div class="helper" style="margin:0;">현재 학습 과정</div><div style="font-weight:600;color:var(--primary-container);">${course||'-'}</div></div>
      </div>
    </div>`;

  const type = fillTypeFilter('my-type-filter');
  const sorted = examsByType(type);
  const myScores = sorted.map(e=> studentTotal(e.id, studentId));
  const valid = myScores.filter(v=>v!==null);
  const myAvg = valid.length ? valid.reduce((a,b)=>a+b,0)/valid.length : null;
  const best = valid.length ? Math.max(...valid) : null;
  // latest rank
  let latestRank='-';
  for(let i=sorted.length-1;i>=0;i--){
    const v = studentTotal(sorted[i].id, studentId);
    if(v!==null){
      const r = examRanks(sorted[i].id).find(x=>x.studentId===studentId);
      if(r){ latestRank = r.rank+' / '+examScoreList(sorted[i].id).length; }
      break;
    }
  }

  document.getElementById('my-stats').innerHTML = `
    <div class="card stat-card"><div class="lbl"><span class="msym">quiz</span>응시 시험</div><div class="val">${valid.length}회</div></div>
    <div class="card stat-card gold"><div class="lbl"><span class="msym">analytics</span>내 평균</div><div class="val">${fmt(myAvg)}</div></div>
    <div class="card stat-card"><div class="lbl"><span class="msym">star</span>최고 점수</div><div class="val">${fmt(best)}</div></div>
    <div class="card stat-card gold"><div class="lbl"><span class="msym">trophy</span>최근 등수</div><div class="val">${latestRank}</div></div>
  `;

  const avgData = sorted.map(e=>examAverage(e.id));
  const ctx = document.getElementById('myTrendChart');
  if(ctx){
    if(myTrendChartInst){ myTrendChartInst.destroy(); myTrendChartInst=null; }
    if(!sorted.length){ chartEmpty(ctx, '아직 시험 기록이 없습니다.'); }
    else myTrendChartInst = new Chart(ctx,{
    type:'line',
    data:{ labels:sorted.map(e=>e.name), datasets:[
      {label:'내 점수', data:myScores, borderColor:'#785919', backgroundColor:'#785919', tension:.3, spanGaps:true, borderWidth:3, pointRadius:4},
      {label:'전체 평균', data:avgData, borderColor:'#9aa3b5', backgroundColor:'#9aa3b5', borderDash:[5,4], tension:.3, spanGaps:true, borderWidth:2, pointRadius:3},
    ]},
    options:{ responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}, scales:{y:{beginAtZero:true,max:100}} }
  });
  }
  renderRankBoard();
}

/* ====================================================================
   CLOUD · Supabase 연동 (로그인 + 클라우드 저장)
   - 설정이 있으면 Supabase Auth로 로그인하고 데이터를 academy_state에 보관.
   - 미설정/초기화 실패/네트워크 오류 시 기존 localStorage 동작으로 자동 폴백.
   ==================================================================== */
window.CLOUD = {
  url: 'https://xixdzpxatopxqoncqfnn.supabase.co',
  key: 'sb_publishable_cJCBPz9HGZod39SR-twrbQ_LsSiFvp-',
  emailDomain: 'axis-lab.xyz',
  sb: null,
  enabled: false,
  _t: null,
  init(){
    try{
      if(this.url && this.key && window.supabase && window.supabase.createClient){
        this.sb = window.supabase.createClient(this.url, this.key);
        this.enabled = true;
      }
    }catch(e){ console.error('CLOUD init failed', e); this.enabled = false; }
    return this.enabled;
  },
  emailFor(loginId){ return String(loginId||'').toLowerCase() + '@' + this.emailDomain; },
  async profile(){
    const { data:{ user } } = await this.sb.auth.getUser();
    if(!user) return null;
    const { data, error } = await this.sb.from('profiles')
      .select('role,login_id,name,must_change,student_id,child_ids').eq('id', user.id).single();
    if(error){ console.error('profile fetch', error); return null; }
    return data;
  },
  async pull(){
    try{
      const { data, error } = await this.sb.from('academy_state').select('data').eq('id',1).single();
      if(error){ console.error('cloud pull', error); return false; }
      const cloud = data && data.data;
      if(cloud && typeof cloud==='object' && Object.keys(cloud).length){
        Object.keys(DB).forEach(k=>{ delete DB[k]; });
        Object.assign(DB, cloud);
        try{ Auth.migrate(); }catch(e){}
        try{ localStorage.setItem(STORE_KEY, JSON.stringify(DB)); }catch(e){}
        return true;
      }
      await this.push(true);   // 클라우드가 비어 있으면 현재 데이터를 올린다
      return true;
    }catch(e){ console.error('cloud pull failed', e); return false; }
  },
  async push(initial){
    if(!this.enabled || !this.sb) return false;
    try{
      const { error } = await this.sb.from('academy_state').update({ data: DB }).eq('id',1);
      if(error){ if(initial) console.warn('cloud push denied/failed:', error.message); return false; }
      return true;
    }catch(e){ console.error('cloud push failed', e); return false; }
  },
  scheduleSave(){
    if(!this.enabled) return;
    clearTimeout(this._t);
    this._t = setTimeout(()=>{ this.push(); }, 1200);
  },
  async signOut(){ try{ if(this.sb) await this.sb.auth.signOut(); }catch(e){} }
};

/** Supabase 프로필(role/login_id) → 앱 세션 객체 */
function buildSessionFromProfile(prof){
  if(!prof) return null;
  const role = prof.role;
  const loginId = Auth.norm(prof.login_id||'') || String(prof.login_id||'').toLowerCase();
  if(role==='master'){ return { role:'admin', name:'최고관리자', account:'AxMaster', master:true }; }
  if(role==='teacher'){
    const t = DB.teachers.find(t=>Auth.norm(t.phone)===loginId);
    return { role:'teacher', name:(t?t.name:(prof.name||'선생님')), teacherId:(t?t.id:null), phone:loginId };
  }
  if(role==='student'){
    const s = DB.students.find(s=>Auth.norm(s.phone)===loginId);
    if(!s) return null;
    return { role:'student', name:s.name, account:s.account, studentId:s.id, phone:loginId };
  }
  if(role==='parent'){
    const kids = Auth.childrenOf(loginId);
    if(!kids.length) return null;
    const par = DB.parents.find(x=>Auth.norm(x.phone)===loginId);
    const nm = (prof.name && prof.name.trim()) ? prof.name : (par&&par.name?par.name+' 학부모':'학부모');
    return { role:'parent', name:nm, parentPhone:loginId, childIds:kids, studentId:kids[0] };
  }
  return null;
}

let cloudBusy = false;
function setLoginBusy(b){
  cloudBusy = b;
  const btn = document.querySelector('#login-form .login-submit') || document.querySelector('#login-form button[type="submit"]');
  if(btn){ btn.disabled = b; btn.style.opacity = b ? '.6' : ''; btn.textContent = b ? '로그인 중…' : (btn.dataset._label || btn.textContent); }
}

/** Supabase Auth 로그인 */
async function doLoginCloud(){
  if(cloudBusy) return;
  const idRaw    = document.getElementById('login-id').value.trim();
  const pw       = document.getElementById('login-pw').value;
  const remember = document.getElementById('login-remember').checked;
  const errEl    = document.getElementById('login-error');
  errEl.style.display='none';

  let loginId;
  const digits = Auth.norm(idRaw);
  if(digits.length>=9){
    loginId = digits;                          // 휴대폰 번호 → 역할은 로그인 후 프로필로 자동 판별
  } else {
    loginId = idRaw.toLowerCase();             // 관리자 아이디(AxMaster 등)
    if(!loginId){ errEl.textContent='휴대폰 번호 또는 관리자 아이디를 입력하세요.'; errEl.style.display='block'; return; }
  }
  if(!pw){ errEl.textContent='비밀번호를 입력해주세요.'; errEl.style.display='block'; return; }

  setLoginBusy(true);
  try{
    const { error } = await CLOUD.sb.auth.signInWithPassword({ email: CLOUD.emailFor(loginId), password: pw });
    if(error){ errEl.textContent='아이디(휴대폰) 또는 비밀번호가 올바르지 않습니다.'; errEl.style.display='block'; setLoginBusy(false); return; }
    const prof = await CLOUD.profile();
    if(!prof){ errEl.textContent='계정 정보를 불러오지 못했습니다. 관리자에게 문의하세요.'; errEl.style.display='block'; await CLOUD.signOut(); setLoginBusy(false); return; }
    await CLOUD.pull();
    updateLoginHint();
    const sess = buildSessionFromProfile(prof);
    if(!sess){ errEl.textContent='이 계정과 연결된 학생/선생님 정보를 찾을 수 없습니다.'; errEl.style.display='block'; await CLOUD.signOut(); setLoginBusy(false); return; }
    setLoginBusy(false);
    if(prof.must_change){
      pendingSession = sess; pendingCred = { kind:'cloud' }; pendingRemember = remember;
      showForceChange(); return;
    }
    finalizeLogin(sess, remember);
  }catch(e){
    console.error('cloud login error', e);
    errEl.textContent='로그인 중 오류가 발생했습니다. 잠시 후 다시 시도하세요.'; errEl.style.display='block';
    setLoginBusy(false);
  }
}

/** Supabase 비밀번호 강제 변경 */
async function submitForceChangeCloud(){
  const p1 = document.getElementById('fc-pw1').value;
  const p2 = document.getElementById('fc-pw2').value;
  const err = document.getElementById('fc-error');
  if(!p1 || p1.length<6 || p1!==p2 || p1===INIT_PW){
    err.textContent = (p1===INIT_PW) ? '초기 비밀번호와 다른 비밀번호를 사용하세요.' : '비밀번호가 일치하지 않거나 너무 짧습니다.(6자 이상)';
    err.style.display='block'; return;
  }
  err.style.display='none';
  try{
    const { error } = await CLOUD.sb.auth.updateUser({ password: p1 });
    if(error){ err.textContent='비밀번호 변경 실패: '+error.message; err.style.display='block'; return; }
    try{ await CLOUD.sb.rpc('complete_password_change'); }catch(e){ console.error('rpc complete_password_change', e); }
  }catch(e){ console.error('cloud pw change', e); err.textContent='비밀번호 변경 중 오류가 발생했습니다.'; err.style.display='block'; return; }
  const s = pendingSession, r = pendingRemember;
  pendingSession = pendingCred = null;
  hideForceChange();
  finalizeLogin(s, r);
}

/* ---------- boot ---------- */
(function setLogos(){
  const a=document.getElementById('login-logo-img'); if(a) a.src=LOGO_SRC;
  const b=document.getElementById('sidebar-logo-img'); if(b) b.src=LOGO_SRC;
})();

function showLoginScreen(){
  document.getElementById('login-screen').style.display='flex';
  document.getElementById('app-root').classList.add('hidden');
}

async function boot(){
  loadDB();
  seedIfEmpty();
  Auth.migrate();
  updateLoginHint();

  const cloudOn = window.CLOUD.init();
  if(cloudOn){
    try{
      const { data:{ session } } = await CLOUD.sb.auth.getSession();
      if(session){
        const prof = await CLOUD.profile();
        if(prof){
          await CLOUD.pull();
          updateLoginHint();
          const sess = buildSessionFromProfile(prof);
          if(sess && !prof.must_change){ SESSION = sess; enterApp(); return; }
          if(sess && prof.must_change){
            pendingSession = sess; pendingCred = { kind:'cloud' }; pendingRemember = true;
            showLoginScreen(); showForceChange(); return;
          }
        }
        await CLOUD.signOut();   // 프로필/세션 구성 실패 → 로그아웃 후 로그인 화면
      }
    }catch(e){ console.error('cloud boot failed', e); }
    showLoginScreen();
    return;
  }

  // 로컬 모드 (클라우드 미설정/초기화 실패) — 기존 동작
  if(restoreSession()) enterApp(); else showLoginScreen();
}
boot();
