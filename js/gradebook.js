/* ============================================================
   AXIS LMS · gradebook.js
   (이 파일은 원본 app.js의 연속 구간이며, index.html에서
    원본과 동일한 순서로 로드되어 동작이 100% 동일합니다.)
   ============================================================ */
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

