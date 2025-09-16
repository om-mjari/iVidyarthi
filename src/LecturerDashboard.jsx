import React, { useEffect, useMemo, useState } from 'react';
import './LecturerStyles.css';

function TopBar({ onLogout }) {
  const lecturer = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('lecturer_user')); } catch { return null; }
  }, []);

  return (
    <div className="lec-topbar">
      <div className="brand">iVidhyarthi • Lecturer</div>
      <div className="spacer" />
      <div className="profile-mini">
        <div className="avatar">{(lecturer?.name || 'L')[0]}</div>
        <div className="meta">
          <div className="name">{lecturer?.name || 'Lecturer'}</div>
          <div className="email">{lecturer?.email}</div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, trend }) {
  return (
    <div className="stat">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      {trend && <div className="stat-trend">{trend}</div>}
    </div>
  );
}

function ProfileSlideOver({ open, onClose }) {
  const [form, setForm] = useState(() => {
    try { return JSON.parse(localStorage.getItem('lecturer_profile')) || { name: '', birthdate: '', subjects: '', qualifications: '', gender: '' }; } catch { return { name: '', birthdate: '', subjects: '', qualifications: '', gender: '' }; }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const save = () => {
    localStorage.setItem('lecturer_profile', JSON.stringify(form));
    onClose && onClose();
  };

  return (
    <>
      <div className={`lec-profile-overlay ${open ? 'open' : ''}`} onClick={onClose} />
      <aside className={`lec-profile-panel ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="lec-profile-header">
          <h3>Profile</h3>
          <button className="btn-secondary" onClick={onClose} aria-label="Close profile">×</button>
        </div>
        <form className="lec-profile-form" onSubmit={(e) => e.preventDefault()}>
          <label className="lec-form-field">
            <span>Name</span>
            <input className="input" type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your name" />
          </label>
          <label className="lec-form-field">
            <span>Birthdate</span>
            <input className="input" type="date" name="birthdate" value={form.birthdate} onChange={handleChange} />
          </label>
          <label className="lec-form-field">
            <span>Subjects</span>
            <textarea className="input" name="subjects" value={form.subjects} onChange={handleChange} rows="3" placeholder="e.g., DSA, React, Python" />
          </label>
          <label className="lec-form-field">
            <span>Qualifications</span>
            <textarea className="input" name="qualifications" value={form.qualifications} onChange={handleChange} rows="3" placeholder="e.g., M.Tech, PhD" />
          </label>
          <div className="lec-form-field">
            <span>Gender</span>
            <div className="radio-group">
              <label><input type="radio" name="gender" value="Male" checked={form.gender === 'Male'} onChange={handleChange} /> Male</label>
              <label><input type="radio" name="gender" value="Female" checked={form.gender === 'Female'} onChange={handleChange} /> Female</label>
              <label><input type="radio" name="gender" value="Other" checked={form.gender === 'Other'} onChange={handleChange} /> Other</label>
            </div>
          </div>
          <div className="lec-profile-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Close</button>
            <button type="button" className="btn-primary" onClick={save}>Update</button>
          </div>
        </form>
      </aside>
    </>
  );
}

function UploadsTab() {
  const [materials, setMaterials] = useState(() => {
    try { return JSON.parse(localStorage.getItem('lecturer_materials')) || []; } catch { return []; }
  });
  const [fileMeta, setFileMeta] = useState({ title: '', type: 'PDF', url: '' });

  const addMaterial = () => {
    if (!fileMeta.title || !fileMeta.url) return;
    const next = [...materials, { ...fileMeta, id: Date.now() }];
    setMaterials(next);
    localStorage.setItem('lecturer_materials', JSON.stringify(next));
    setFileMeta({ title: '', type: 'PDF', url: '' });
  };

  return (
    <div className="panel">
      <h3>Course Materials</h3>
      <div className="grid-3">
        <div>
          <label className="label">Title</label>
          <input className="input" value={fileMeta.title} onChange={(e) => setFileMeta({ ...fileMeta, title: e.target.value })} />
        </div>
        <div>
          <label className="label">Type</label>
          <select className="input" value={fileMeta.type} onChange={(e) => setFileMeta({ ...fileMeta, type: e.target.value })}>
            <option>PDF</option>
            <option>Video</option>
            <option>Notes</option>
          </select>
        </div>
        <div>
          <label className="label">Link / URL</label>
          <input className="input" placeholder="https://..." value={fileMeta.url} onChange={(e) => setFileMeta({ ...fileMeta, url: e.target.value })} />
        </div>
      </div>
      <button className="button primary" onClick={addMaterial}>Add Material</button>

      <div className="items-list">
        {materials.length === 0 && <div className="muted">No materials uploaded yet.</div>}
        {materials.map((m) => (
          <div className="item" key={m.id}>
            <div>
              <div className="item-title">{m.title}</div>
              <div className="item-sub">{m.type} • <a href={m.url} target="_blank">Open</a></div>
            </div>
            <button className="button ghost sm" onClick={() => {
              const next = materials.filter(x => x.id !== m.id);
              setMaterials(next);
              localStorage.setItem('lecturer_materials', JSON.stringify(next));
            }}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SessionsTab() {
  const [sessions, setSessions] = useState(() => {
    try { return JSON.parse(localStorage.getItem('lecturer_sessions')) || []; } catch { return []; }
  });
  const [form, setForm] = useState({ title: '', date: '', link: '' });

  const addSession = () => {
    if (!form.title || !form.date || !form.link) return;
    const next = [...sessions, { ...form, id: Date.now() }];
    setSessions(next);
    localStorage.setItem('lecturer_sessions', JSON.stringify(next));
    setForm({ title: '', date: '', link: '' });
  };

  return (
    <div className="panel">
      <h3>Problem-Solving Sessions</h3>
      <div className="grid-3">
        <div>
          <label className="label">Title</label>
          <input className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </div>
        <div>
          <label className="label">Date & Time</label>
          <input className="input" type="datetime-local" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
        </div>
        <div>
          <label className="label">Meeting Link</label>
          <input className="input" placeholder="https://meet..." value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} />
        </div>
      </div>
      <button className="button primary" onClick={addSession}>Schedule Session</button>

      <div className="items-list">
        {sessions.length === 0 && <div className="muted">No sessions scheduled.</div>}
        {sessions.map((s) => (
          <div className="item" key={s.id}>
            <div>
              <div className="item-title">{s.title}</div>
              <div className="item-sub">{new Date(s.date).toLocaleString()} • <a href={s.link} target="_blank">Join</a></div>
            </div>
            <button className="button ghost sm" onClick={() => {
              const next = sessions.filter(x => x.id !== s.id);
              setSessions(next);
              localStorage.setItem('lecturer_sessions', JSON.stringify(next));
            }}>Cancel</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function StudentsTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');
  
  // Mock student enrollment data
  const [enrollments] = useState(() => {
    try { 
      return JSON.parse(localStorage.getItem('lecturer_enrollments')) || [
        { id: 1, studentName: 'Aarav Sharma', email: 'aarav@example.com', course: 'React Development', enrollDate: '2025-08-15', progress: 85, status: 'Active' },
        { id: 2, studentName: 'Diya Patel', email: 'diya@example.com', course: 'JavaScript Fundamentals', enrollDate: '2025-08-20', progress: 92, status: 'Active' },
        { id: 3, studentName: 'Arjun Kumar', email: 'arjun@example.com', course: 'React Development', enrollDate: '2025-08-18', progress: 67, status: 'Active' },
        { id: 4, studentName: 'Priya Singh', email: 'priya@example.com', course: 'Data Structures & Algorithms', enrollDate: '2025-08-10', progress: 78, status: 'Active' },
        { id: 5, studentName: 'Rohit Gupta', email: 'rohit@example.com', course: 'JavaScript Fundamentals', enrollDate: '2025-08-25', progress: 45, status: 'Active' },
        { id: 6, studentName: 'Sneha Reddy', email: 'sneha@example.com', course: 'Python Programming', enrollDate: '2025-08-12', progress: 89, status: 'Active' },
        { id: 7, studentName: 'Vikram Joshi', email: 'vikram@example.com', course: 'Data Structures & Algorithms', enrollDate: '2025-08-22', progress: 56, status: 'Active' },
        { id: 8, studentName: 'Ananya Das', email: 'ananya@example.com', course: 'React Development', enrollDate: '2025-08-28', progress: 34, status: 'Active' },
        { id: 9, studentName: 'Karan Mehta', email: 'karan@example.com', course: 'Python Programming', enrollDate: '2025-08-14', progress: 91, status: 'Active' },
        { id: 10, studentName: 'Riya Agarwal', email: 'riya@example.com', course: 'JavaScript Fundamentals', enrollDate: '2025-08-30', progress: 23, status: 'Active' }
      ]; 
    } catch { 
      return []; 
    }
  });

  // Get unique courses for filter dropdown
  const courses = [...new Set(enrollments.map(e => e.course))];

  // Filter enrollments based on search and course selection
  const filteredEnrollments = enrollments.filter(enrollment => {
    const matchesSearch = enrollment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         enrollment.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse === 'all' || enrollment.course === selectedCourse;
    return matchesSearch && matchesCourse;
  });

  // Group enrollments by course for summary
  const enrollmentsByCourse = enrollments.reduce((acc, enrollment) => {
    acc[enrollment.course] = (acc[enrollment.course] || 0) + 1;
    return acc;
  }, {});

  const getProgressColor = (progress) => {
    if (progress >= 80) return '#4caf50';
    if (progress >= 60) return '#ff9800';
    return '#f44336';
  };

  return (
    <div className="panel">
      <h3>Student Enrollments</h3>
      
      {/* Summary Stats */}
      <div className="stats" style={{ marginBottom: '20px' }}>
        <Stat label="Total Students" value={enrollments.length} trend="Across all courses" />
        <Stat label="Active Courses" value={courses.length} trend="Currently teaching" />
        <Stat label="Avg Progress" value={`${Math.round(enrollments.reduce((sum, e) => sum + e.progress, 0) / enrollments.length)}%`} trend="Overall completion" />
      </div>

      {/* Course Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px', marginBottom: '20px' }}>
        {Object.entries(enrollmentsByCourse).map(([course, count]) => (
          <div key={course} className="chart-card" style={{ padding: '16px' }}>
            <div className="chart-title" style={{ fontSize: '14px', marginBottom: '8px' }}>{course}</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2e8bff' }}>{count} students</div>
          </div>
        ))}
      </div>

      {/* Search and Filter Controls */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1', minWidth: '200px' }}>
          <input 
            className="input" 
            type="text" 
            placeholder="Search students by name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div style={{ minWidth: '180px' }}>
          <select 
            className="input" 
            value={selectedCourse} 
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="all">All Courses</option>
            {courses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="table">
        <div className="t-head">
          <div>Student</div>
          <div>Course</div>
          <div>Enrolled</div>
          <div>Progress</div>
          <div>Status</div>
        </div>
        {filteredEnrollments.length === 0 && (
          <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
            No students found matching your criteria.
          </div>
        )}
        {filteredEnrollments.map((enrollment) => (
          <div className="t-row" key={enrollment.id}>
            <div>
              <div style={{ fontWeight: '500' }}>{enrollment.studentName}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>{enrollment.email}</div>
            </div>
            <div>{enrollment.course}</div>
            <div>{new Date(enrollment.enrollDate).toLocaleDateString()}</div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ 
                  width: '60px', 
                  height: '6px', 
                  backgroundColor: '#e0e0e0', 
                  borderRadius: '3px',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    width: `${enrollment.progress}%`, 
                    height: '100%', 
                    backgroundColor: getProgressColor(enrollment.progress),
                    transition: 'width 0.3s ease'
                  }} />
                </div>
                <span style={{ fontSize: '12px', color: getProgressColor(enrollment.progress) }}>
                  {enrollment.progress}%
                </span>
              </div>
            </div>
            <div>
              <span className={`badge ${enrollment.status === 'Active' ? 'success' : 'warning'}`}>
                {enrollment.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeedbackTab() {
  const [feedback, setFeedback] = useState(() => {
    try { return JSON.parse(localStorage.getItem('lecturer_feedback')) || [
      { id: 1, student: 'Aarav', rating: 5, comment: 'Great explanations!' },
      { id: 2, student: 'Diya', rating: 4, comment: 'Helpful sessions and materials.' }
    ]; } catch { return []; }
  });

  return (
    <div className="panel">
      <h3>Student Feedback & Ratings</h3>
      <div className="items-list">
        {feedback.length === 0 && <div className="muted">No feedback yet.</div>}
        {feedback.map((f) => (
          <div className="item" key={f.id}>
            <div>
              <div className="item-title">{f.student} • {Array.from({ length: f.rating }).map((_, i) => '⭐').join('')}</div>
              <div className="item-sub">{f.comment}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EarningsTab() {
  const [payouts] = useState(() => {
    try { return JSON.parse(localStorage.getItem('lecturer_payouts')) || [
      { id: 1, date: '2025-08-01', amount: 12500, status: 'Paid' },
      { id: 2, date: '2025-09-01', amount: 9800, status: 'Processing' }
    ]; } catch { return []; }
  });

  const total = payouts.reduce((sum, p) => sum + (p.amount || 0), 0);

  return (
    <div className="panel">
      <h3>Earnings & Payouts</h3>
      <div className="stats">
        <Stat label="Total Earnings" value={`₹${total.toLocaleString()}`} trend="This quarter" />
        <Stat label="Active Courses" value="3" trend="2% MoM" />
        <Stat label="Avg. Rating" value="4.7" trend="+0.2" />
      </div>
      <div className="charts" style={{ marginTop: '12px' }}>
        <div className="chart-card">
          <div className="chart-title">Monthly Earnings (₹)</div>
          <svg className="chart" viewBox="0 0 300 180">
            <polyline fill="none" stroke="#4da3ff" strokeWidth="3" points="10,150 50,140 90,120 130,100 170,110 210,80 250,70 290,60" />
            <line x1="10" y1="150" x2="290" y2="150" stroke="#e6f0fb" />
            <line x1="10" y1="120" x2="290" y2="120" stroke="#e6f0fb" />
            <line x1="10" y1="90" x2="290" y2="90" stroke="#e6f0fb" />
          </svg>
        </div>
        <div className="chart-card">
          <div className="chart-title">Enrollments This Month</div>
          <svg className="chart" viewBox="0 0 300 180">
            <rect x="30" y="80" width="24" height="70" fill="#89c3ff" />
            <rect x="70" y="60" width="24" height="90" fill="#4da3ff" />
            <rect x="110" y="100" width="24" height="50" fill="#b7dcff" />
            <rect x="150" y="40" width="24" height="110" fill="#2e8bff" />
            <rect x="190" y="90" width="24" height="60" fill="#89c3ff" />
            <rect x="230" y="70" width="24" height="80" fill="#4da3ff" />
            <line x1="20" y1="150" x2="280" y2="150" stroke="#e6f0fb" />
          </svg>
        </div>
      </div>
      <div className="table">
        <div className="t-head">
          <div>Date</div>
          <div>Amount</div>
          <div>Status</div>
        </div>
        {payouts.map((p) => (
          <div className="t-row" key={p.id}>
            <div>{new Date(p.date).toLocaleDateString()}</div>
            <div>₹{p.amount.toLocaleString()}</div>
            <div><span className={`badge ${p.status === 'Paid' ? 'success' : 'warning'}`}>{p.status}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LecturerDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem('lecturer_user');
    if (!raw) {
      window.alert('Please login as lecturer');
    }
  }, []);

  return (
    <div className="lec-layout">
      <TopBar onLogout={onLogout} />
      <div className="content">
        <div className="sidebar">
          <button className={`tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</button>
          <button className={`tab ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setProfileOpen(true)}>Profile</button>
          <button className={`tab ${activeTab === 'students' ? 'active' : ''}`} onClick={() => setActiveTab('students')}>Students</button>
          <button className={`tab ${activeTab === 'uploads' ? 'active' : ''}`} onClick={() => setActiveTab('uploads')}>Uploads</button>
          <button className={`tab ${activeTab === 'sessions' ? 'active' : ''}`} onClick={() => setActiveTab('sessions')}>Sessions</button>
          <button className={`tab ${activeTab === 'feedback' ? 'active' : ''}`} onClick={() => setActiveTab('feedback')}>Feedback</button>
          <button className={`tab ${activeTab === 'earnings' ? 'active' : ''}`} onClick={() => setActiveTab('earnings')}>Earnings</button>
          <button className="tab logout-btn" onClick={onLogout}>Logout</button>
        </div>

        <div className="main">
          {activeTab === 'overview' && (
            <div className="panel">
              <h3>Welcome back!</h3>
              <div className="stats">
                <Stat label="Students" value="1,284" trend="+4.1%" />
                <Stat label="Sessions This Month" value="6" trend="Next in 2 days" />
                <Stat label="Materials" value={(JSON.parse(localStorage.getItem('lecturer_materials') || '[]')).length} trend="Stored" />
              </div>
              <div className="charts" style={{ marginTop: '12px' }}>
                <div className="chart-card">
                  <div className="chart-title">Earnings Trend (₹)</div>
                  <svg className="chart" viewBox="0 0 300 180">
                    <polyline fill="none" stroke="#2e8bff" strokeWidth="3" points="10,150 40,140 70,135 100,120 130,110 160,90 190,80 220,75 250,68 280,60" />
                    <line x1="10" y1="150" x2="280" y2="150" stroke="#e6f0fb" />
                    <line x1="10" y1="120" x2="280" y2="120" stroke="#e6f0fb" />
                    <line x1="10" y1="90" x2="280" y2="90" stroke="#e6f0fb" />
                  </svg>
                </div>
                <div className="chart-card">
                  <div className="chart-title">Enrollments by Course (This Month)</div>
                  <svg className="chart" viewBox="0 0 300 180">
                    <rect x="30" y="80" width="24" height="70" fill="#b7dcff" />
                    <rect x="70" y="60" width="24" height="90" fill="#4da3ff" />
                    <rect x="110" y="100" width="24" height="50" fill="#89c3ff" />
                    <rect x="150" y="40" width="24" height="110" fill="#2e8bff" />
                    <rect x="190" y="90" width="24" height="60" fill="#89c3ff" />
                    <rect x="230" y="70" width="24" height="80" fill="#4da3ff" />
                    <line x1="20" y1="150" x2="280" y2="150" stroke="#e6f0fb" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'students' && <StudentsTab />}
          {activeTab === 'uploads' && <UploadsTab />}
          {activeTab === 'sessions' && <SessionsTab />}
          {activeTab === 'feedback' && <FeedbackTab />}
          {activeTab === 'earnings' && <EarningsTab />}
        </div>
      </div>
      <ProfileSlideOver open={profileOpen} onClose={() => setProfileOpen(false)} />
    </div>
  );
}

export default LecturerDashboard;


