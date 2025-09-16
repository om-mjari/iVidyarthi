import React, { useState } from 'react';
import './StudentDashboard.css';

const HelpVideos = ({ onNavigateHome, onNavigateLogin }) => {
  const [selectedCategory, setSelectedCategory] = useState('getting-started');

  const videoCategories = [
    { id: 'getting-started', name: 'Getting Started', icon: '🚀' },
    { id: 'course-navigation', name: 'Course Navigation', icon: '🧭' },
    { id: 'technical-help', name: 'Technical Help', icon: '🛠️' },
    { id: 'assignments', name: 'Assignments & Projects', icon: '📝' },
    { id: 'certificates', name: 'Certificates', icon: '🏆' }
  ];

  const videos = {
    'getting-started': [
      {
        title: "Welcome to iVidhyarthi - Platform Overview",
        duration: "5:30",
        description: "Complete introduction to the iVidhyarthi platform and its features",
        thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop"
      },
      {
        title: "Creating Your Account and Profile Setup",
        duration: "3:45",
        description: "Step-by-step guide to create your account and set up your profile",
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop"
      },
      {
        title: "Enrolling in Your First Course",
        duration: "4:20",
        description: "Learn how to browse, select, and enroll in courses",
        thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=225&fit=crop"
      }
    ],
    'course-navigation': [
      {
        title: "Navigating Course Content",
        duration: "6:15",
        description: "How to access videos, materials, and track your progress",
        thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=225&fit=crop"
      },
      {
        title: "Using the Course Dashboard",
        duration: "4:50",
        description: "Understanding your course dashboard and all its features",
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop"
      },
      {
        title: "Downloading Course Materials",
        duration: "3:30",
        description: "How to download and organize course resources",
        thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=225&fit=crop"
      }
    ],
    'technical-help': [
      {
        title: "Troubleshooting Video Playback Issues",
        duration: "5:00",
        description: "Solutions for common video streaming and playback problems",
        thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=225&fit=crop"
      },
      {
        title: "Browser Compatibility and Settings",
        duration: "4:15",
        description: "Optimizing your browser for the best learning experience",
        thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop"
      },
      {
        title: "Mobile App Usage Guide",
        duration: "6:30",
        description: "How to use iVidhyarthi on mobile devices effectively",
        thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=225&fit=crop"
      }
    ],
    'assignments': [
      {
        title: "Submitting Assignments",
        duration: "7:20",
        description: "Complete guide to submitting assignments and projects",
        thumbnail: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=225&fit=crop"
      },
      {
        title: "Understanding Assignment Feedback",
        duration: "5:45",
        description: "How to interpret and use instructor feedback effectively",
        thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=225&fit=crop"
      },
      {
        title: "Project Collaboration Tools",
        duration: "8:10",
        description: "Using collaboration features for group projects",
        thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=225&fit=crop"
      }
    ],
    'certificates': [
      {
        title: "Earning Your Certificate",
        duration: "4:30",
        description: "Requirements and process for earning course certificates",
        thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=225&fit=crop"
      },
      {
        title: "Downloading and Sharing Certificates",
        duration: "3:15",
        description: "How to download and share your certificates on LinkedIn",
        thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=225&fit=crop"
      },
      {
        title: "Certificate Verification Process",
        duration: "2:45",
        description: "Understanding certificate authenticity and verification",
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop"
      }
    ]
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
          <p>Help Videos - Step-by-Step Guides to Master the Platform</p>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="page-container">
          <div className="page-header">
            <h1>Help Videos</h1>
            <p className="page-description">Watch our comprehensive video tutorials to get the most out of iVidhyarthi</p>
          </div>

          <div className="content-sections">
            <section className="content-card">
              <h2>📹 Video Categories</h2>
              <div className="video-categories">
                {videoCategories.map(category => (
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
              <h2>🎬 {videoCategories.find(cat => cat.id === selectedCategory)?.name} Videos</h2>
              <div className="videos-grid">
                {videos[selectedCategory]?.map((video, index) => (
                  <div key={index} className="video-card">
                    <div className="video-thumbnail">
                      <img src={video.thumbnail} alt={video.title} />
                      <div className="play-button">▶️</div>
                      <div className="video-duration">{video.duration}</div>
                    </div>
                    <div className="video-info">
                      <h3>{video.title}</h3>
                      <p>{video.description}</p>
                      <button className="watch-video-btn">Watch Video</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="content-card">
              <h2>💡 Quick Tips</h2>
              <div className="tips-grid">
                <div className="tip-item">
                  <h3>🎯 Start with Basics</h3>
                  <p>Begin with "Getting Started" videos if you're new to the platform</p>
                </div>
                <div className="tip-item">
                  <h3>📱 Mobile Friendly</h3>
                  <p>All videos are optimized for viewing on mobile devices</p>
                </div>
                <div className="tip-item">
                  <h3>🔄 Replay Anytime</h3>
                  <p>Watch videos multiple times to master each feature</p>
                </div>
                <div className="tip-item">
                  <h3>💬 Get Support</h3>
                  <p>Contact support if you need additional help after watching videos</p>
                </div>
              </div>
            </section>

            <section className="content-card cta-section">
              <h2>🚀 Ready to Start Learning?</h2>
              <p>Watch the videos and then dive into our amazing courses!</p>
              <div className="cta-buttons">
                <button className="cta-btn primary" onClick={onNavigateHome}>
                  Browse Courses
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

export default HelpVideos;
