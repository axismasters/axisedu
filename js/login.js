/* ============================================================
   AXIS LMS · login.js
   (이 파일은 원본 app.js의 연속 구간이며, index.html에서
    원본과 동일한 순서로 로드되어 동작이 100% 동일합니다.)
   ============================================================ */
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
      const t = findTeacher(s.teacherId) || DB.teachers.find(x=>Auth.norm(x.phone)===Auth.norm(s.phone));
      if(!t) return false; s.name = t.name; s.teacherId = t.id;
    } else if(s.role==='student'){
      const stu = findStudent(s.studentId) || DB.students.find(x=>Auth.norm(x.phone)===Auth.norm(s.phone));
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
  if(isTeacherUser()) { const s=findStudent(id); return s && s.teacherId===SESSION.teacherId; }
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
    const s = findStudent(SESSION.studentId);
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
        ${SESSION.childIds.map(id=>{const s=findStudent(id);return `<option value="${id}" ${id===SESSION.studentId?'selected':''}>${s?s.name:''}</option>`;}).join('')}
      </select>`;
    box.classList.remove('hidden');
  } else {
    box.innerHTML=''; box.classList.add('hidden');
  }
}
function switchChild(id){
  SESSION.studentId = id;
  // refresh course panel + views
  const s = findStudent(id);
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
  const s = findStudent(studentId);
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
  const me = findStudent(studentId);
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
        saveLocal();
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
