import React, { useState } from 'react';
import './StudentDashboard.css';

const CourseCatalog = ({ onNavigateHome, onNavigateLogin }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const courses = [
    {
      id: 1,
      name: "React for Beginners",
      instructor: "Abha Ma'am",
      price: 799,
      rating: 4.5,
      category: "frontend",
      duration: "8 weeks",
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Advanced JavaScript",
      instructor: "Abha Ma'am",
      price: 599,
      rating: 4.8,
      category: "frontend",
      duration: "6 weeks",
      level: "Advanced",
      image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Data Structures in C++",
      instructor: "Bhumika Ma'am",
      price: 999,
      rating: 4.2,
      category: "programming",
      duration: "10 weeks",
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      name: "Python Programming",
      instructor: "Rakesh Sir",
      price: 699,
      rating: 4.7,
      category: "programming",
      duration: "8 weeks",
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      name: "Machine Learning Basics",
      instructor: "Rakesh Sir",
      price: 899,
      rating: 4.6,
      category: "ai",
      duration: "12 weeks",
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      name: "Full Stack Development",
      instructor: "Priti Ma'am",
      price: 1499,
      rating: 4.9,
      category: "fullstack",
      duration: "16 weeks",
      level: "Advanced",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Courses', icon: '📚' },
    { id: 'frontend', name: 'Frontend', icon: '🎨' },
    { id: 'programming', name: 'Programming', icon: '💻' },
    { id: 'ai', name: 'AI & ML', icon: '🤖' },
    { id: 'fullstack', name: 'Full Stack', icon: '🔧' }
  ];

  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star filled">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">☆</span>);
    }
    
    return (
      <div className="rating">
        {stars}
        <span className="rating-number">({rating})</span>
      </div>
    );
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
          <p>Course Catalog - Explore Our Comprehensive Learning Programs</p>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="page-container">
          <div className="page-header">
            <h1>Course Catalog</h1>
            <p className="page-description">Discover our wide range of courses designed to advance your career</p>
          </div>

          <div className="content-sections">
            <section className="content-card">
              <h2>📋 Course Categories</h2>
              <div className="category-filters">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <span className="category-icon">{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </div>
            </section>

            <section className="content-card">
              <h2>🎓 Available Courses ({filteredCourses.length})</h2>
              <div className="courses-grid">
                {filteredCourses.map(course => (
                  <div key={course.id} className="course-card">
                    <div className="course-image">
                      <img src={course.image} alt={course.name} />
                      <div className="course-level">{course.level}</div>
                    </div>
                    <div className="course-content">
                      <div className="course-info-row">
                        <h3 className="course-name">{course.name}</h3>
                        <p className="course-instructor">by {course.instructor}</p>
                        <p className="course-duration">Duration: {course.duration}</p>
                      </div>
                      <div className="price-button-row">
                        <div className="course-price">
                          ₹{course.price}
                        </div>
                        <button className="enroll-btn" onClick={onNavigateLogin}>
                          Enroll Now
                        </button>
                      </div>
                      <div className="course-rating">
                        {renderStars(course.rating)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="content-card">
              <h2>🌟 Why Choose Our Courses?</h2>
              <div className="features-grid">
                <div className="feature-item">
                  <h3>👨‍🏫 Expert Instructors</h3>
                  <p>Learn from industry professionals with years of experience</p>
                </div>
                <div className="feature-item">
                  <h3>🎯 Practical Projects</h3>
                  <p>Build real-world projects to enhance your portfolio</p>
                </div>
                <div className="feature-item">
                  <h3>📜 Certificates</h3>
                  <p>Earn recognized certificates upon course completion</p>
                </div>
                <div className="feature-item">
                  <h3>💬 Community Support</h3>
                  <p>Join our active community of learners and mentors</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCatalog;
