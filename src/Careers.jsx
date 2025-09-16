import React from 'react';
import './StudentDashboard.css';

const Careers = ({ onNavigateHome, onNavigateLogin }) => {
  const jobOpenings = [
    {
      title: "Senior React Developer",
      department: "Engineering",
      location: "Bangalore, India",
      type: "Full-time",
      experience: "3-5 years",
      skills: ["React", "JavaScript", "Node.js", "MongoDB"],
      description: "Join our engineering team to build next-generation educational platforms"
    },
    {
      title: "Data Scientist",
      department: "Analytics",
      location: "Mumbai, India",
      type: "Full-time",
      experience: "2-4 years",
      skills: ["Python", "Machine Learning", "SQL", "TensorFlow"],
      description: "Help us leverage data to improve learning outcomes for millions of students"
    },
    {
      title: "UX/UI Designer",
      department: "Design",
      location: "Delhi, India",
      type: "Full-time",
      experience: "2-3 years",
      skills: ["Figma", "Adobe Creative Suite", "User Research", "Prototyping"],
      description: "Design intuitive and engaging learning experiences for our platform"
    },
    {
      title: "Content Creator",
      department: "Content",
      location: "Remote",
      type: "Contract",
      experience: "1-3 years",
      skills: ["Technical Writing", "Video Production", "Curriculum Design"],
      description: "Create high-quality educational content for various technical subjects"
    },
    {
      title: "DevOps Engineer",
      department: "Infrastructure",
      location: "Hyderabad, India",
      type: "Full-time",
      experience: "3-6 years",
      skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Linux"],
      description: "Build and maintain scalable infrastructure for our learning platform"
    },
    {
      title: "Marketing Manager",
      department: "Marketing",
      location: "Pune, India",
      type: "Full-time",
      experience: "4-7 years",
      skills: ["Digital Marketing", "SEO", "Content Strategy", "Analytics"],
      description: "Drive growth and user acquisition through innovative marketing strategies"
    }
  ];

  const benefits = [
    {
      icon: "💰",
      title: "Competitive Salary",
      description: "Industry-leading compensation packages with performance bonuses"
    },
    {
      icon: "🏥",
      title: "Health Benefits",
      description: "Comprehensive health insurance for you and your family"
    },
    {
      icon: "🏠",
      title: "Remote Work",
      description: "Flexible work arrangements with remote work options"
    },
    {
      icon: "📚",
      title: "Learning Budget",
      description: "Annual learning budget for courses, conferences, and certifications"
    },
    {
      icon: "🌴",
      title: "Paid Time Off",
      description: "Generous vacation policy and paid holidays"
    },
    {
      icon: "🚀",
      title: "Career Growth",
      description: "Clear career progression paths and mentorship programs"
    }
  ];

  const values = [
    {
      title: "Innovation",
      description: "We constantly push boundaries to create better learning experiences",
      icon: "💡"
    },
    {
      title: "Impact",
      description: "Every day, we work to transform lives through education",
      icon: "🌟"
    },
    {
      title: "Collaboration",
      description: "We believe great things happen when diverse minds work together",
      icon: "🤝"
    },
    {
      title: "Excellence",
      description: "We strive for excellence in everything we do",
      icon: "🏆"
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
          <p>Careers - Join Our Mission to Transform Education</p>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="page-container">
          <div className="page-header">
            <h1>Join Our Team</h1>
            <p className="page-description">Be part of a mission-driven team that's transforming education for millions of students</p>
          </div>

          <div className="content-sections">
            <section className="content-card">
              <h2>🚀 Why Work at iVidhyarthi?</h2>
              <p>
                At iVidhyarthi, we're not just building a platform – we're creating the future of education. 
                Join a team of passionate individuals who are committed to making quality education accessible 
                to everyone. We offer a collaborative environment where your ideas matter and your work has 
                real impact on millions of learners.
              </p>
            </section>

            <section className="content-card">
              <h2>💼 Current Openings</h2>
              <div className="jobs-grid">
                {jobOpenings.map((job, index) => (
                  <div key={index} className="job-card">
                    <div className="job-header">
                      <h3>{job.title}</h3>
                      <span className="department-badge">{job.department}</span>
                    </div>
                    <p className="job-description">{job.description}</p>
                    
                    <div className="job-details">
                      <div className="detail-row">
                        <span>📍 {job.location}</span>
                        <span>💼 {job.type}</span>
                      </div>
                      <div className="detail-row">
                        <span>⏱️ {job.experience}</span>
                      </div>
                    </div>

                    <div className="job-skills">
                      <h4>Required Skills:</h4>
                      <div className="skills-tags">
                        {job.skills.map((skill, idx) => (
                          <span key={idx} className="skill-tag">{skill}</span>
                        ))}
                      </div>
                    </div>

                    <button className="apply-job-btn">Apply Now</button>
                  </div>
                ))}
              </div>
            </section>

            <section className="content-card">
              <h2>🌟 Our Values</h2>
              <div className="values-grid">
                {values.map((value, index) => (
                  <div key={index} className="value-item">
                    <div className="value-icon">{value.icon}</div>
                    <h3>{value.title}</h3>
                    <p>{value.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="content-card">
              <h2>🎁 Benefits & Perks</h2>
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
              <h2>📊 Company Stats</h2>
              <div className="stats-container">
                <div className="stat-card">
                  <h3>200+</h3>
                  <p>Team Members</p>
                </div>
                <div className="stat-card">
                  <h3>50+</h3>
                  <p>Cities Represented</p>
                </div>
                <div className="stat-card">
                  <h3>5M+</h3>
                  <p>Students Impacted</p>
                </div>
                <div className="stat-card">
                  <h3>4.8/5</h3>
                  <p>Employee Satisfaction</p>
                </div>
              </div>
            </section>

            <section className="content-card">
              <h2>📝 Application Process</h2>
              <div className="process-steps">
                <div className="process-step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h3>Apply Online</h3>
                    <p>Submit your application through our careers portal</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h3>Initial Screening</h3>
                    <p>Our HR team will review your application and reach out</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h3>Technical Interview</h3>
                    <p>Demonstrate your skills through technical assessments</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h3>Final Interview</h3>
                    <p>Meet with team leads and discuss your fit with our culture</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">5</div>
                  <div className="step-content">
                    <h3>Welcome Aboard</h3>
                    <p>Join our team and start making an impact!</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="content-card cta-section">
              <h2>🚀 Ready to Make an Impact?</h2>
              <p>Join us in our mission to democratize education and transform lives</p>
              <div className="cta-buttons">
                <button className="cta-btn primary">View All Jobs</button>
                <button className="cta-btn secondary" onClick={onNavigateHome}>
                  Learn About Us
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;
