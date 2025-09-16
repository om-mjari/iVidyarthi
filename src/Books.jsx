import React, { useState } from 'react';
import './StudentDashboard.css';

const Books = ({ onNavigateHome, onNavigateLogin }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Books', icon: '📚' },
    { id: 'programming', name: 'Programming', icon: '💻' },
    { id: 'data-science', name: 'Data Science', icon: '📊' },
    { id: 'web-dev', name: 'Web Development', icon: '🌐' },
    { id: 'mobile', name: 'Mobile Development', icon: '📱' },
    { id: 'ai-ml', name: 'AI & Machine Learning', icon: '🤖' }
  ];

  const books = [
    {
      title: "Complete Guide to React Development",
      author: "Dr. Rajesh Kumar",
      category: "web-dev",
      price: "₹899",
      originalPrice: "₹1299",
      rating: 4.8,
      reviews: 245,
      pages: 450,
      format: "PDF + ePub",
      description: "Master React from basics to advanced concepts with practical projects",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=400&fit=crop",
      bestseller: true
    },
    {
      title: "Python for Data Science Handbook",
      author: "Priya Sharma",
      category: "data-science",
      price: "₹1199",
      originalPrice: "₹1599",
      rating: 4.9,
      reviews: 189,
      pages: 520,
      format: "PDF + Code",
      description: "Comprehensive guide to data analysis and visualization with Python",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=400&fit=crop"
    },
    {
      title: "JavaScript: The Complete Reference",
      author: "Vikram Patil",
      category: "programming",
      price: "₹799",
      originalPrice: "₹1199",
      rating: 4.7,
      reviews: 312,
      pages: 380,
      format: "PDF",
      description: "Everything you need to know about modern JavaScript development",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300&h=400&fit=crop"
    },
    {
      title: "Machine Learning Algorithms Explained",
      author: "Dr. Anita Reddy",
      category: "ai-ml",
      price: "₹1399",
      originalPrice: "₹1899",
      rating: 4.8,
      reviews: 156,
      pages: 600,
      format: "PDF + Jupyter Notebooks",
      description: "Deep dive into ML algorithms with practical implementations",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=400&fit=crop",
      newRelease: true
    },
    {
      title: "Flutter Mobile App Development",
      author: "Suresh Babu",
      category: "mobile",
      price: "₹999",
      originalPrice: "₹1399",
      rating: 4.6,
      reviews: 98,
      pages: 420,
      format: "PDF + Source Code",
      description: "Build beautiful cross-platform mobile apps with Flutter",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=400&fit=crop"
    },
    {
      title: "Full Stack Web Development Guide",
      author: "Meera Joshi",
      category: "web-dev",
      price: "₹1099",
      originalPrice: "₹1499",
      rating: 4.7,
      reviews: 203,
      pages: 480,
      format: "PDF + Video Tutorials",
      description: "Complete guide to modern full-stack web development",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=400&fit=crop"
    }
  ];

  const filteredBooks = selectedCategory === 'all' 
    ? books 
    : books.filter(book => book.category === selectedCategory);

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
          <p>Books - Comprehensive Learning Resources by Industry Experts</p>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="page-container">
          <div className="page-header">
            <h1>Digital Library</h1>
            <p className="page-description">Expand your knowledge with our collection of expert-authored technical books</p>
          </div>

          <div className="content-sections">
            <section className="content-card">
              <h2>📖 Why Choose Our Books?</h2>
              <p>
                Our digital library features books written by industry experts and experienced educators. 
                Each book is carefully crafted to provide practical knowledge, real-world examples, 
                and hands-on exercises to accelerate your learning journey.
              </p>
            </section>

            <section className="content-card">
              <h2>📂 Book Categories</h2>
              <div className="book-categories">
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
              <h2>📚 Featured Books</h2>
              <div className="books-grid">
                {filteredBooks.map((book, index) => (
                  <div key={index} className="book-card">
                    <div className="book-image">
                      <img src={book.image} alt={book.title} />
                      {book.bestseller && <span className="badge bestseller">Bestseller</span>}
                      {book.newRelease && <span className="badge new-release">New Release</span>}
                    </div>
                    <div className="book-content">
                      <h3>{book.title}</h3>
                      <p className="book-author">by {book.author}</p>
                      <p className="book-description">{book.description}</p>
                      
                      <div className="book-details">
                        <div className="detail-row">
                          <span>📄 {book.pages} pages</span>
                          <span>📱 {book.format}</span>
                        </div>
                        <div className="detail-row">
                          <span className="rating">⭐ {book.rating}</span>
                          <span>({book.reviews} reviews)</span>
                        </div>
                      </div>

                      <div className="book-pricing">
                        <span className="current-price">{book.price}</span>
                        <span className="original-price">{book.originalPrice}</span>
                        <span className="discount">
                          {Math.round((1 - parseInt(book.price.slice(1)) / parseInt(book.originalPrice.slice(1))) * 100)}% OFF
                        </span>
                      </div>

                      <div className="book-actions">
                        <button className="buy-book-btn">Buy Now</button>
                        <button className="preview-book-btn">Preview</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="content-card">
              <h2>🎁 Book Benefits</h2>
              <div className="benefits-grid">
                <div className="benefit-item">
                  <div className="benefit-icon">📱</div>
                  <h3>Multi-Format Access</h3>
                  <p>Read on any device with PDF, ePub, and mobile-optimized formats</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">💾</div>
                  <h3>Downloadable Content</h3>
                  <p>Download source code, datasets, and additional resources</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">🔄</div>
                  <h3>Lifetime Updates</h3>
                  <p>Get free updates when new editions are released</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">💬</div>
                  <h3>Author Support</h3>
                  <p>Direct access to authors for questions and clarifications</p>
                </div>
              </div>
            </section>

            <section className="content-card">
              <h2>📊 Library Statistics</h2>
              <div className="stats-container">
                <div className="stat-card">
                  <h3>150+</h3>
                  <p>Books Available</p>
                </div>
                <div className="stat-card">
                  <h3>50+</h3>
                  <p>Expert Authors</p>
                </div>
                <div className="stat-card">
                  <h3>25,000+</h3>
                  <p>Books Sold</p>
                </div>
                <div className="stat-card">
                  <h3>4.7/5</h3>
                  <p>Average Rating</p>
                </div>
              </div>
            </section>

            <section className="content-card cta-section">
              <h2>📚 Start Your Learning Journey</h2>
              <p>Invest in your future with our comprehensive collection of technical books</p>
              <div className="cta-buttons">
                <button className="cta-btn primary">Browse All Books</button>
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

export default Books;
