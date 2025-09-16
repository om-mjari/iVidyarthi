import React, { useState } from 'react';
import './StudentDashboard.css';

const FAQ = ({ onNavigateHome, onNavigateLogin }) => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const faqCategories = [
    { id: 'general', name: 'General FAQ', icon: '❓' },
    { id: 'course', name: 'Course FAQ', icon: '📚' },
    { id: 'technical', name: 'Technical Support', icon: '🛠️' },
    { id: 'enrollment', name: 'Enrollment FAQ', icon: '📝' }
  ];

  const faqs = {
    general: [
      {
        question: "What is iVidhyarthi?",
        answer: "iVidhyarthi is an online learning platform that provides high-quality courses in programming, web development, data science, and other technology fields. We aim to make quality education accessible to everyone."
      },
      {
        question: "How do I get started?",
        answer: "Simply create an account, browse our course catalog, and enroll in the courses that interest you. You can start learning immediately after enrollment."
      },
      {
        question: "Are the courses self-paced?",
        answer: "Yes, most of our courses are self-paced, allowing you to learn at your own speed. However, some courses may have specific deadlines for assignments and projects."
      },
      {
        question: "Do I get a certificate after completion?",
        answer: "Yes, you will receive a certificate of completion for each course you successfully finish. These certificates can be shared on your LinkedIn profile and resume."
      }
    ],
    course: [
      {
        question: "What programming languages do you teach?",
        answer: "We offer courses in JavaScript, Python, C++, Java, React, Node.js, and many other popular programming languages and frameworks."
      },
      {
        question: "Are there prerequisites for courses?",
        answer: "Prerequisites vary by course. Beginner courses typically have no prerequisites, while advanced courses may require prior knowledge. Check individual course descriptions for specific requirements."
      },
      {
        question: "How long are the courses?",
        answer: "Course duration varies from 4 weeks to 16 weeks, depending on the complexity and depth of the subject matter. Each course page shows the estimated duration."
      },
      {
        question: "Can I access course materials after completion?",
        answer: "Yes, you have lifetime access to all course materials, including videos, assignments, and resources, even after completing the course."
      }
    ],
    technical: [
      {
        question: "What devices can I use to access courses?",
        answer: "Our platform is accessible on desktop computers, laptops, tablets, and smartphones. We recommend using a desktop or laptop for the best coding experience."
      },
      {
        question: "Do I need special software?",
        answer: "Most courses can be completed using a web browser. For programming courses, we'll guide you through installing necessary software like code editors and development tools."
      },
      {
        question: "What if I encounter technical issues?",
        answer: "Our technical support team is available to help. You can contact us through the support portal, email, or live chat during business hours."
      },
      {
        question: "Is there a mobile app?",
        answer: "Currently, we offer a responsive web platform that works well on mobile devices. A dedicated mobile app is in development and will be available soon."
      }
    ],
    enrollment: [
      {
        question: "How do I enroll in a course?",
        answer: "Create an account, browse our course catalog, select your desired course, and click 'Enroll Now'. You can pay securely using various payment methods."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept credit cards, debit cards, UPI, net banking, and digital wallets. All payments are processed securely through encrypted channels."
      },
      {
        question: "Can I get a refund?",
        answer: "Yes, we offer a 7-day money-back guarantee. If you're not satisfied with a course within the first 7 days, you can request a full refund."
      },
      {
        question: "Are there any discounts available?",
        answer: "We regularly offer discounts and promotions. Students can also avail of special pricing. Check our website or subscribe to our newsletter for current offers."
      }
    ]
  };

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
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
          <p>Frequently Asked Questions - Find Answers to Common Questions</p>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="page-container">
          <div className="page-header">
            <h1>Frequently Asked Questions</h1>
            <p className="page-description">Get quick answers to the most common questions about iVidhyarthi</p>
          </div>

          <div className="content-sections">
            <section className="content-card">
              <h2>📋 FAQ Categories</h2>
              <div className="faq-categories">
                {faqCategories.map(category => (
                  <button
                    key={category.id}
                    className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <span className="category-icon">{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </div>
            </section>

            <section className="content-card">
              <h2>❓ {faqCategories.find(cat => cat.id === activeCategory)?.name}</h2>
              <div className="faq-list">
                {faqs[activeCategory]?.map((faq, index) => (
                  <div key={index} className="faq-item">
                    <button
                      className={`faq-question ${expandedFAQ === index ? 'expanded' : ''}`}
                      onClick={() => toggleFAQ(index)}
                    >
                      <span>{faq.question}</span>
                      <span className="faq-arrow">{expandedFAQ === index ? '−' : '+'}</span>
                    </button>
                    {expandedFAQ === index && (
                      <div className="faq-answer">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section className="content-card">
              <h2>🤝 Still Need Help?</h2>
              <p>Can't find the answer you're looking for? Our support team is here to help!</p>
              <div className="help-options">
                <div className="help-option">
                  <h3>📧 Email Support</h3>
                  <p>Send us an email at support@ividhyarthi.com</p>
                </div>
                <div className="help-option">
                  <h3>💬 Live Chat</h3>
                  <p>Chat with our support team during business hours</p>
                </div>
                <div className="help-option">
                  <h3>📞 Phone Support</h3>
                  <p>Call us at +91 98765 43210</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
