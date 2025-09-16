import React, { useEffect, useMemo, useState } from 'react';
import './Payment.css';

export default function PaymentGateway({ method = 'card', onBack, onComplete }) {
  const [processing, setProcessing] = useState(false);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    try { setCourse(JSON.parse(localStorage.getItem('selected_course')) || null); } catch { setCourse(null); }
  }, []);

  const taxes = useMemo(() => Math.round((course?.price || 0) * 0.18), [course]);
  const total = useMemo(() => (course?.price || 0) + taxes, [course, taxes]);

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      // Navigate to final payment page
      onComplete?.('final');
    }, 1200);
  };

  return (
    <div className="pay-wrap">
      <div className="pay-container">
        <div className="pay-left">
          <div className="gateway-content">
            <h2>Payment Gateway</h2>
            <p className="gateway-message">Click Pay to proceed with your payment</p>
            
            <div className="course-summary-left">
              <img src={course?.image} alt={course?.name || 'Course'} />
              <div className="title">{course?.name || 'Selected course'}</div>
              <div className="price-breakdown">
                <div className="row-line"><span>Base Price</span><b>₹{course?.price || 0}</b></div>
                <div className="row-line"><span>GST (18%)</span><b>₹{taxes}</b></div>
                <div className="divider" />
                <div className="row-line total"><span>Total</span><b>₹{total}</b></div>
              </div>
            </div>

            <div className="gateway-actions">
              <button className="btn-secondary" onClick={onBack}>Back</button>
              <button className="btn-primary" disabled={processing} onClick={handlePay}>
                {processing ? 'Processing...' : 'Pay ₹'+total}
              </button>
            </div>
          </div>
        </div>

        <aside className="pay-right">
          <div className="summary">
            <img src={course?.image} alt={course?.name || 'Course'} />
            <div className="title">{course?.name || 'Selected course'}</div>
            <div className="row-line"><span>Base Price</span><b>₹{course?.price || 0}</b></div>
            <div className="row-line"><span>GST (18%)</span><b>₹{taxes}</b></div>
            <div className="divider" />
            <div className="row-line total"><span>Total</span><b>₹{total}</b></div>
          </div>
        </aside>
      </div>
    </div>
  );
}
