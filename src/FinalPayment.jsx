import React, { useEffect, useState } from 'react';
import './Payment.css';

export default function FinalPayment({ onComplete }) {
  const [course, setCourse] = useState(null);
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    try { 
      setCourse(JSON.parse(localStorage.getItem('selected_course')) || null);
      // Generate a random order ID
      setOrderId('ORD' + Date.now().toString().slice(-8));
    } catch { 
      setCourse(null); 
    }
  }, []);

  const handleContinue = () => {
    onComplete?.();
  };

  if (!course) {
    return (
      <div className="pay-wrap">
        <div className="pay-card">
          <p>No course information found.</p>
          <button className="btn-primary" onClick={handleContinue}>Continue</button>
        </div>
      </div>
    );
  }

  return (
    <div className="pay-wrap">
      <div className="pay-container">
        <div className="pay-left">
          <div className="success-section">
            <div className="success-icon">✅</div>
            <h2>Payment Successful!</h2>
            <p className="success-message">Your payment has been processed successfully. Welcome to your new course!</p>
            
            <div className="order-details">
              <h3>Order Details</h3>
              <div className="detail-row">
                <span>Order ID:</span>
                <strong>{orderId}</strong>
              </div>
              <div className="detail-row">
                <span>Course:</span>
                <strong>{course.name}</strong>
              </div>
              <div className="detail-row">
                <span>Amount Paid:</span>
                <strong>₹{course.price + Math.round(course.price * 0.18)}</strong>
              </div>
              <div className="detail-row">
                <span>Date:</span>
                <strong>{new Date().toLocaleDateString()}</strong>
              </div>
            </div>

            <div className="next-steps">
              <h3>What's Next?</h3>
              <ul>
                <li>Check your email for course access details</li>
                <li>Log in to your learning dashboard</li>
                <li>Start your learning journey today!</li>
              </ul>
            </div>

            <button className="btn-primary" onClick={handleContinue}>
              Continue to Dashboard
            </button>
          </div>
        </div>

        <aside className="pay-right">
          <div className="summary">
            <img src={course.image} alt={course.name} />
            <div className="title">{course.name}</div>
            <div className="row-line"><span>Base Price</span><b>₹{course.price}</b></div>
            <div className="row-line"><span>GST (18%)</span><b>₹{Math.round(course.price * 0.18)}</b></div>
            <div className="divider" />
            <div className="row-line total"><span>Total Paid</span><b>₹{course.price + Math.round(course.price * 0.18)}</b></div>
            <div className="status-badge success">✅ Payment Complete</div>
          </div>
        </aside>
      </div>
    </div>
  );
}
