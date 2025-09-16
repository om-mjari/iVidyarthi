import React, { useState } from 'react';
import './StudentDashboard.css';

const ContactUs = ({ onNavigateHome, onNavigateLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

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
          <p>Contact Us - We're Here to Help You Succeed</p>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="page-container">
          <div className="page-header">
            <h1>Contact Us</h1>
            <p className="page-description">Get in touch with our team for any questions or support</p>
          </div>

          <div className="content-sections">
            <div className="contact-layout">
              <div className="contact-form-section">
                <section className="content-card">
                  <h2>📧 Send us a Message</h2>
                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="subject">Subject</label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="course">Course Information</option>
                        <option value="technical">Technical Support</option>
                        <option value="enrollment">Enrollment Help</option>
                        <option value="feedback">Feedback</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className="submit-btn">Send Message</button>
                  </form>
                </section>
              </div>

              <div className="contact-info-section">
                <section className="content-card">
                  <h2>📍 Contact Information</h2>
                  <div className="contact-details">
                    <div className="contact-item">
                      <h3>📧 Email</h3>
                      <p>support@ividhyarthi.com</p>
                      <p>info@ividhyarthi.com</p>
                    </div>
                    <div className="contact-item">
                      <h3>📞 Phone</h3>
                      <p>+91 98765 43210</p>
                      <p>+91 87654 32109</p>
                    </div>
                    <div className="contact-item">
                      <h3>🏢 Address</h3>
                      <p>iVidhyarthi Education Hub</p>
                      <p>123 Tech Park, Sector 5</p>
                      <p>Bangalore, Karnataka 560001</p>
                    </div>
                    <div className="contact-item">
                      <h3>🕒 Support Hours</h3>
                      <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p>Saturday: 10:00 AM - 4:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </section>

                <section className="content-card">
                  <h2>🚀 Quick Links</h2>
                  <div className="quick-links">
                    <button onClick={onNavigateHome} className="quick-link-btn">
                      🏠 Browse Courses
                    </button>
                    <button onClick={onNavigateLogin} className="quick-link-btn">
                      👤 Student Login
                    </button>
                    <a href="#faq" className="quick-link-btn">
                      ❓ FAQ
                    </a>
                    <a href="#support" className="quick-link-btn">
                      🛠️ Technical Support
                    </a>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
