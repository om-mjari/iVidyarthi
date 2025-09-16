import React, { useEffect, useState } from 'react';
import './Payment.css';

const Payment = ({ onCancel, onSuccess, onGateway }) => {
  const [course, setCourse] = useState(null);
  const [method, setMethod] = useState('card');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('selected_course');
      setCourse(raw ? JSON.parse(raw) : null);
    } catch {
      setCourse(null);
    }
  }, []);

  const goToGateway = () => {
    // Navigate to a dedicated gateway page; parent handles routing
    if (onGateway) {
      onGateway({ method });
      return;
    }
    // fallback: simulate success
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onSuccess?.();
    }, 900);
  };

  if (!course) {
    return (
      <div className="pay-wrap">
        <div className="pay-card">
          <p>No course selected.</p>
          <button className="btn-secondary" onClick={onCancel}>Back</button>
        </div>
      </div>
    );
  }

  const taxes = Math.round(course.price * 0.18);
  const total = course.price + taxes;

  return (
    <div className="pay-wrap">
      <div className="pay-container">
        <div className="pay-left">
          <h2>Checkout</h2>
          <div className="methods">
            <label className={`method ${method==='card'?'active':''}`}>
              <input type="radio" name="method" value="card" checked={method==='card'} onChange={(e)=>setMethod(e.target.value)} />
              <span>Credit / Debit Card</span>
            </label>
            <label className={`method ${method==='upi'?'active':''}`}>
              <input type="radio" name="method" value="upi" checked={method==='upi'} onChange={(e)=>setMethod(e.target.value)} />
              <span>UPI</span>
            </label>
            <label className={`method ${method==='netbank'?'active':''}`}>
              <input type="radio" name="method" value="netbank" checked={method==='netbank'} onChange={(e)=>setMethod(e.target.value)} />
              <span>Net Banking</span>
            </label>
          </div>

          {method==='card' && (
            <div className="form">
              <label>
                <span>Card Number</span>
                <input type="text" placeholder="1234 5678 9012 3456" />
              </label>
              <div className="row">
                <label>
                  <span>Expiry</span>
                  <input type="text" placeholder="MM/YY" />
                </label>
                <label>
                  <span>CVC</span>
                  <input type="text" placeholder="***" />
                </label>
              </div>
              <label>
                <span>Cardholder Name</span>
                <input type="text" placeholder="Your name" />
              </label>
            </div>
          )}

          {method==='upi' && (
            <div className="form">
              <label>
                <span>UPI ID</span>
                <input type="text" placeholder="username@bank" />
              </label>
            </div>
          )}

          {method==='netbank' && (
            <div className="form">
              <label>
                <span>Select Bank</span>
                <select>
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>State Bank of India</option>
                  <option>Axis Bank</option>
                </select>
              </label>
            </div>
          )}
        </div>

        <aside className="pay-right">
          <div className="summary">
            <img src={course.image} alt={course.name} />
            <div className="title">{course.name}</div>
            <div className="row-line"><span>Base Price</span><b>₹{course.price}</b></div>
            <div className="row-line"><span>GST (18%)</span><b>₹{taxes}</b></div>
            <div className="divider" />
            <div className="row-line total"><span>Total</span><b>₹{total}</b></div>
            <button className="btn-primary" disabled={processing} onClick={goToGateway}>{processing ? 'Processing...' : 'Pay Now'}</button>
            <button className="btn-secondary" onClick={onCancel}>Cancel</button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Payment;
