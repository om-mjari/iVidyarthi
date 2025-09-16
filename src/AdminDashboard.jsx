import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import Logo from './components/Logo';

const AdminDashboard = ({ onLogout }) => {
  const [activePanel, setActivePanel] = useState('overview');
  const [stats, setStats] = useState({
    totalUsers: 1247,
    totalRevenue: 89450,
    activeCourses: 16,
    pendingApprovals: 8,
    totalFeedback: 342,
    liveSessions: 5,
    totalExams: 23,
    certificatesIssued: 156
  });

  // Real student data from MongoDB
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch students from MongoDB
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/auth/students');
        const result = await response.json();
        
        console.log('Admin Dashboard - API Response:', result);
        
        if (result.success) {
          // Format data for display
          const formattedUsers = result.data.map(student => ({
            id: student._id,
            name: student.name,
            email: student.email,
            role: student.role || 'Student',
            status: student.isActive !== false ? 'Active' : 'Inactive',
            joinDate: new Date(student.createdAt || Date.now()).toLocaleDateString(),
            phone: student.phone || 'N/A',
            institution: student.education?.institution || 'N/A',
            course: student.education?.course || 'N/A',
            semester: student.education?.semester || 'N/A'
          }));
          setUsers(formattedUsers);
          
          // Update stats with real data
          setStats(prev => ({
            ...prev,
            totalUsers: result.count
          }));
        } else {
          console.error('Failed to fetch students:', result.message);
        }
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
    
    // Refresh data every 30 seconds to show new registrations
    const interval = setInterval(fetchStudents, 30000);
    return () => clearInterval(interval);
  }, []);

  // Action handlers for User Management
  const handleEditUser = (userId) => {
    alert(`Editing user with ID: ${userId}`);
    // Implementation: Open edit modal or navigate to edit page
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
      alert('User deleted successfully!');
    }
  };

  const handleViewUser = (userId) => {
    const user = users.find(u => u.id === userId);
    const details = `
Student Details:
Name: ${user.name}
Email: ${user.email}
Phone: ${user.phone || 'N/A'}
Role: ${user.role}
Status: ${user.status}
Join Date: ${user.joinDate}
Institution: ${user.institution}
Course: ${user.course}
Semester: ${user.semester}
    `.trim();
    alert(details);
  };

  const [courses, setCourses] = useState([
    { id: 1, name: 'React for Beginners', instructor: 'Abha Ma\'am', status: 'Approved', students: 45, revenue: 35955 },
    { id: 2, name: 'Python Programming', instructor: 'Rakesh Sir', status: 'Pending', students: 0, revenue: 0 },
    { id: 3, name: 'Machine Learning', instructor: 'Bhumika Ma\'am', status: 'Approved', students: 32, revenue: 28768 }
  ]);

  // Action handlers for Course Management
  const handleApproveCourse = (courseId) => {
    setCourses(courses.map(course =>
      course.id === courseId ? { ...course, status: 'Approved' } : course
    ));
    alert('Course approved successfully!');
  };

  const handleRejectCourse = (courseId) => {
    setCourses(courses.map(course =>
      course.id === courseId ? { ...course, status: 'Rejected' } : course
    ));
    alert('Course rejected!');
  };

  const handleEditCourse = (courseId) => {
    alert(`Editing course with ID: ${courseId}`);
    // Implementation: Open course edit modal
  };

  const handleViewCourseDetails = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    alert(`Course Details:\nName: ${course.name}\nInstructor: ${course.instructor}\nStatus: ${course.status}\nStudents: ${course.students}`);
  };

  const [transactions, setTransactions] = useState([
    { id: 1, user: 'Om Jariwala', course: 'React for Beginners', amount: 799, status: 'Completed', date: '2024-03-15' },
    { id: 2, user: 'Raj Panchal', course: 'Python Programming', amount: 699, status: 'Pending', date: '2024-03-16' },
    { id: 3, user: 'Sneh Prjapati', course: 'Machine Learning', amount: 899, status: 'Completed', date: '2024-03-14' }
  ]);

  // Action handlers for Payment & Transactions
  const handleVerifyTransaction = (transactionId) => {
    setTransactions(transactions.map(transaction =>
      transaction.id === transactionId ? { ...transaction, status: 'Verified' } : transaction
    ));
    alert('Transaction verified successfully!');
  };

  const handleRefundTransaction = (transactionId) => {
    if (window.confirm('Are you sure you want to process this refund?')) {
      setTransactions(transactions.map(transaction =>
        transaction.id === transactionId ? { ...transaction, status: 'Refunded' } : transaction
      ));
      alert('Refund processed successfully!');
    }
  };

  const [feedback, setFeedback] = useState([
    { id: 1, user: 'Sneh Prjapati', course: 'React for Beginners', rating: 5, comment: 'Excellent course!', status: 'Approved' },
    { id: 2, user: 'Poorav Shah', course: 'Python Programming', rating: 4, comment: 'Good content, needs improvement', status: 'Pending' }
  ]);

  // Action handlers for Feedback Management
  const handleApproveFeedback = (feedbackId) => {
    setFeedback(feedback.map(fb =>
      fb.id === feedbackId ? { ...fb, status: 'Approved' } : fb
    ));
    alert('Feedback approved!');
  };

  const handleRejectFeedback = (feedbackId) => {
    setFeedback(feedback.map(fb =>
      fb.id === feedbackId ? { ...fb, status: 'Rejected' } : fb
    ));
    alert('Feedback rejected!');
  };

  const handleEditFeedback = (feedbackId) => {
    alert(`Editing feedback with ID: ${feedbackId}`);
    // Implementation: Open feedback edit modal
  };

  const [liveSessions, setLiveSessions] = useState([
    { id: 1, title: 'React Hooks Deep Dive', instructor: 'Abha Ma\'am', participants: 23, status: 'Live', startTime: '10:00 AM' },
    { id: 2, title: 'Python Basics Q&A', instructor: 'Rakesh Sir', participants: 15, status: 'Scheduled', startTime: '2:00 PM' }
  ]);

  // Action handlers for Live Session Monitor
  const handleMonitorSession = (sessionId) => {
    alert(`Monitoring session with ID: ${sessionId}`);
    // Implementation: Open session monitoring interface
  };

  const handleModerateSession = (sessionId) => {
    alert(`Moderating session with ID: ${sessionId}`);
    // Implementation: Open moderation controls
  };

  const handleEndSession = (sessionId) => {
    if (window.confirm('Are you sure you want to end this session?')) {
      setLiveSessions(liveSessions.map(session =>
        session.id === sessionId ? { ...session, status: 'Ended' } : session
      ));
      alert('Session ended successfully!');
    }
  };

  // Action handlers for Chatbot Management
  const handleManageFAQ = () => {
    alert('Opening FAQ management interface...');
    // Implementation: Navigate to FAQ management
  };

  const handleTrainBot = () => {
    alert('Opening bot training interface...');
    // Implementation: Navigate to bot training
  };

  const handleViewLogs = () => {
    alert('Opening chatbot logs...');
    // Implementation: Navigate to logs viewer
  };

  const handleEditChatbot = () => {
    alert('Opening chatbot configuration...');
    // Implementation: Navigate to chatbot settings
  };

  const handleDeleteChatbot = () => {
    if (window.confirm('Are you sure you want to delete chatbot data?')) {
      alert('Chatbot data deleted!');
    }
  };

  const [exams, setExams] = useState([
    { id: 1, title: 'React Final Assessment', course: 'React for Beginners', participants: 45, status: 'Active', passRate: '87%' },
    { id: 2, title: 'Python Certification', course: 'Python Programming', participants: 32, status: 'Completed', passRate: '92%' }
  ]);

  const handleViewResults = () => {
    alert('Opening exam results viewer...');
    // Implementation: Navigate to results dashboard
  };

  const handleEditExam = () => {
    alert('Opening exam editor...');
    // Implementation: Navigate to exam creation/edit interface
  };

  const handleIssueCertificates = () => {
    alert('Processing certificate issuance...');
    // Implementation: Batch certificate generation
  };

  const menuItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: '📊' },
    { id: 'users', label: 'User Management', icon: '👥' },
    { id: 'courses', label: 'Course & Content', icon: '📚' },
    { id: 'payments', label: 'Payments & Transactions', icon: '💳' },
    { id: 'feedback', label: 'Feedback & Reviews', icon: '⭐' },
    { id: 'live', label: 'Live Session Monitor', icon: '🎥' },
    { id: 'chatbot', label: 'Chatbot Management', icon: '🤖' },
    { id: 'exams', label: 'Exam & Certification', icon: '🎓' },
    { id: 'analytics', label: 'Reports & Analytics', icon: '📈' },
    { id: 'approvals', label: 'Registrar Approvals', icon: '✅' }
  ];

  const renderOverview = () => (
    <div className="overview-panel">
      <h2>📊 Dashboard Overview</h2>
      <div className="stats-grid">
        <div className="stat-card users">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>{stats.totalUsers.toLocaleString()}</h3>
            <p>Total Users</p>
            <span className="stat-trend">+12% this month</span>
          </div>
        </div>
        <div className="stat-card revenue">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>₹{stats.totalRevenue.toLocaleString()}</h3>
            <p>Total Revenue</p>
            <span className="stat-trend">+8% this month</span>
          </div>
        </div>
        <div className="stat-card courses">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <h3>{stats.activeCourses}</h3>
            <p>Active Courses</p>
            <span className="stat-trend">+2 new courses</span>
          </div>
        </div>
        <div className="stat-card pending">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3>{stats.pendingApprovals}</h3>
            <p>Pending Approvals</p>
            <span className="stat-trend">Needs attention</span>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <button className="action-btn" onClick={() => setActivePanel('users')}>
            👥 Manage Users
          </button>
          <button className="action-btn" onClick={() => setActivePanel('courses')}>
            📚 Review Courses
          </button>
          <button className="action-btn" onClick={() => setActivePanel('payments')}>
            💳 Check Payments
          </button>
          <button className="action-btn" onClick={() => setActivePanel('feedback')}>
            ⭐ Review Feedback
          </button>
        </div>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="user-management-panel">
      <h2>👥 User Management</h2>
      <div className="panel-controls">
        <button className="btn-primary">Add New User</button>
        <button className="btn-secondary">Export Users</button>
        <input type="text" placeholder="Search users..." className="search-input" />
      </div>
      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Join Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                  Loading students...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                  No students registered yet
                </td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td><span className={`role-badge ${user.role.toLowerCase()}`}>{user.role}</span></td>
                  <td><span className={`status-badge ${user.status.toLowerCase()}`}>{user.status}</span></td>
                  <td>{user.joinDate}</td>
                  <td>
                    <button className="btn-edit" onClick={() => handleEditUser(user.id)}>Edit</button>
                    <button className="btn-delete" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                    <button className="btn-view" onClick={() => handleViewUser(user.id)}>View</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderCourseManagement = () => (
    <div className="course-management-panel">
      <h2>📚 Course & Content Management</h2>
      <div className="panel-controls">
        <button className="btn-primary">Add New Course</button>
        <button className="btn-secondary">Bulk Actions</button>
        <select className="filter-select">
          <option>All Courses</option>
          <option>Pending Approval</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>
      </div>
      <div className="courses-grid">
        {courses.map(course => (
          <div key={course.id} className="course-admin-card">
            <div className="course-header">
              <h3>{course.name}</h3>
              <span className={`status-badge ${course.status.toLowerCase()}`}>{course.status}</span>
            </div>
            <div className="course-details">
              <p><strong>Instructor:</strong> {course.instructor}</p>
              <p><strong>Students:</strong> {course.students}</p>
              <p><strong>Revenue:</strong> ₹{course.revenue.toLocaleString()}</p>
            </div>
            <div className="course-actions">
              <button className="btn-approve" onClick={() => handleApproveCourse(course.id)}>Approve</button>
              <button className="btn-reject" onClick={() => handleRejectCourse(course.id)}>Reject</button>
              <button className="btn-edit" onClick={() => handleEditCourse(course.id)}>Edit</button>
              <button className="btn-view" onClick={() => handleViewCourseDetails(course.id)}>View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPaymentManagement = () => (
    <div className="payment-management-panel">
      <h2>💳 Payments & Transactions</h2>
      <div className="payment-stats">
        <div className="payment-stat">
          <h4>Total Revenue</h4>
          <p>₹{stats.totalRevenue.toLocaleString()}</p>
        </div>
        <div className="payment-stat">
          <h4>Pending Payments</h4>
          <p>₹12,450</p>
        </div>
        <div className="payment-stat">
          <h4>Refunds Processed</h4>
          <p>₹3,200</p>
        </div>
      </div>
      <div className="transactions-table">
        <table>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>User</th>
              <th>Course</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.id}>
                <td>#{transaction.id.toString().padStart(6, '0')}</td>
                <td>{transaction.user}</td>
                <td>{transaction.course}</td>
                <td>₹{transaction.amount}</td>
                <td><span className={`status-badge ${transaction.status.toLowerCase()}`}>{transaction.status}</span></td>
                <td>{transaction.date}</td>
                <td>
                  <button className="btn-verify" onClick={() => handleVerifyTransaction(transaction.id)}>Verify</button>
                  <button className="btn-refund" onClick={() => handleRefundTransaction(transaction.id)}>Refund</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderFeedbackManagement = () => (
    <div className="feedback-management-panel">
      <h2>⭐ Feedback & Review Management</h2>
      <div className="feedback-stats">
        <div className="feedback-stat">
          <h4>Total Reviews</h4>
          <p>{stats.totalFeedback}</p>
        </div>
        <div className="feedback-stat">
          <h4>Average Rating</h4>
          <p>4.6 ⭐</p>
        </div>
        <div className="feedback-stat">
          <h4>Pending Reviews</h4>
          <p>12</p>
        </div>
      </div>
      <div className="feedback-list">
        {feedback.map(review => (
          <div key={review.id} className="feedback-card">
            <div className="feedback-header">
              <h4>{review.user}</h4>
              <div className="rating">
                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
              </div>
              <span className={`status-badge ${review.status.toLowerCase()}`}>{review.status}</span>
            </div>
            <p><strong>Course:</strong> {review.course}</p>
            <p className="feedback-comment">"{review.comment}"</p>
            <div className="feedback-actions">
              <button className="btn-approve" onClick={() => handleApproveFeedback(review.id)}>Approve</button>
              <button className="btn-reject" onClick={() => handleRejectFeedback(review.id)}>Reject</button>
              <button className="btn-edit" onClick={() => handleEditFeedback(review.id)}>Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLiveSessionMonitor = () => (
    <div className="live-session-panel">
      <h2>🎥 Live Session Monitor</h2>
      <div className="session-stats">
        <div className="session-stat">
          <h4>Active Sessions</h4>
          <p>{stats.liveSessions}</p>
        </div>
        <div className="session-stat">
          <h4>Total Participants</h4>
          <p>127</p>
        </div>
        <div className="session-stat">
          <h4>Sessions Today</h4>
          <p>8</p>
        </div>
      </div>
      <div className="sessions-list">
        {liveSessions.map(session => (
          <div key={session.id} className="session-card">
            <div className="session-info">
              <h4>{session.title}</h4>
              <p>Instructor: {session.instructor}</p>
              <p>Participants: {session.participants}</p>
              <p>Status: <span className={`status-badge ${session.status.toLowerCase()}`}>{session.status}</span></p>
              <p>Start Time: {session.startTime}</p>
            </div>
            <div className="session-actions">
              <button className="btn-monitor" onClick={() => handleMonitorSession(session.id)}>Monitor</button>
              <button className="btn-moderate" onClick={() => handleModerateSession(session.id)}>Moderate</button>
              <button className="btn-end" onClick={() => handleEndSession(session.id)}>End Session</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderChatbotManagement = () => (
    <div className="chatbot-management-panel">
      <h2>🤖 Chatbot Management</h2>
      <div className="chatbot-stats">
        <div className="chatbot-stat">
          <h4>Total FAQs</h4>
          <p>156</p>
        </div>
        <div className="chatbot-stat">
          <h4>Queries Today</h4>
          <p>89</p>
        </div>
        <div className="chatbot-stat">
          <h4>Response Rate</h4>
          <p>94%</p>
        </div>
      </div>
      <div className="chatbot-actions">
        <button className="btn-primary" onClick={handleManageFAQ}>Manage FAQ</button>
        <button className="btn-secondary" onClick={handleTrainBot}>Train Bot</button>
        <button className="btn-info" onClick={handleViewLogs}>View Logs</button>
        <button className="btn-edit" onClick={handleEditChatbot}>Edit Settings</button>
        <button className="btn-delete" onClick={handleDeleteChatbot}>Delete Data</button>
      </div>
      <div className="faq-list">
        <div className="faq-item">
          <h4>How to enroll in a course?</h4>
          <p>Click on the "Enroll Now" button on any course card and complete the payment process.</p>
          <div className="faq-actions">
            <button className="btn-edit">Edit</button>
            <button className="btn-delete">Delete</button>
          </div>
        </div>
        <div className="faq-item">
          <h4>What payment methods are accepted?</h4>
          <p>We accept all major credit cards, debit cards, UPI, and net banking.</p>
          <div className="faq-actions">
            <button className="btn-edit">Edit</button>
            <button className="btn-delete">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderExamManagement = () => (
    <div className="exam-management-panel">
      <h2>🎓 Exam & Certification Management</h2>
      <div className="exam-stats">
        <div className="exam-stat">
          <h4>Total Exams</h4>
          <p>{stats.totalExams}</p>
        </div>
        <div className="exam-stat">
          <h4>Certificates Issued</h4>
          <p>{stats.certificatesIssued}</p>
        </div>
        <div className="exam-stat">
          <h4>Average Pass Rate</h4>
          <p>89%</p>
        </div>
      </div>
      <div className="panel-controls">
        <button className="btn-primary" onClick={handleViewResults}>View Results</button>
        <button className="btn-secondary" onClick={handleEditExam}>Edit Exam</button>
        <button className="btn-success" onClick={handleIssueCertificates}>Issue Certificates</button>
        <button className="btn-secondary">Export Results</button>
      </div>
      <div className="exams-list">
        {exams.map(exam => (
          <div key={exam.id} className="exam-card">
            <div className="exam-header">
              <h4>{exam.title}</h4>
              <span className={`status-badge ${exam.status.toLowerCase()}`}>{exam.status}</span>
            </div>
            <p><strong>Course:</strong> {exam.course}</p>
            <p><strong>Participants:</strong> {exam.participants}</p>
            <p><strong>Pass Rate:</strong> {exam.passRate}</p>
            <div className="exam-actions">
              <button className="btn-view">View Results</button>
              <button className="btn-edit">Edit Exam</button>
              <button className="btn-certificate">Issue Certificates</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="analytics-panel">
      <h2>📈 Reports & Analytics</h2>
      <div className="analytics-grid">
        <div className="analytics-card">
          <h3>User Growth</h3>
          <div className="chart-placeholder">
            <p>📊 User registration trends over time</p>
            <div className="mock-chart">
              <div className="chart-bar" style={{ height: '60%' }}></div>
              <div className="chart-bar" style={{ height: '80%' }}></div>
              <div className="chart-bar" style={{ height: '70%' }}></div>
              <div className="chart-bar" style={{ height: '90%' }}></div>
              <div className="chart-bar" style={{ height: '100%' }}></div>
            </div>
          </div>
        </div>
        <div className="analytics-card">
          <h3>Revenue Analytics</h3>
          <div className="chart-placeholder">
            <p>💰 Monthly revenue breakdown</p>
            <div className="revenue-breakdown">
              <div className="revenue-item">
                <span>Course Sales</span>
                <span>₹67,890</span>
              </div>
              <div className="revenue-item">
                <span>Certifications</span>
                <span>₹15,670</span>
              </div>
              <div className="revenue-item">
                <span>Live Sessions</span>
                <span>₹5,890</span>
              </div>
            </div>
          </div>
        </div>
        <div className="analytics-card">
          <h3>Course Performance</h3>
          <div className="chart-placeholder">
            <p>📚 Most popular courses</p>
            <div className="course-performance">
              <div className="performance-item">
                <span>React for Beginners</span>
                <div className="progress-bar">
                  <div className="progress" style={{ width: '90%' }}></div>
                </div>
              </div>
              <div className="performance-item">
                <span>Python Programming</span>
                <div className="progress-bar">
                  <div className="progress" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div className="performance-item">
                <span>Machine Learning</span>
                <div className="progress-bar">
                  <div className="progress" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderApprovals = () => {
    let profile = {};
    try { profile = JSON.parse(localStorage.getItem('registrar_profile') || '{}'); } catch {}
    const isRegistered = !!localStorage.getItem('registrar_user');
    const approved = localStorage.getItem('registrar_approved') === 'true';

    const approve = () => {
      localStorage.setItem('registrar_approved', 'true');
      alert('Registrar approved. They can now manage institutes.');
      setStats(prev => ({ ...prev, pendingApprovals: Math.max(0, (prev.pendingApprovals || 0) - 1) }));
    };

    const reject = () => {
      localStorage.setItem('registrar_approved', 'false');
      alert('Registrar rejected.');
    };

    return (
      <div className="user-management-panel">
        <h2>✅ Registrar Approvals</h2>
        {!isRegistered ? (
          <div className="panel-controls">
            <span>No registrar registration found yet.</span>
          </div>
        ) : (
          <div className="users-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>University</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{profile.name || 'Registrar'}</td>
                  <td>{profile.university || '—'}</td>
                  <td>{profile.contact || '—'}</td>
                  <td>{profile.email || 'ragistrar123@gmail.com'}</td>
                  <td><span className={`status-badge ${approved ? 'approved' : 'pending'}`}>{approved ? 'Approved' : 'Pending'}</span></td>
                  <td>
                    <button className="btn-approve" onClick={approve}>Approve</button>
                    <button className="btn-reject" onClick={reject}>Reject</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  const renderActivePanel = () => {
    switch (activePanel) {
      case 'overview': return renderOverview();
      case 'users': return renderUserManagement();
      case 'courses': return renderCourseManagement();
      case 'payments': return renderPaymentManagement();
      case 'feedback': return renderFeedbackManagement();
      case 'live': return renderLiveSessionMonitor();
      case 'chatbot': return renderChatbotManagement();
      case 'exams': return renderExamManagement();
      case 'analytics': return renderAnalytics();
      case 'approvals': return renderApprovals();
      default: return renderOverview();
    }
  };

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="admin-header">
          <Logo size="medium" showText={true} style={{ color: 'white', marginBottom: '1rem' }} />
          <h2>🔧 Admin Panel</h2>
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
            <span>Admin Dashboard</span>
            <span>/</span>
            <span>{menuItems.find(item => item.id === activePanel)?.label}</span>
          </div>
          <div className="admin-user-info">
            <span>Welcome, Admin</span>
            <div className="admin-avatar">👤</div>
          </div>
        </header>

        <div className="admin-panel-content">
          {renderActivePanel()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
