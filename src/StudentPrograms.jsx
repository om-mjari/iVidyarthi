import React from 'react';
import './StudentDashboard.css';

const StudentPrograms = ({ onNavigateHome, onNavigateLogin }) => {
  const programs = [
    {
      title: "Student Ambassador Program",
      description: "Represent iVidhyarthi in your college and help fellow students discover quality education",
      benefits: ["Leadership Experience", "Certificate", "Networking", "Stipend"],
      duration: "6 months",
      participants: 150,
      status: "Open for Applications",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop"
    },
    {
      title: "Peer Mentorship Program",
      description: "Guide junior students in their learning journey and develop mentoring skills",
      benefits: ["Mentoring Skills", "Recognition", "Community Impact", "Resume Boost"],
      duration: "4 months",
      participants: 200,
      status: "Ongoing",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop"
    },
    {
      title: "Innovation Challenge",
      description: "Solve real-world problems using technology and win exciting prizes",
      benefits: ["Cash Prizes", "Internship Opportunities", "Industry Exposure", "Patent Support"],
      duration: "3 months",
      participants: 500,
      status: "Registration Open",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop"
    },
    {
      title: "Research Internship Program",
      description: "Work with faculty on cutting-edge research projects",
      benefits: ["Research Experience", "Publication Opportunities", "Faculty Guidance", "Stipend"],
      duration: "6 months",
      participants: 80,
      status: "Applications Closed",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop"
    }
  ];

  const achievements = [
    { metric: "2000+", label: "Students Participated" },
    { metric: "50+", label: "Partner Companies" },
    { metric: "100+", label: "Projects Completed" },
    { metric: "₹50L+", label: "Scholarships Awarded" }
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
          <p>Student Programs - Beyond Academics, Building Future Leaders</p>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="page-container">
          <div className="page-header">
            <h1>Student Programs</h1>
            <p className="page-description">Comprehensive programs designed to enhance your skills, leadership, and career prospects</p>
          </div>

          <div className="content-sections">
            <section className="content-card">
              <h2>🎯 Why Join Our Programs?</h2>
              <p>
                Our student programs go beyond traditional learning to provide hands-on experience, 
                leadership opportunities, and real-world exposure. Whether you want to develop 
                technical skills, leadership abilities, or make a social impact, we have programs 
                tailored for your growth.
              </p>
            </section>

            <section className="content-card">
              <h2>🚀 Available Programs</h2>
              <div className="programs-grid">
                {programs.map((program, index) => (
                  <div key={index} className="program-card">
                    <div className="program-image">
                      <img src={program.image} alt={program.title} />
                      <span className={`status-badge ${program.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {program.status}
                      </span>
                    </div>
                    <div className="program-content">
                      <h3>{program.title}</h3>
                      <p>{program.description}</p>
                      
                      <div className="program-details">
                        <div className="detail-row">
                          <strong>⏱️ Duration:</strong> {program.duration}
                        </div>
                        <div className="detail-row">
                          <strong>👥 Participants:</strong> {program.participants}
                        </div>
                      </div>

                      <div className="program-benefits">
                        <h4>Benefits:</h4>
                        <div className="benefits-tags">
                          {program.benefits.map((benefit, idx) => (
                            <span key={idx} className="benefit-tag">{benefit}</span>
                          ))}
                        </div>
                      </div>

                      <button className="apply-program-btn">
                        {program.status === 'Applications Closed' ? 'Notify Me' : 'Apply Now'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="content-card">
              <h2>📊 Program Impact</h2>
              <div className="achievements-grid">
                {achievements.map((achievement, index) => (
                  <div key={index} className="achievement-card">
                    <h3>{achievement.metric}</h3>
                    <p>{achievement.label}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="content-card">
              <h2>🌟 Student Success Stories</h2>
              <div className="success-stories">
                <div className="story-card">
                  <div className="story-content">
                    <p>"The Student Ambassador Program helped me develop leadership skills and build a strong network. I'm now working at a top tech company!"</p>
                    <div className="story-author">
                      <strong>- Priya Sharma, Computer Science</strong>
                    </div>
                  </div>
                </div>
                <div className="story-card">
                  <div className="story-content">
                    <p>"Through the Innovation Challenge, I developed a solution that's now being used by 10,000+ users. The mentorship was incredible!"</p>
                    <div className="story-author">
                      <strong>- Rahul Kumar, Engineering</strong>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="content-card">
              <h2>📋 How to Apply</h2>
              <div className="application-process">
                <div className="process-step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h3>Choose Program</h3>
                    <p>Select the program that aligns with your goals</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h3>Submit Application</h3>
                    <p>Fill out the application form with required documents</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h3>Interview</h3>
                    <p>Participate in the selection interview process</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h3>Start Journey</h3>
                    <p>Begin your transformative learning experience</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="content-card cta-section">
              <h2>🚀 Ready to Transform Your Future?</h2>
              <p>Join thousands of students who have accelerated their careers through our programs</p>
              <div className="cta-buttons">
                <button className="cta-btn primary">Apply to Programs</button>
                <button className="cta-btn secondary" onClick={onNavigateHome}>
                  Explore Courses
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPrograms;
