import React from 'react';
import './StudentDashboard.css';

const Team = ({ onNavigateHome, onNavigateLogin }) => {
  const teamMembers = [
    {
      name: "Dr. Abha Sharma",
      role: "Lead Instructor - React & Frontend",
      experience: "8+ years",
      expertise: "React, JavaScript, UI/UX Design",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Prof. Bhumika Patel",
      role: "Senior Instructor - Backend & Cloud",
      experience: "10+ years",
      expertise: "Node.js, AWS, Database Management",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Rakesh Kumar",
      role: "Data Science & AI Instructor",
      experience: "7+ years",
      expertise: "Python, Machine Learning, Data Analytics",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Priti Singh",
      role: "Full Stack Development Lead",
      experience: "6+ years",
      expertise: "MERN Stack, DevOps, System Design",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Bhavik Shah",
      role: "Database & Backend Specialist",
      experience: "9+ years",
      expertise: "SQL, NoSQL, API Development",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Hardik Mehta",
      role: "Cybersecurity Expert",
      experience: "8+ years",
      expertise: "Network Security, Ethical Hacking",
      image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=300&h=300&fit=crop&crop=face"
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
          <p>Meet Our Expert Team - Passionate Educators & Industry Professionals</p>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="page-container">
          <div className="page-header">
            <h1>Our Expert Team</h1>
            <p className="page-description">Meet the passionate educators and industry professionals who make iVidhyarthi exceptional</p>
          </div>

          <div className="content-sections">
            <section className="content-card">
              <h2>👥 Leadership Message</h2>
              <p>
                Our team consists of experienced educators, industry professionals, and technology experts 
                who are passionate about transforming education. Each member brings unique expertise and 
                a shared commitment to student success.
              </p>
            </section>

            <section className="content-card">
              <h2>🌟 Meet Our Instructors</h2>
              <div className="team-grid">
                {teamMembers.map((member, index) => (
                  <div key={index} className="team-member-card">
                    <div className="member-image">
                      <img src={member.image} alt={member.name} />
                    </div>
                    <div className="member-info">
                      <h3>{member.name}</h3>
                      <p className="member-role">{member.role}</p>
                      <p className="member-experience">Experience: {member.experience}</p>
                      <div className="member-expertise">
                        <strong>Expertise:</strong>
                        <p>{member.expertise}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="content-card">
              <h2>🎯 What Makes Our Team Special</h2>
              <div className="team-qualities">
                <div className="quality-item">
                  <h3>🏆 Industry Experience</h3>
                  <p>All our instructors have extensive real-world experience in their respective fields</p>
                </div>
                <div className="quality-item">
                  <h3>📚 Teaching Excellence</h3>
                  <p>Proven track record of successful student outcomes and positive feedback</p>
                </div>
                <div className="quality-item">
                  <h3>🔄 Continuous Learning</h3>
                  <p>Our team stays updated with the latest industry trends and technologies</p>
                </div>
                <div className="quality-item">
                  <h3>💬 Student-Centric Approach</h3>
                  <p>Dedicated to providing personalized support and guidance to every student</p>
                </div>
              </div>
            </section>

            <section className="content-card cta-section">
              <h2>🤝 Join Our Learning Community</h2>
              <p>Learn from the best and become part of our growing family of successful students</p>
              <div className="cta-buttons">
                <button className="cta-btn primary" onClick={onNavigateHome}>
                  View Courses
                </button>
                <button className="cta-btn secondary" onClick={onNavigateLogin}>
                  Start Learning
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
