import React from 'react';
import './StudentDashboard.css';

const CertificationCourses = ({ onNavigateHome, onNavigateLogin }) => {
  const certifications = [
    {
      title: "Full Stack Web Development Certification",
      provider: "iVidhyarthi",
      duration: "6 months",
      level: "Intermediate",
      price: "₹15,999",
      rating: 4.8,
      students: 2500,
      skills: ["React", "Node.js", "MongoDB", "Express", "JavaScript"],
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop"
    },
    {
      title: "Data Science & Machine Learning Certification",
      provider: "iVidhyarthi",
      duration: "8 months",
      level: "Advanced",
      price: "₹19,999",
      rating: 4.9,
      students: 1800,
      skills: ["Python", "TensorFlow", "Pandas", "Scikit-learn", "SQL"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop"
    },
    {
      title: "Digital Marketing Certification",
      provider: "iVidhyarthi",
      duration: "4 months",
      level: "Beginner",
      price: "₹12,999",
      rating: 4.7,
      students: 3200,
      skills: ["SEO", "Social Media", "Google Ads", "Analytics", "Content Marketing"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop"
    },
    {
      title: "Cloud Computing (AWS) Certification",
      provider: "iVidhyarthi",
      duration: "5 months",
      level: "Intermediate",
      price: "₹17,999",
      rating: 4.8,
      students: 1500,
      skills: ["AWS", "Docker", "Kubernetes", "DevOps", "Linux"],
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop"
    },
    {
      title: "Mobile App Development Certification",
      provider: "iVidhyarthi",
      duration: "6 months",
      level: "Intermediate",
      price: "₹16,999",
      rating: 4.6,
      students: 2100,
      skills: ["React Native", "Flutter", "iOS", "Android", "Firebase"],
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop"
    },
    {
      title: "Cybersecurity Fundamentals Certification",
      provider: "iVidhyarthi",
      duration: "4 months",
      level: "Beginner",
      price: "₹14,999",
      rating: 4.7,
      students: 1200,
      skills: ["Network Security", "Ethical Hacking", "Risk Assessment", "Compliance", "Incident Response"],
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop"
    }
  ];

  const benefits = [
    {
      icon: "🏆",
      title: "Industry Recognition",
      description: "Certificates recognized by top companies and industry leaders"
    },
    {
      icon: "💼",
      title: "Career Advancement",
      description: "Boost your career prospects with verified skills and knowledge"
    },
    {
      icon: "🎯",
      title: "Practical Projects",
      description: "Build real-world projects to showcase in your portfolio"
    },
    {
      icon: "👨‍🏫",
      title: "Expert Mentorship",
      description: "Learn from industry experts and experienced professionals"
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
          <p>Certification Courses - Industry-Recognized Programs for Career Growth</p>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="page-container">
          <div className="page-header">
            <h1>Certification Courses</h1>
            <p className="page-description">Advance your career with industry-recognized certification programs</p>
          </div>

          <div className="content-sections">
            <section className="content-card">
              <h2>🎓 Why Choose Our Certifications?</h2>
              <p>
                Our certification courses are designed in collaboration with industry experts to ensure 
                you gain practical, job-ready skills. Each program includes hands-on projects, 
                real-world case studies, and direct mentorship from professionals working in the field.
              </p>
            </section>

            <section className="content-card">
              <h2>🌟 Certification Benefits</h2>
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
              <h2>📚 Available Certifications</h2>
              <div className="certifications-grid">
                {certifications.map((cert, index) => (
                  <div key={index} className="certification-card">
                    <div className="cert-image">
                      <img src={cert.image} alt={cert.title} />
                      <span className={`level-badge ${cert.level.toLowerCase()}`}>
                        {cert.level}
                      </span>
                    </div>
                    <div className="cert-content">
                      <h3>{cert.title}</h3>
                      <p className="cert-provider">by {cert.provider}</p>
                      
                      <div className="cert-stats">
                        <div className="stat-item">
                          <span className="rating">⭐ {cert.rating}</span>
                          <span className="students">👥 {cert.students.toLocaleString()}</span>
                        </div>
                        <div className="stat-item">
                          <span className="duration">⏱️ {cert.duration}</span>
                          <span className="price">{cert.price}</span>
                        </div>
                      </div>

                      <div className="skills-section">
                        <h4>Skills you'll learn:</h4>
                        <div className="skills-tags">
                          {cert.skills.map((skill, idx) => (
                            <span key={idx} className="skill-tag">{skill}</span>
                          ))}
                        </div>
                      </div>

                      <div className="cert-actions">
                        <button className="enroll-cert-btn">Enroll Now</button>
                        <button className="learn-more-cert-btn">Learn More</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="content-card">
              <h2>📊 Success Statistics</h2>
              <div className="stats-container">
                <div className="stat-card">
                  <h3>12,000+</h3>
                  <p>Students Certified</p>
                </div>
                <div className="stat-card">
                  <h3>85%</h3>
                  <p>Job Placement Rate</p>
                </div>
                <div className="stat-card">
                  <h3>500+</h3>
                  <p>Partner Companies</p>
                </div>
                <div className="stat-card">
                  <h3>4.8/5</h3>
                  <p>Average Rating</p>
                </div>
              </div>
            </section>

            <section className="content-card">
              <h2>🎯 Certification Process</h2>
              <div className="process-steps">
                <div className="process-step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h3>Enroll</h3>
                    <p>Choose your certification program and complete enrollment</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h3>Learn</h3>
                    <p>Complete coursework, projects, and assessments</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h3>Assess</h3>
                    <p>Pass final examination and project evaluation</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h3>Certify</h3>
                    <p>Receive your industry-recognized certificate</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="content-card cta-section">
              <h2>🚀 Ready to Get Certified?</h2>
              <p>Take the next step in your career with our industry-recognized certification programs</p>
              <div className="cta-buttons">
                <button className="cta-btn primary">Browse Certifications</button>
                <button className="cta-btn secondary" onClick={onNavigateHome}>
                  Explore All Courses
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationCourses;
