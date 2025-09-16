import React from 'react';
import './StudentDashboard.css';

const FacultyInitiatives = ({ onNavigateHome, onNavigateLogin }) => {
  const initiatives = [
    {
      title: "Faculty Development Program",
      description: "Comprehensive training for educators to enhance teaching methodologies",
      participants: 250,
      duration: "6 months",
      status: "Ongoing",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=250&fit=crop"
    },
    {
      title: "Research Collaboration Network",
      description: "Connecting faculty members for collaborative research projects",
      participants: 180,
      duration: "Continuous",
      status: "Active",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop"
    },
    {
      title: "Digital Teaching Excellence",
      description: "Training faculty in modern digital teaching tools and techniques",
      participants: 320,
      duration: "3 months",
      status: "Completed",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop"
    },
    {
      title: "Industry-Academia Bridge",
      description: "Connecting academic faculty with industry professionals",
      participants: 150,
      duration: "4 months",
      status: "Starting Soon",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop"
    }
  ];

  const benefits = [
    {
      icon: "🎓",
      title: "Professional Development",
      description: "Continuous learning opportunities for career advancement"
    },
    {
      icon: "🤝",
      title: "Networking",
      description: "Connect with educators and industry experts nationwide"
    },
    {
      icon: "💡",
      title: "Innovation Support",
      description: "Resources and funding for innovative teaching methods"
    },
    {
      icon: "📊",
      title: "Research Opportunities",
      description: "Access to research grants and collaboration projects"
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
          <p>Faculty Initiatives - Empowering Educators for Excellence</p>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="page-container">
          <div className="page-header">
            <h1>Faculty Initiatives</h1>
            <p className="page-description">Comprehensive programs designed to support and enhance faculty development</p>
          </div>

          <div className="content-sections">
            <section className="content-card">
              <h2>🎯 Our Vision</h2>
              <p>
                We believe that exceptional educators create exceptional learning experiences. Our Faculty Initiatives 
                are designed to support, train, and empower educators with the latest teaching methodologies, 
                technology tools, and research opportunities to excel in their academic careers.
              </p>
            </section>

            <section className="content-card">
              <h2>📚 Current Initiatives</h2>
              <div className="initiatives-grid">
                {initiatives.map((initiative, index) => (
                  <div key={index} className="initiative-card">
                    <div className="initiative-image">
                      <img src={initiative.image} alt={initiative.title} />
                      <span className={`status-badge ${initiative.status.toLowerCase().replace(' ', '-')}`}>
                        {initiative.status}
                      </span>
                    </div>
                    <div className="initiative-content">
                      <h3>{initiative.title}</h3>
                      <p>{initiative.description}</p>
                      <div className="initiative-stats">
                        <div className="stat-item">
                          <strong>👥 Participants:</strong> {initiative.participants}
                        </div>
                        <div className="stat-item">
                          <strong>⏱️ Duration:</strong> {initiative.duration}
                        </div>
                      </div>
                      <button className="learn-more-btn">Learn More</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="content-card">
              <h2>🌟 Benefits for Faculty</h2>
              <div className="benefits-grid">
                {benefits.map((benefit, index) => (
                  <div key={index} className="benefit-item">
                    <div className="benefit-icon">{benefit.icon}</div>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="content-card">
              <h2>📈 Program Statistics</h2>
              <div className="stats-container">
                <div className="stat-card">
                  <h3>900+</h3>
                  <p>Faculty Members Trained</p>
                </div>
                <div className="stat-card">
                  <h3>50+</h3>
                  <p>Partner Institutions</p>
                </div>
                <div className="stat-card">
                  <h3>25+</h3>
                  <p>Research Projects</p>
                </div>
                <div className="stat-card">
                  <h3>95%</h3>
                  <p>Satisfaction Rate</p>
                </div>
              </div>
            </section>

            <section className="content-card">
              <h2>🚀 How to Join</h2>
              <div className="join-process">
                <div className="process-step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h3>Application</h3>
                    <p>Submit your application with academic credentials</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h3>Review</h3>
                    <p>Our team reviews your application and experience</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h3>Selection</h3>
                    <p>Selected candidates receive program details</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h3>Participation</h3>
                    <p>Begin your journey of professional development</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="content-card cta-section">
              <h2>👨‍🏫 Ready to Join Our Faculty Network?</h2>
              <p>Take the next step in your academic career with our comprehensive faculty development programs</p>
              <div className="cta-buttons">
                <button className="cta-btn primary">Apply Now</button>
                <button className="cta-btn secondary" onClick={onNavigateHome}>
                  Learn More
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyInitiatives;
