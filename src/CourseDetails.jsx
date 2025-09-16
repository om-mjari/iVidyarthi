import React, { useEffect, useState } from 'react';
import './CourseDetails.css';

const CourseDetails = ({ onBack, onPay }) => {
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem('selected_course');
    try { setCourse(raw ? JSON.parse(raw) : null); } catch { setCourse(null); }
  }, []);

  if (!course) {
    return (
      <div className="course-details-wrap">
        <div className="course-details-card">
          <p>Course not found.</p>
          <button className="btn-secondary" onClick={onBack}>Back to Dashboard</button>
        </div>
      </div>
    );
  }

  return (
    <div className="course-details-wrap">
      <div className="course-hero">
        <img src={course.image} alt={course.name} />
        <div className="course-hero-overlay">
          <h1>{course.name}</h1>
          <p>by {course.instructor}</p>
        </div>
      </div>

      <div className="course-details-content">
        <div className="course-main">
          <div className="course-info">
            <div className="price">₹{course.price}</div>
            <div className="rating">⭐ {course.rating}</div>
          </div>

          <div className="course-main-inner">
            <div className="course-cover">
              <img src={course.image} alt={course.name} />
            </div>
            <div className="course-text">
              <p className="course-description">
                This course provides a comprehensive, hands-on curriculum designed to take you from fundamentals to practical mastery. Expect engaging lessons, real-world projects, and clear guidance throughout your learning journey.
              </p>
              <ul className="highlights">
                <li>Lifetime access and updates</li>
                <li>Real projects and assignments</li>
                <li>Certificate of completion</li>
                <li>Mentor Q&A support</li>
                <li>Interactive coding exercises</li>
                <li>Community forum access</li>
                <li>Mobile app compatibility</li>
                <li>Progress tracking dashboard</li>
              </ul>
              
              <div className="course-curriculum">
                <h3>What You'll Learn</h3>
                <div className="curriculum-items">
                  <div className="curriculum-item">
                    <span className="item-number">1</span>
                    <div className="item-content">
                      <h4>Fundamentals & Setup</h4>
                      <p>Get started with the basics and set up your development environment</p>
                    </div>
                  </div>
                  <div className="curriculum-item">
                    <span className="item-number">2</span>
                    <div className="item-content">
                      <h4>Core Concepts</h4>
                      <p>Master the essential concepts and best practices</p>
                    </div>
                  </div>
                  <div className="curriculum-item">
                    <span className="item-number">3</span>
                    <div className="item-content">
                      <h4>Advanced Topics</h4>
                      <p>Dive deep into advanced techniques and real-world applications</p>
                    </div>
                  </div>
                  <div className="curriculum-item">
                    <span className="item-number">4</span>
                    <div className="item-content">
                      <h4>Final Project</h4>
                      <p>Build a complete project to showcase your skills</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="instructor-info">
                <h3>About Your Instructor</h3>
                <div className="instructor-card">
                  <div className="instructor-avatar">
                    {course.instructor.charAt(0)}
                  </div>
                  <div className="instructor-details">
                    <h4>{course.instructor}</h4>
                    <p>Expert instructor with 5+ years of experience in the field. Passionate about teaching and helping students achieve their goals.</p>
                    <div className="instructor-stats">
                      <span>⭐ 4.8 Rating</span>
                      <span>👥 10,000+ Students</span>
                      <span>🎓 50+ Courses</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="course-aside">
          <div className="cta-card">
            <div className="price-lg">₹{course.price}</div>
            <button className="btn-primary" onClick={() => onPay && onPay(course)}>Enroll Now</button>
            <button className="btn-secondary" onClick={onBack}>Back to Dashboard</button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CourseDetails;
