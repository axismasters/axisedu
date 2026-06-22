/* ============================================================
   AXIS LMS · student.js
   (이 파일은 원본 app.js의 연속 구간이며, index.html에서
    원본과 동일한 순서로 로드되어 동작이 100% 동일합니다.)
   ============================================================ */
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
  openModal('student-modal-overlay');
}
function closeStudentModal(){ closeModal('student-modal-overlay'); }

/* ===== 학생 일괄 등록 + Supabase 계정 자동 생성 (마스터 전용) ===== */
function openBulkStudentModal(){
  if(!isAdminUser()){ alert('학생 일괄 등록·계정 생성은 마스터(최고관리자)만 사용할 수 있습니다.'); return; }
  if(!(window.CLOUD && window.CLOUD.enabled)){ alert('클라우드(Supabase) 연결 상태에서만 계정을 생성할 수 있습니다.'); return; }
  document.getElementById('bulk-input').value='';
  const tsel = document.getElementById('bulk-teacher');
  if(tsel) tsel.innerHTML = `<option value="">미지정</option>` + DB.teachers.map(t=>`<option value="${t.id}">${t.name}</option>`).join('');
  const res = document.getElementById('bulk-result'); res.style.display='none'; res.textContent='';
  const btn = document.getElementById('bulk-submit-btn'); btn.disabled=false; btn.textContent='등록하고 계정 생성';
  openModal('bulk-modal-overlay');
}
function closeBulkStudentModal(){ closeModal('bulk-modal-overlay'); }

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

