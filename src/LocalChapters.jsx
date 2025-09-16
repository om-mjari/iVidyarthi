import React from 'react';
import './StudentDashboard.css';

const LocalChapters = ({ onNavigateHome, onNavigateLogin }) => {
  const chapters = [
    {
      city: "Mumbai",
      coordinator: "Dr. Priya Sharma",
      members: 250,
      email: "mumbai@ividhyarthi.com",
      phone: "+91 98765 11111",
      address: "Tech Hub, Bandra West, Mumbai - 400050"
    },
    {
      city: "Delhi",
      coordinator: "Prof. Rajesh Kumar",
      members: 180,
      email: "delhi@ividhyarthi.com",
      phone: "+91 98765 22222",
      address: "Education Center, Connaught Place, New Delhi - 110001"
    },
    {
      city: "Bangalore",
      coordinator: "Ms. Anita Reddy",
      members: 320,
      email: "bangalore@ividhyarthi.com",
      phone: "+91 98765 33333",
      address: "Innovation Hub, Koramangala, Bangalore - 560034"
    },
    {
      city: "Hyderabad",
      coordinator: "Dr. Suresh Babu",
      members: 150,
      email: "hyderabad@ividhyarthi.com",
      phone: "+91 98765 44444",
      address: "Tech Valley, HITEC City, Hyderabad - 500081"
    },
    {
      city: "Chennai",
      coordinator: "Prof. Lakshmi Devi",
      members: 200,
      email: "chennai@ividhyarthi.com",
      phone: "+91 98765 55555",
      address: "Learning Center, T. Nagar, Chennai - 600017"
    },
    {
      city: "Pune",
      coordinator: "Mr. Vikram Patil",
      members: 140,
      email: "pune@ividhyarthi.com",
      phone: "+91 98765 66666",
      address: "Education Hub, Hinjewadi, Pune - 411057"
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
          <p>Local Chapters - Connect with Learning Communities Near You</p>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="page-container">
          <div className="page-header">
            <h1>Local Chapters</h1>
            <p className="page-description">Join our local learning communities and connect with fellow students in your city</p>
          </div>

          <div className="content-sections">
            <section className="content-card">
              <h2>🌍 About Local Chapters</h2>
              <p>
                Our local chapters provide opportunities for students to connect, collaborate, and learn together 
                in their cities. Each chapter organizes regular meetups, workshops, and networking events to 
                enhance the learning experience beyond online courses.
              </p>
            </section>

            <section className="content-card">
              <h2>📍 Find Your Local Chapter</h2>
              <div className="chapters-grid">
                {chapters.map((chapter, index) => (
                  <div key={index} className="chapter-card">
                    <div className="chapter-header">
                      <h3>🏙️ {chapter.city}</h3>
                      <span className="member-count">{chapter.members} Members</span>
                    </div>
                    <div className="chapter-info">
                      <div className="info-item">
                        <strong>👤 Coordinator:</strong>
                        <p>{chapter.coordinator}</p>
                      </div>
                      <div className="info-item">
                        <strong>📧 Email:</strong>
                        <p>{chapter.email}</p>
                      </div>
                      <div className="info-item">
                        <strong>📞 Phone:</strong>
                        <p>{chapter.phone}</p>
                      </div>
                      <div className="info-item">
                        <strong>📍 Address:</strong>
                        <p>{chapter.address}</p>
                      </div>
                    </div>
                    <button className="join-chapter-btn">Join Chapter</button>
                  </div>
                ))}
              </div>
            </section>

            <section className="content-card">
              <h2>🎯 Chapter Activities</h2>
              <div className="activities-grid">
                <div className="activity-item">
                  <h3>🤝 Monthly Meetups</h3>
                  <p>Regular in-person meetings to discuss courses, share experiences, and network</p>
                </div>
                <div className="activity-item">
                  <h3>🛠️ Hands-on Workshops</h3>
                  <p>Practical workshops on trending technologies and industry best practices</p>
                </div>
                <div className="activity-item">
                  <h3>💼 Career Guidance</h3>
                  <p>Resume reviews, interview preparation, and career counseling sessions</p>
                </div>
                <div className="activity-item">
                  <h3>🏆 Coding Competitions</h3>
                  <p>Local coding contests and hackathons to test and improve skills</p>
                </div>
              </div>
            </section>

            <section className="content-card">
              <h2>🚀 Start a New Chapter</h2>
              <p>
                Don't see your city listed? Help us expand by starting a new chapter in your area! 
                We provide all the resources and support needed to establish a successful local community.
              </p>
              <div className="start-chapter-info">
                <h3>Requirements to Start a Chapter:</h3>
                <ul>
                  <li>Minimum 10 interested members in your city</li>
                  <li>A dedicated coordinator to organize events</li>
                  <li>Venue for monthly meetups</li>
                  <li>Commitment to regular activities</li>
                </ul>
                <button className="cta-btn primary">Apply to Start Chapter</button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalChapters;
