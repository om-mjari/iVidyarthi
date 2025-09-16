import React from 'react';
import './StudentDashboard.css';

const LearnAboutIVidhyarthi = ({ onNavigateHome, onNavigateLogin }) => {
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
          <p>Learn About iVidhyarthi - Empowering Education Through Technology</p>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="page-container">
          <div className="page-header">
            <h1>Learn About iVidhyarthi</h1>
            <p className="page-description">Discover our journey, mission, and commitment to transforming education</p>
          </div>

          <div className="content-sections">
            {/* About Section */}
            <section className="content-card">
              <h2>🎓 What is iVidhyarthi?</h2>
              <p>
                iVidhyarthi is a comprehensive online learning platform designed to provide high-quality education 
                to students across India and beyond. We bridge the gap between traditional classroom learning and 
                modern digital education through innovative teaching methods and cutting-edge technology.
              </p>
              <div className="highlight-box">
                <h3>Our Vision</h3>
                <p>To democratize quality education and make it accessible to every student, regardless of their geographical location or economic background.</p>
              </div>
            </section>

            {/* Key Features */}
            <section className="content-card">
              <h2>🚀 Key Features</h2>
              <div className="features-grid">
                <div className="feature-item">
                  <h3>📚 Comprehensive Courses</h3>
                  <p>Wide range of courses covering programming, data structures, web development, and emerging technologies.</p>
                </div>
                <div className="feature-item">
                  <h3>👨‍🏫 Expert Instructors</h3>
                  <p>Learn from industry professionals and experienced educators with proven track records.</p>
                </div>
                <div className="feature-item">
                  <h3>🎯 Interactive Learning</h3>
                  <p>Hands-on projects, coding exercises, and real-world applications to enhance learning experience.</p>
                </div>
                <div className="feature-item">
                  <h3>📱 Flexible Access</h3>
                  <p>Learn anytime, anywhere with our responsive platform accessible on all devices.</p>
                </div>
              </div>
            </section>

            {/* Statistics */}
            <section className="content-card">
              <h2>📊 Our Impact</h2>
              <div className="stats-grid">
                <div className="stat-item">
                  <h3>10,000+</h3>
                  <p>Students Enrolled</p>
                </div>
                <div className="stat-item">
                  <h3>50+</h3>
                  <p>Expert Instructors</p>
                </div>
                <div className="stat-item">
                  <h3>100+</h3>
                  <p>Courses Available</p>
                </div>
                <div className="stat-item">
                  <h3>95%</h3>
                  <p>Student Satisfaction</p>
                </div>
              </div>
            </section>

            {/* Why Choose Us */}
            <section className="content-card">
              <h2>⭐ Why Choose iVidhyarthi?</h2>
              <div className="benefits-list">
                <div className="benefit-item">
                  <span className="benefit-icon">✅</span>
                  <div>
                    <h3>Quality Education</h3>
                    <p>Curriculum designed by industry experts and academic professionals</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">✅</span>
                  <div>
                    <h3>Affordable Pricing</h3>
                    <p>High-quality education at prices that won't break the bank</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">✅</span>
                  <div>
                    <h3>Certificate Programs</h3>
                    <p>Earn recognized certificates upon successful course completion</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">✅</span>
                  <div>
                    <h3>Community Support</h3>
                    <p>Join a vibrant community of learners and educators</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Call to Action */}
            <section className="content-card cta-section">
              <h2>🎯 Ready to Start Learning?</h2>
              <p>Join thousands of students who have transformed their careers with iVidhyarthi</p>
              <div className="cta-buttons">
                <button className="cta-btn primary" onClick={onNavigateHome}>
                  Browse Courses
                </button>
                <button className="cta-btn secondary" onClick={onNavigateLogin}>
                  Get Started Today
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnAboutIVidhyarthi;
