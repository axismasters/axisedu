/* ============================================================
   AXIS LMS · teacher.js
   (이 파일은 원본 app.js의 연속 구간이며, index.html에서
    원본과 동일한 순서로 로드되어 동작이 100% 동일합니다.)
   ============================================================ */
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
    const k = classifyAcctResult(r);
    if(k==='ok') acctToast(`✓ ${name} 로그인 계정 생성됨 · 휴대폰 + 초기비번 axis1234`);
    else if(k==='exists') acctToast(`${name} · 이미 계정이 있습니다`);
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
    const { ok, ex, fail, failed } = acctTally(results);
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
    const { ok, ex, fail, failed } = acctTally(results);
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
  openModal('teacher-modal-overlay');
}
function closeTeacherModal(){ closeModal('teacher-modal-overlay'); }
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

