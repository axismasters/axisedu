/* ============================================================
   AXIS LMS · lecture.js
   (이 파일은 원본 app.js의 연속 구간이며, index.html에서
    원본과 동일한 순서로 로드되어 동작이 100% 동일합니다.)
   ============================================================ */
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
  openModal('lecture-modal-overlay');
}
function closeLectureModal(){ closeModal('lecture-modal-overlay'); }
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

