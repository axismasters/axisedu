/* ============================================================
   AXIS LMS · dashboard.js
   (이 파일은 원본 app.js의 연속 구간이며, index.html에서
    원본과 동일한 순서로 로드되어 동작이 100% 동일합니다.)
   ============================================================ */
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

