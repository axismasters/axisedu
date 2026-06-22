/* ============================================================
   AXIS LMS · exam.js
   (이 파일은 원본 app.js의 연속 구간이며, index.html에서
    원본과 동일한 순서로 로드되어 동작이 100% 동일합니다.)
   ============================================================ */
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
  openModal('exam-modal-overlay');
}
function closeExamModal(){ closeModal('exam-modal-overlay'); }

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

