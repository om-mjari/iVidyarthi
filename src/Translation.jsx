import React from 'react';
import './StudentDashboard.css';

const Translation = ({ onNavigateHome, onNavigateLogin }) => {
  const languages = [
    { name: "Hindi", code: "hi", progress: 85, volunteers: 12, status: "Active" },
    { name: "Bengali", code: "bn", progress: 70, volunteers: 8, status: "Active" },
    { name: "Tamil", code: "ta", progress: 60, volunteers: 6, status: "Active" },
    { name: "Telugu", code: "te", progress: 55, volunteers: 5, status: "Active" },
    { name: "Marathi", code: "mr", progress: 45, volunteers: 4, status: "In Progress" },
    { name: "Gujarati", code: "gu", progress: 40, volunteers: 3, status: "In Progress" },
    { name: "Kannada", code: "kn", progress: 35, volunteers: 3, status: "In Progress" },
    { name: "Malayalam", code: "ml", progress: 30, volunteers: 2, status: "Starting Soon" }
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
          <p>Translation Initiative - Making Education Accessible in Regional Languages</p>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="page-container">
          <div className="page-header">
            <h1>Translation Initiative</h1>
            <p className="page-description">Breaking language barriers to make quality education accessible to everyone</p>
          </div>

          <div className="content-sections">
            <section className="content-card">
              <h2>🌍 Our Mission</h2>
              <p>
                The Translation Initiative aims to make iVidhyarthi courses available in multiple Indian languages, 
                ensuring that language is never a barrier to quality education. We work with native speakers and 
                subject matter experts to provide accurate, culturally relevant translations.
              </p>
            </section>

            <section className="content-card">
              <h2>📊 Translation Progress</h2>
              <div className="languages-grid">
                {languages.map((language, index) => (
                  <div key={index} className="language-card">
                    <div className="language-header">
                      <h3>{language.name}</h3>
                      <span className={`status-badge ${language.status.toLowerCase().replace(' ', '-')}`}>
                        {language.status}
                      </span>
                    </div>
                    <div className="progress-info">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${language.progress}%` }}
                        ></div>
                      </div>
                      <span className="progress-text">{language.progress}% Complete</span>
                    </div>
                    <div className="language-stats">
                      <p>👥 {language.volunteers} Volunteers</p>
                      <p>🔤 Language Code: {language.code}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="content-card">
              <h2>🎯 Translation Process</h2>
              <div className="process-steps">
                <div className="step-item">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h3>Content Selection</h3>
                    <p>Identify high-priority courses and materials for translation</p>
                  </div>
                </div>
                <div className="step-item">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h3>Volunteer Recruitment</h3>
                    <p>Find qualified native speakers with subject expertise</p>
                  </div>
                </div>
                <div className="step-item">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h3>Translation & Review</h3>
                    <p>Translate content and conduct thorough quality reviews</p>
                  </div>
                </div>
                <div className="step-item">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h3>Publication</h3>
                    <p>Make translated content available to students</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="content-card">
              <h2>🤝 Join Our Translation Team</h2>
              <p>Help us make education accessible to millions of students in their native languages!</p>
              
              <div className="volunteer-requirements">
                <h3>Requirements for Volunteers:</h3>
                <ul>
                  <li>Native proficiency in target language</li>
                  <li>Strong understanding of technical/educational content</li>
                  <li>Commitment to quality and accuracy</li>
                  <li>Available for 5-10 hours per week</li>
                </ul>
              </div>

              <div className="volunteer-benefits">
                <h3>Benefits for Volunteers:</h3>
                <ul>
                  <li>Free access to all iVidhyarthi courses</li>
                  <li>Certificate of contribution</li>
                  <li>Recognition in course credits</li>
                  <li>Networking with education professionals</li>
                </ul>
              </div>
            </section>

            <section className="content-card cta-section">
              <h2>🚀 Get Involved</h2>
              <p>Be part of our mission to democratize education across India</p>
              <div className="cta-buttons">
                <button className="cta-btn primary">Become a Volunteer</button>
                <button className="cta-btn secondary" onClick={onNavigateHome}>
                  Browse Courses
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Translation;
