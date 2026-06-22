/* ============================================================
   AXIS LMS · report.js
   (이 파일은 원본 app.js의 연속 구간이며, index.html에서
    원본과 동일한 순서로 로드되어 동작이 100% 동일합니다.)
   ============================================================ */
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

