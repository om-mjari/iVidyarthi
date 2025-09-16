import React, { useState } from 'react';
import './StudentDashboard.css';

const Documents = ({ onNavigateHome, onNavigateLogin }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Documents', icon: '📄' },
    { id: 'academic', name: 'Academic', icon: '🎓' },
    { id: 'technical', name: 'Technical', icon: '⚙️' },
    { id: 'policy', name: 'Policies', icon: '📋' },
    { id: 'forms', name: 'Forms', icon: '📝' }
  ];

  const documents = [
    {
      title: "Student Handbook 2024",
      category: "academic",
      type: "PDF",
      size: "2.5 MB",
      downloads: 15420,
      description: "Complete guide for students including policies, procedures, and academic guidelines",
      lastUpdated: "March 2024"
    },
    {
      title: "Course Enrollment Form",
      category: "forms",
      type: "PDF",
      size: "150 KB",
      downloads: 8930,
      description: "Official form for course enrollment and registration",
      lastUpdated: "February 2024"
    },
    {
      title: "Technical Requirements Guide",
      category: "technical",
      type: "PDF",
      size: "1.8 MB",
      downloads: 12350,
      description: "System requirements and technical specifications for online courses",
      lastUpdated: "March 2024"
    },
    {
      title: "Privacy Policy",
      category: "policy",
      type: "PDF",
      size: "800 KB",
      downloads: 5670,
      description: "Our commitment to protecting your privacy and personal information",
      lastUpdated: "January 2024"
    },
    {
      title: "Academic Calendar 2024-25",
      category: "academic",
      type: "PDF",
      size: "500 KB",
      downloads: 9840,
      description: "Important dates, deadlines, and academic schedule",
      lastUpdated: "April 2024"
    },
    {
      title: "Certificate Request Form",
      category: "forms",
      type: "PDF",
      size: "200 KB",
      downloads: 6780,
      description: "Form to request official course completion certificates",
      lastUpdated: "February 2024"
    },
    {
      title: "API Documentation",
      category: "technical",
      type: "PDF",
      size: "3.2 MB",
      downloads: 4560,
      description: "Complete API documentation for developers and integrations",
      lastUpdated: "March 2024"
    },
    {
      title: "Terms of Service",
      category: "policy",
      type: "PDF",
      size: "1.1 MB",
      downloads: 7890,
      description: "Terms and conditions for using iVidhyarthi platform",
      lastUpdated: "January 2024"
    }
  ];

  const filteredDocuments = selectedCategory === 'all' 
    ? documents 
    : documents.filter(doc => doc.category === selectedCategory);

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
          <p>Documents - Important Forms, Policies, and Academic Resources</p>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="page-container">
          <div className="page-header">
            <h1>Documents Center</h1>
            <p className="page-description">Access important documents, forms, policies, and academic resources</p>
          </div>

          <div className="content-sections">
            <section className="content-card">
              <h2>📂 Document Categories</h2>
              <div className="document-categories">
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
              <h2>📄 Available Documents</h2>
              <div className="documents-grid">
                {filteredDocuments.map((document, index) => (
                  <div key={index} className="document-card">
                    <div className="document-header">
                      <div className="document-icon">📄</div>
                      <div className="document-type">{document.type}</div>
                    </div>
                    <div className="document-content">
                      <h3>{document.title}</h3>
                      <p>{document.description}</p>
                      
                      <div className="document-meta">
                        <div className="meta-row">
                          <span>📊 Size: {document.size}</span>
                          <span>📥 {document.downloads.toLocaleString()} downloads</span>
                        </div>
                        <div className="meta-row">
                          <span>🗓️ Updated: {document.lastUpdated}</span>
                        </div>
                      </div>

                      <div className="document-actions">
                        <button className="download-btn">Download</button>
                        <button className="preview-btn">Preview</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="content-card">
              <h2>📋 Quick Access</h2>
              <div className="quick-access-grid">
                <div className="quick-access-item">
                  <h3>🎓 For Students</h3>
                  <ul>
                    <li>Student Handbook</li>
                    <li>Enrollment Forms</li>
                    <li>Academic Calendar</li>
                    <li>Certificate Requests</li>
                  </ul>
                </div>
                <div className="quick-access-item">
                  <h3>👨‍🏫 For Instructors</h3>
                  <ul>
                    <li>Teaching Guidelines</li>
                    <li>Course Creation Forms</li>
                    <li>Assessment Templates</li>
                    <li>Technical Resources</li>
                  </ul>
                </div>
                <div className="quick-access-item">
                  <h3>🏢 For Institutions</h3>
                  <ul>
                    <li>Partnership Agreements</li>
                    <li>Integration Guides</li>
                    <li>Bulk Enrollment Forms</li>
                    <li>Reporting Templates</li>
                  </ul>
                </div>
                <div className="quick-access-item">
                  <h3>⚖️ Legal & Policies</h3>
                  <ul>
                    <li>Terms of Service</li>
                    <li>Privacy Policy</li>
                    <li>Refund Policy</li>
                    <li>Code of Conduct</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="content-card">
              <h2>💡 Document Tips</h2>
              <div className="tips-grid">
                <div className="tip-item">
                  <h3>📱 Mobile Friendly</h3>
                  <p>All documents are optimized for viewing on mobile devices</p>
                </div>
                <div className="tip-item">
                  <h3>🔄 Regular Updates</h3>
                  <p>Documents are regularly updated to reflect current policies</p>
                </div>
                <div className="tip-item">
                  <h3>🔍 Search Function</h3>
                  <p>Use browser search (Ctrl+F) to find specific information</p>
                </div>
                <div className="tip-item">
                  <h3>💾 Save Locally</h3>
                  <p>Download important documents for offline access</p>
                </div>
              </div>
            </section>

            <section className="content-card cta-section">
              <h2>📞 Need Help?</h2>
              <p>Can't find the document you're looking for? Contact our support team</p>
              <div className="cta-buttons">
                <button className="cta-btn primary">Contact Support</button>
                <button className="cta-btn secondary" onClick={onNavigateHome}>
                  Back to Home
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
