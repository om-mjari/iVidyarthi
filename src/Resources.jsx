import React, { useState } from 'react';
import './StudentDashboard.css';

const Resources = ({ onNavigateHome, onNavigateLogin }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Resources', icon: '🔧' },
    { id: 'tools', name: 'Development Tools', icon: '⚒️' },
    { id: 'templates', name: 'Templates', icon: '📋' },
    { id: 'cheatsheets', name: 'Cheat Sheets', icon: '📝' },
    { id: 'datasets', name: 'Datasets', icon: '📊' },
    { id: 'apis', name: 'APIs & SDKs', icon: '🔌' }
  ];

  const resources = [
    {
      title: "React Component Library",
      category: "tools",
      type: "Library",
      downloads: 15420,
      description: "Pre-built React components for faster development",
      tags: ["React", "Components", "UI"],
      link: "#",
      featured: true
    },
    {
      title: "Python Data Analysis Toolkit",
      category: "tools",
      type: "Package",
      downloads: 8930,
      description: "Essential Python libraries and utilities for data analysis",
      tags: ["Python", "Data Science", "Analytics"],
      link: "#"
    },
    {
      title: "Web Development Project Templates",
      category: "templates",
      type: "Templates",
      downloads: 12350,
      description: "Ready-to-use project templates for various web frameworks",
      tags: ["Templates", "Web Dev", "Starter"],
      link: "#"
    },
    {
      title: "JavaScript ES6+ Cheat Sheet",
      category: "cheatsheets",
      type: "PDF",
      downloads: 25670,
      description: "Quick reference for modern JavaScript features and syntax",
      tags: ["JavaScript", "ES6", "Reference"],
      link: "#"
    },
    {
      title: "Machine Learning Datasets Collection",
      category: "datasets",
      type: "Dataset",
      downloads: 9840,
      description: "Curated datasets for machine learning practice and projects",
      tags: ["ML", "Datasets", "Practice"],
      link: "#"
    },
    {
      title: "REST API Testing Collection",
      category: "apis",
      type: "Postman Collection",
      downloads: 6780,
      description: "Pre-configured API tests for common web services",
      tags: ["API", "Testing", "Postman"],
      link: "#"
    },
    {
      title: "CSS Grid & Flexbox Guide",
      category: "cheatsheets",
      type: "Interactive Guide",
      downloads: 18560,
      description: "Visual guide to CSS Grid and Flexbox with examples",
      tags: ["CSS", "Layout", "Grid", "Flexbox"],
      link: "#"
    },
    {
      title: "Mobile App UI Kit",
      category: "templates",
      type: "Design Kit",
      downloads: 7890,
      description: "Complete UI kit for mobile app development",
      tags: ["Mobile", "UI", "Design", "Templates"],
      link: "#"
    }
  ];

  const filteredResources = selectedCategory === 'all' 
    ? resources 
    : resources.filter(resource => resource.category === selectedCategory);

  const toolCategories = [
    {
      title: "Development Tools",
      description: "IDEs, editors, and development utilities",
      tools: ["VS Code Extensions", "Git Workflows", "Docker Containers", "CI/CD Pipelines"]
    },
    {
      title: "Design Resources",
      description: "UI/UX tools and design assets",
      tools: ["Figma Templates", "Icon Libraries", "Color Palettes", "Typography Guides"]
    },
    {
      title: "Learning Materials",
      description: "Study guides and reference materials",
      tools: ["Cheat Sheets", "Quick References", "Code Snippets", "Best Practices"]
    },
    {
      title: "Project Assets",
      description: "Ready-to-use project components",
      tools: ["Starter Templates", "Code Libraries", "Sample Projects", "Boilerplates"]
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
          <p>Resources - Tools, Templates, and Assets for Developers</p>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="page-container">
          <div className="page-header">
            <h1>Developer Resources</h1>
            <p className="page-description">Access a comprehensive collection of tools, templates, and resources to accelerate your development</p>
          </div>

          <div className="content-sections">
            <section className="content-card">
              <h2>🎯 Resource Hub</h2>
              <p>
                Our resource hub provides developers with essential tools, templates, cheat sheets, 
                and datasets to streamline development workflows. All resources are carefully curated 
                and regularly updated by our expert team.
              </p>
            </section>

            <section className="content-card">
              <h2>📂 Resource Categories</h2>
              <div className="resource-categories">
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
              <h2>🔧 Available Resources</h2>
              <div className="resources-grid">
                {filteredResources.map((resource, index) => (
                  <div key={index} className="resource-card">
                    <div className="resource-header">
                      <div className="resource-type">{resource.type}</div>
                      {resource.featured && <span className="featured-badge">Featured</span>}
                    </div>
                    <div className="resource-content">
                      <h3>{resource.title}</h3>
                      <p>{resource.description}</p>
                      
                      <div className="resource-tags">
                        {resource.tags.map((tag, idx) => (
                          <span key={idx} className="resource-tag">{tag}</span>
                        ))}
                      </div>

                      <div className="resource-stats">
                        <span>📥 {resource.downloads.toLocaleString()} downloads</span>
                      </div>

                      <div className="resource-actions">
                        <button className="download-resource-btn">Download</button>
                        <button className="view-resource-btn">View Details</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="content-card">
              <h2>🛠️ Tool Categories</h2>
              <div className="tool-categories-grid">
                {toolCategories.map((category, index) => (
                  <div key={index} className="tool-category-card">
                    <h3>{category.title}</h3>
                    <p>{category.description}</p>
                    <ul>
                      {category.tools.map((tool, idx) => (
                        <li key={idx}>{tool}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section className="content-card">
              <h2>📊 Resource Statistics</h2>
              <div className="stats-container">
                <div className="stat-card">
                  <h3>500+</h3>
                  <p>Resources Available</p>
                </div>
                <div className="stat-card">
                  <h3>100K+</h3>
                  <p>Total Downloads</p>
                </div>
                <div className="stat-card">
                  <h3>50+</h3>
                  <p>Categories</p>
                </div>
                <div className="stat-card">
                  <h3>Weekly</h3>
                  <p>New Additions</p>
                </div>
              </div>
            </section>

            <section className="content-card">
              <h2>💡 How to Use Resources</h2>
              <div className="usage-tips">
                <div className="tip-item">
                  <h3>🔍 Browse & Search</h3>
                  <p>Use categories and search to find exactly what you need</p>
                </div>
                <div className="tip-item">
                  <h3>📥 Download & Use</h3>
                  <p>Download resources and integrate them into your projects</p>
                </div>
                <div className="tip-item">
                  <h3>⭐ Rate & Review</h3>
                  <p>Help others by rating and reviewing resources you've used</p>
                </div>
                <div className="tip-item">
                  <h3>🔄 Stay Updated</h3>
                  <p>Check back regularly for new resources and updates</p>
                </div>
              </div>
            </section>

            <section className="content-card cta-section">
              <h2>🚀 Contribute Resources</h2>
              <p>Have a useful tool or template? Share it with the community!</p>
              <div className="cta-buttons">
                <button className="cta-btn primary">Submit Resource</button>
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

export default Resources;
