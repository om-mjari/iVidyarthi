import React, { useEffect, useMemo, useState } from 'react';
import './AdminDashboard.css';
import Logo from './components/Logo';

// Removed TopBar component - will be replaced with AdminDashboard structure

// Stat component will be replaced with AdminDashboard structure

function ProfileModal({ open, onClose }) {
  const [form, setForm] = useState(() => {
    try { return JSON.parse(localStorage.getItem('registrar_profile')) || { name: '', university: '', contact: '', email: '' }; } catch { return { name: '', university: '', contact: '', email: '' }; }
  });

  useEffect(() => {
    const registrar = JSON.parse(localStorage.getItem('registrar_user') || '{}');
    setForm(prev => ({ ...prev, email: registrar?.email || prev.email }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const save = () => {
    localStorage.setItem('registrar_profile', JSON.stringify(form));
    onClose && onClose();
  };

  if (!open) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose} style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000
      }} />
      <div className="modal-content" style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        padding: '2rem',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        zIndex: 1001,
        minWidth: '400px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ margin: 0, color: 'white', fontSize: '1.3rem', fontWeight: '700' }}>Registrar Profile</h3>
          <button className="btn-secondary" onClick={onClose}>×</button>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '0.5rem' }}>Name</label>
            <input 
              className="search-input" 
              name="name" 
              value={form.name} 
              onChange={handleChange}
              style={{ width: '100%' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '0.5rem' }}>University</label>
            <input 
              className="search-input" 
              name="university" 
              value={form.university} 
              onChange={handleChange}
              style={{ width: '100%' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '0.5rem' }}>Contact</label>
            <input 
              className="search-input" 
              name="contact" 
              value={form.contact} 
              onChange={handleChange}
              style={{ width: '100%' }}
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '0.5rem' }}>Email</label>
            <input 
              className="search-input" 
              name="email" 
              value={form.email} 
              onChange={handleChange}
              disabled
              style={{ width: '100%', opacity: 0.6 }}
            />
          </div>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button className="btn-secondary" type="button" onClick={onClose}>Close</button>
            <button className="btn-primary" type="button" onClick={save}>Save</button>
          </div>
        </form>
      </div>
    </>
  );
}

function InstitutesTab() {
  const [form, setForm] = useState({ name: '', contact: '', courses: '' });
  const [institutes, setInstitutes] = useState(() => {
    try { return JSON.parse(localStorage.getItem('registrar_institutes')) || []; } catch { return []; }
  });

  const addInstitute = () => {
    if (!form.name) return;
    const newInstitute = {
      id: Date.now(),
      name: form.name.trim(),
      contact: form.contact.trim(),
      courses: form.courses.split(',').map(s => s.trim()).filter(Boolean),
      status: 'Active'
    };
    const next = [newInstitute, ...institutes];
    setInstitutes(next);
    localStorage.setItem('registrar_institutes', JSON.stringify(next));
    setForm({ name: '', contact: '', courses: '' });
  };

  const updateInstitute = (id, updates) => {
    const next = institutes.map(i => i.id === id ? { ...i, ...updates } : i);
    setInstitutes(next);
    localStorage.setItem('registrar_institutes', JSON.stringify(next));
  };

  const removeInstitute = (id) => {
    if (!confirm('Remove this institute?')) return;
    const next = institutes.filter(i => i.id !== id);
    setInstitutes(next);
    localStorage.setItem('registrar_institutes', JSON.stringify(next));
  };

  return (
    <div className="user-management-panel">
      <h2>🏛️ Institute Management</h2>
      <div className="panel-controls">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', width: '100%', marginBottom: '1rem' }}>
          <div>
            <label style={{ display: 'block', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '0.5rem' }}>Institute Name</label>
            <input 
              className="search-input" 
              value={form.name} 
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Enter institute name"
            />
          </div>
          <div>
            <label style={{ display: 'block', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '0.5rem' }}>Contact</label>
            <input 
              className="search-input" 
              value={form.contact} 
              onChange={(e) => setForm({ ...form, contact: e.target.value })}
              placeholder="Contact information"
            />
          </div>
          <div>
            <label style={{ display: 'block', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '0.5rem' }}>Courses Offered</label>
            <input 
              className="search-input" 
              value={form.courses} 
              onChange={(e) => setForm({ ...form, courses: e.target.value })}
              placeholder="e.g., BCA, BSc IT, MCA"
            />
          </div>
        </div>
        <button className="btn-primary" onClick={addInstitute}>Add Institute</button>
      </div>

      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>Institute Name</th>
              <th>Contact</th>
              <th>Courses Offered</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {institutes.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: 'rgba(255, 255, 255, 0.6)' }}>
                  No institutes added yet. Add your first institute above.
                </td>
              </tr>
            ) : (
              institutes.map(inst => (
                <tr key={inst.id}>
                  <td>{inst.name}</td>
                  <td>{inst.contact || '—'}</td>
                  <td>{inst.courses?.join(', ') || '—'}</td>
                  <td>
                    <span className={`status-badge ${inst.status === 'Active' ? 'active' : 'pending'}`}>
                      {inst.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      className={`btn-${inst.status === 'Active' ? 'reject' : 'approve'}`}
                      onClick={() => updateInstitute(inst.id, { status: inst.status === 'Active' ? 'Disabled' : 'Active' })}
                    >
                      {inst.status === 'Active' ? 'Disable' : 'Enable'}
                    </button>
                    <button className="btn-delete" onClick={() => removeInstitute(inst.id)}>Remove</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ChartsTab() {
  const institutes = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('registrar_institutes')) || []; } catch { return []; }
  }, [localStorage.getItem('registrar_institutes')]);
  const enrollments = useMemo(() => {
    // Mocked enrollments by institute and course
    const map = {};
    institutes.forEach(i => {
      map[i.name] = (i.courses || []).map((c, idx) => ({ course: c, count: Math.floor(20 + (idx+1) * 7) }));
    });
    return map;
  }, [institutes]);

  const totalStudents = Object.values(enrollments).reduce((sum, arr) => sum + arr.reduce((s, x) => s + x.count, 0), 0);

  return (
    <div className="analytics-panel">
      <h2>📈 Enrollment Analytics</h2>
      <div className="stats-grid">
        <div className="stat-card students">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>{totalStudents}</h3>
            <p>Total Students</p>
            <span className="stat-trend">Mock enrollment data</span>
          </div>
        </div>
        <div className="stat-card institutes">
          <div className="stat-icon">🏛️</div>
          <div className="stat-content">
            <h3>{institutes.length}</h3>
            <p>Active Institutes</p>
            <span className="stat-trend">Under management</span>
          </div>
        </div>
        <div className="stat-card courses">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <h3>{institutes.reduce((sum, inst) => sum + (inst.courses || []).length, 0)}</h3>
            <p>Total Courses</p>
            <span className="stat-trend">Across all institutes</span>
          </div>
        </div>
      </div>
      
      <div className="analytics-grid">
        {institutes.length === 0 ? (
          <div className="analytics-card">
            <h3>No Data Available</h3>
            <div className="chart-placeholder">
              <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Add institutes to see enrollment analytics and charts.</p>
            </div>
          </div>
        ) : (
          institutes.map((inst) => (
            <div className="analytics-card" key={inst.id}>
              <h3>{inst.name} - Course Enrollments</h3>
              <div className="chart-placeholder">
                <div className="course-performance">
                  {(enrollments[inst.name] || []).map((row, i) => (
                    <div className="performance-item" key={i}>
                      <span>{row.course}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div className="progress-bar">
                          <div className="progress" style={{ width: `${(row.count / 50) * 100}%` }}></div>
                        </div>
                        <span style={{ color: 'white', fontSize: '0.9rem', fontWeight: '600' }}>{row.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function ApprovalGate({ children }) {
  const approved = useMemo(() => localStorage.getItem('registrar_approved') === 'true', []);
  if (!approved) {
    return (
      <div className="user-management-panel">
        <h2>⏳ Awaiting Admin Approval</h2>
        <div className="quick-actions">
          <h3>Registration Under Review</h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem' }}>
            Your university registration is under review by Admin. You will be notified upon approval.
          </p>
          <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem' }}>
            Tip: Ask Admin to approve your registration to enable institute management features.
          </div>
        </div>
      </div>
    );
  }
  return children;
}

function RegistrarDashboard({ onLogout }) {
  const [activePanel, setActivePanel] = useState('overview');
  const [profileOpen, setProfileOpen] = useState(false);
  const [stats, setStats] = useState({
    totalInstitutes: 0,
    totalStudents: 0,
    activeCourses: 0,
    pendingApprovals: 1
  });

  useEffect(() => {
    const raw = localStorage.getItem('registrar_user');
    if (!raw) {
      window.alert('Please login as registrar');
    }
    
    // Update stats
    const institutes = JSON.parse(localStorage.getItem('registrar_institutes') || '[]');
    const totalStudents = institutes.reduce((sum, inst) => {
      return sum + (inst.courses || []).reduce((s, course, idx) => s + Math.floor(20 + (idx+1) * 7), 0);
    }, 0);
    const activeCourses = institutes.reduce((sum, inst) => sum + (inst.courses || []).length, 0);
    
    setStats({
      totalInstitutes: institutes.length,
      totalStudents,
      activeCourses,
      pendingApprovals: localStorage.getItem('registrar_approved') === 'true' ? 0 : 1
    });
  }, []);

  const approved = localStorage.getItem('registrar_approved') === 'true';

  const menuItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: '📊' },
    { id: 'institutes', label: 'Institute Management', icon: '🏛️' },
    { id: 'charts', label: 'Analytics & Charts', icon: '📈' },
    { id: 'profile', label: 'Profile Settings', icon: '👤' }
  ];

  const renderOverview = () => (
    <div className="overview-panel">
      <h2>📊 Registrar Dashboard</h2>
      <div className="stats-grid">
        <div className="stat-card institutes">
          <div className="stat-icon">🏛️</div>
          <div className="stat-content">
            <h3>{stats.totalInstitutes}</h3>
            <p>Total Institutes</p>
            <span className="stat-trend">Managed by you</span>
          </div>
        </div>
        <div className="stat-card students">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>{stats.totalStudents}</h3>
            <p>Total Students</p>
            <span className="stat-trend">Across all institutes</span>
          </div>
        </div>
        <div className="stat-card courses">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <h3>{stats.activeCourses}</h3>
            <p>Active Courses</p>
            <span className="stat-trend">Available programs</span>
          </div>
        </div>
        <div className="stat-card pending">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3>{stats.pendingApprovals}</h3>
            <p>Approval Status</p>
            <span className="stat-trend">{approved ? 'Approved' : 'Pending admin approval'}</span>
          </div>
        </div>
      </div>

      {!approved && (
        <div className="quick-actions">
          <h3>Awaiting Admin Approval</h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem' }}>
            Your university registration is under review by Admin. You will be notified upon approval.
          </p>
          <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem' }}>
            Tip: Ask Admin to approve your registration to enable institute management features.
          </div>
        </div>
      )}

      {approved && (
        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="action-buttons">
            <button className="action-btn" onClick={() => setActivePanel('institutes')}>
              🏛️ Manage Institutes
            </button>
            <button className="action-btn" onClick={() => setActivePanel('charts')}>
              📈 View Analytics
            </button>
            <button className="action-btn" onClick={() => setActivePanel('profile')}>
              👤 Update Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderActivePanel = () => {
    switch (activePanel) {
      case 'overview': return renderOverview();
      case 'institutes': return approved ? <InstitutesTab /> : <ApprovalGate><InstitutesTab /></ApprovalGate>;
      case 'charts': return approved ? <ChartsTab /> : <ApprovalGate><ChartsTab /></ApprovalGate>;
      case 'profile': return (
        <div className="user-management-panel">
          <h2>👤 Profile Settings</h2>
          <div className="panel-controls">
            <button className="btn-primary" onClick={() => setProfileOpen(true)}>
              Edit Profile
            </button>
          </div>
          <div className="quick-actions">
            <h3>Profile Information</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Manage your registrar profile and university information here.
            </p>
          </div>
        </div>
      );
      default: return renderOverview();
    }
  };

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="admin-header">
          <Logo size="medium" showText={true} style={{ color: 'white', marginBottom: '1rem' }} />
          <h2>🏛️ Registrar Panel</h2>
          <p>iVidhyarthi Management</p>
        </div>
        <nav className="admin-nav">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activePanel === item.id ? 'active' : ''}`}
              onClick={() => setActivePanel(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="admin-footer">
          <button className="logout-btn" onClick={onLogout}>
            🚪 Logout
          </button>
        </div>
      </aside>

      <main className="admin-content">
        <header className="admin-content-header">
          <div className="breadcrumb">
            <span>Registrar Dashboard</span>
            <span>/</span>
            <span>{menuItems.find(item => item.id === activePanel)?.label}</span>
          </div>
          <div className="admin-user-info">
            <span>Welcome, Registrar</span>
            <div className="admin-avatar">👤</div>
          </div>
        </header>

        <div className="admin-panel-content">
          {renderActivePanel()}
        </div>
      </main>

      <ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} />
    </div>
  );
}

export default RegistrarDashboard;


