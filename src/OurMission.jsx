import React from 'react';
import './StudentDashboard.css';

const OurMission = ({ onNavigateHome, onNavigateLogin }) => {
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
          <p>Our Mission - Transforming Lives Through Quality Education</p>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="page-container">
          <div className="page-header">
            <h1>Our Mission</h1>
            <p className="page-description">Empowering students worldwide with accessible, quality education</p>
          </div>

          <div className="content-sections">
            <section className="content-card">
              <h2>🎯 Mission Statement</h2>
              <div className="mission-statement">
                <p>
                  "To democratize quality education by providing accessible, affordable, and innovative learning 
                  experiences that empower students to achieve their full potential and contribute meaningfully 
                  to society."
                </p>
              </div>
            </section>

            <section className="content-card">
              <h2>🌟 Core Values</h2>
              <div className="values-grid">
                <div className="value-item">
                  <h3>🎓 Excellence</h3>
                  <p>We strive for the highest standards in education delivery and student outcomes.</p>
                </div>
                <div className="value-item">
                  <h3>🤝 Accessibility</h3>
                  <p>Education should be available to everyone, regardless of background or circumstances.</p>
                </div>
                <div className="value-item">
                  <h3>💡 Innovation</h3>
                  <p>We continuously evolve our teaching methods using cutting-edge technology.</p>
                </div>
                <div className="value-item">
                  <h3>🌍 Community</h3>
                  <p>Building a supportive learning community that fosters growth and collaboration.</p>
                </div>
              </div>
            </section>

            <section className="content-card">
              <h2>🎯 Our Goals</h2>
              <div className="goals-list">
                <div className="goal-item">
                  <span className="goal-number">01</span>
                  <div>
                    <h3>Bridge the Education Gap</h3>
                    <p>Provide quality education to underserved communities and remote areas</p>
                  </div>
                </div>
                <div className="goal-item">
                  <span className="goal-number">02</span>
                  <div>
                    <h3>Industry-Relevant Skills</h3>
                    <p>Equip students with practical skills demanded by today's job market</p>
                  </div>
                </div>
                <div className="goal-item">
                  <span className="goal-number">03</span>
                  <div>
                    <h3>Lifelong Learning</h3>
                    <p>Foster a culture of continuous learning and professional development</p>
                  </div>
                </div>
                <div className="goal-item">
                  <span className="goal-number">04</span>
                  <div>
                    <h3>Global Reach</h3>
                    <p>Expand our impact to students worldwide through digital platforms</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurMission;
