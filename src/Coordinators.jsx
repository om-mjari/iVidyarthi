import React from 'react';
import './StudentDashboard.css';

const Coordinators = ({ onNavigateHome, onNavigateLogin }) => {
  const coordinators = [
    {
      name: "Dr. Rajesh Kumar",
      role: "National Coordinator",
      region: "All India",
      email: "rajesh.kumar@ividhyarthi.com",
      phone: "+91 98765 00001",
      expertise: "Educational Leadership, Curriculum Development",
      experience: "15+ years",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Prof. Priya Sharma",
      role: "Regional Coordinator - North",
      region: "Delhi, Punjab, Haryana, UP",
      email: "priya.sharma@ividhyarthi.com",
      phone: "+91 98765 00002",
      expertise: "Computer Science, Online Learning",
      experience: "12+ years",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Dr. Anita Reddy",
      role: "Regional Coordinator - South",
      region: "Karnataka, Tamil Nadu, Andhra Pradesh, Kerala",
      email: "anita.reddy@ividhyarthi.com",
      phone: "+91 98765 00003",
      expertise: "Data Science, Machine Learning",
      experience: "10+ years",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Prof. Vikram Patil",
      role: "Regional Coordinator - West",
      region: "Maharashtra, Gujarat, Rajasthan, Goa",
      email: "vikram.patil@ividhyarthi.com",
      phone: "+91 98765 00004",
      expertise: "Web Development, Software Engineering",
      experience: "11+ years",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Dr. Suresh Babu",
      role: "Regional Coordinator - East",
      region: "West Bengal, Odisha, Jharkhand, Bihar",
      email: "suresh.babu@ividhyarthi.com",
      phone: "+91 98765 00005",
      expertise: "Database Systems, Cloud Computing",
      experience: "13+ years",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Prof. Meera Joshi",
      role: "Technical Coordinator",
      region: "Platform Development",
      email: "meera.joshi@ividhyarthi.com",
      phone: "+91 98765 00006",
      expertise: "Educational Technology, Platform Architecture",
      experience: "9+ years",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face"
    }
  ];

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-inner">
          <div className="header-brand">
            <h1 onClick={onNavigateHome} style={{ cursor: 'pointer' }}>iVidhyarthi</h1>
          </div>
          
          <div className="header-actions">
            <button className="login-signup-btn" onClick={onNavigateLogin}>
              Login/Signup
            </button>
          </div>
        </div>
        
        <div className="header-subtitle">
          <p>Coordinators - Meet Our Regional and Subject Matter Experts</p>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="page-container">
          <div className="page-header">
            <h1>Our Coordinators</h1>
            <p className="page-description">Meet the dedicated professionals who coordinate our educational programs across different regions</p>
          </div>

          <div className="content-sections">
            <section className="content-card">
              <h2>👥 About Our Coordinators</h2>
              <p>
                Our coordinators are experienced educators and industry professionals who ensure the smooth 
                delivery of our courses across different regions. They provide local support, coordinate 
                with instructors, and help students succeed in their learning journey.
              </p>
            </section>

            <section className="content-card">
              <h2>🌍 Regional Coordinators</h2>
              <div className="coordinators-grid">
                {coordinators.map((coordinator, index) => (
                  <div key={index} className="coordinator-card">
                    <div className="coordinator-image">
                      <img src={coordinator.image} alt={coordinator.name} />
                    </div>
                    <div className="coordinator-info">
                      <h3>{coordinator.name}</h3>
                      <p className="coordinator-role">{coordinator.role}</p>
                      <p className="coordinator-region">📍 {coordinator.region}</p>
                      
                      <div className="coordinator-details">
                        <div className="detail-item">
                          <strong>📧 Email:</strong>
                          <p>{coordinator.email}</p>
                        </div>
                        <div className="detail-item">
                          <strong>📞 Phone:</strong>
                          <p>{coordinator.phone}</p>
                        </div>
                        <div className="detail-item">
                          <strong>🎓 Expertise:</strong>
                          <p>{coordinator.expertise}</p>
                        </div>
                        <div className="detail-item">
                          <strong>⏱️ Experience:</strong>
                          <p>{coordinator.experience}</p>
                        </div>
                      </div>
                      
                      <button className="contact-coordinator-btn">Contact Coordinator</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="content-card">
              <h2>🎯 Coordinator Responsibilities</h2>
              <div className="responsibilities-grid">
                <div className="responsibility-item">
                  <h3>📚 Course Coordination</h3>
                  <p>Oversee course delivery and ensure quality standards are maintained</p>
                </div>
                <div className="responsibility-item">
                  <h3>👨‍🎓 Student Support</h3>
                  <p>Provide guidance and support to students throughout their learning journey</p>
                </div>
                <div className="responsibility-item">
                  <h3>🤝 Instructor Liaison</h3>
                  <p>Coordinate with instructors and facilitate smooth communication</p>
                </div>
                <div className="responsibility-item">
                  <h3>📊 Quality Assurance</h3>
                  <p>Monitor and maintain educational quality across all programs</p>
                </div>
              </div>
            </section>

            <section className="content-card cta-section">
              <h2>📞 Need Help?</h2>
              <p>Contact your regional coordinator for any assistance with courses or programs</p>
              <div className="cta-buttons">
                <button className="cta-btn primary" onClick={onNavigateHome}>
                  Browse Courses
                </button>
                <button className="cta-btn secondary" onClick={onNavigateLogin}>
                  Get Started
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coordinators;
