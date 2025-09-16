import React, { useState } from 'react';
import './StudentDashboard.css';

const Blog = ({ onNavigateHome, onNavigateLogin }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Posts', icon: '📰' },
    { id: 'technology', name: 'Technology', icon: '💻' },
    { id: 'education', name: 'Education', icon: '🎓' },
    { id: 'career', name: 'Career', icon: '🚀' },
    { id: 'innovation', name: 'Innovation', icon: '💡' }
  ];

  const blogPosts = [
    {
      title: "The Future of Online Education in India",
      excerpt: "Exploring how digital learning is transforming education landscape across the country",
      author: "Dr. Rajesh Kumar",
      date: "March 15, 2024",
      category: "education",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop",
      featured: true
    },
    {
      title: "AI and Machine Learning: Career Opportunities in 2024",
      excerpt: "Discover the most promising career paths in artificial intelligence and machine learning",
      author: "Priya Sharma",
      date: "March 12, 2024",
      category: "career",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop"
    },
    {
      title: "Building Scalable Web Applications with React",
      excerpt: "Best practices and patterns for creating maintainable React applications",
      author: "Vikram Patil",
      date: "March 10, 2024",
      category: "technology",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop"
    },
    {
      title: "Innovation in EdTech: Transforming Learning Experiences",
      excerpt: "How technology is revolutionizing the way we learn and teach",
      author: "Dr. Anita Reddy",
      date: "March 8, 2024",
      category: "innovation",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop"
    },
    {
      title: "Data Science Fundamentals: A Beginner's Guide",
      excerpt: "Everything you need to know to start your journey in data science",
      author: "Suresh Babu",
      date: "March 5, 2024",
      category: "technology",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop"
    },
    {
      title: "Effective Study Techniques for Online Learning",
      excerpt: "Proven strategies to maximize your learning outcomes in digital environments",
      author: "Meera Joshi",
      date: "March 3, 2024",
      category: "education",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop"
    }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPost = blogPosts.find(post => post.featured);

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
          <p>iVidhyarthi Blog - Insights, Tips, and Stories from the World of Education</p>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="page-container">
          <div className="page-header">
            <h1>iVidhyarthi Blog</h1>
            <p className="page-description">Stay updated with the latest trends, insights, and stories from the education and technology world</p>
          </div>

          <div className="content-sections">
            {featuredPost && (
              <section className="content-card featured-post">
                <h2>🌟 Featured Post</h2>
                <div className="featured-post-content">
                  <div className="featured-image">
                    <img src={featuredPost.image} alt={featuredPost.title} />
                  </div>
                  <div className="featured-info">
                    <h3>{featuredPost.title}</h3>
                    <p>{featuredPost.excerpt}</p>
                    <div className="post-meta">
                      <span>👤 {featuredPost.author}</span>
                      <span>📅 {featuredPost.date}</span>
                      <span>⏱️ {featuredPost.readTime}</span>
                    </div>
                    <button className="read-more-btn">Read Full Article</button>
                  </div>
                </div>
              </section>
            )}

            <section className="content-card">
              <h2>📂 Categories</h2>
              <div className="blog-categories">
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
              <h2>📝 Latest Posts</h2>
              <div className="blog-posts-grid">
                {filteredPosts.map((post, index) => (
                  <div key={index} className="blog-post-card">
                    <div className="post-image">
                      <img src={post.image} alt={post.title} />
                      <span className="category-tag">{post.category}</span>
                    </div>
                    <div className="post-content">
                      <h3>{post.title}</h3>
                      <p>{post.excerpt}</p>
                      <div className="post-meta">
                        <div className="meta-row">
                          <span>👤 {post.author}</span>
                          <span>⏱️ {post.readTime}</span>
                        </div>
                        <div className="meta-row">
                          <span>📅 {post.date}</span>
                        </div>
                      </div>
                      <button className="read-article-btn">Read Article</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="content-card">
              <h2>📧 Subscribe to Our Newsletter</h2>
              <p>Get the latest blog posts and educational insights delivered to your inbox</p>
              <div className="newsletter-signup">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="newsletter-input"
                />
                <button className="subscribe-btn">Subscribe</button>
              </div>
            </section>

            <section className="content-card cta-section">
              <h2>✍️ Want to Contribute?</h2>
              <p>Share your knowledge and experiences with our community</p>
              <div className="cta-buttons">
                <button className="cta-btn primary">Write for Us</button>
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

export default Blog;
