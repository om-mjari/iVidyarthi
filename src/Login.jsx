import React, { useState } from 'react';
import './Login.css';
import Logo from './components/Logo';

const Login = ({ onAuthenticated, onSwitchToSignup, onAdminLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // MongoDB API connection
  const API_BASE_URL = 'http://localhost:5000/api';

  const loginUser = async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || 'Login failed');
    }
    return result;
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return setError('Enter a valid email address.');
      }

      // Check for admin credentials first
      if (email === 'admin123@gmail.com' && password === 'admin123456789@') {
        localStorage.setItem('admin_user', JSON.stringify({
          id: 'admin_001',
          email: 'admin123@gmail.com',
          role: 'admin',
          name: 'System Administrator'
        }));
        setSuccess('Admin login successful! Redirecting to dashboard...');
        setTimeout(() => onAdminLogin?.(), 500);
        return;
      }

      // Static lecturer credentials
      if (email.toLowerCase() === 'lecturer123@gmail.com' && password === 'lecturer123456789@') {
        localStorage.setItem('lecturer_user', JSON.stringify({
          id: 'lect-001',
          name: 'Lecturer',
          email: 'lectrer123@gmail.com',
          role: 'lecturer'
        }));
        setSuccess('Lecturer login successful! Redirecting to dashboard...');
        // Navigate by updating history state so App picks it up
        window.history.pushState({ route: 'lecturer-dashboard' }, '', '/lecturer-dashboard');
        // Small delay to allow App state to react
        setTimeout(() => {
          const navEvent = new PopStateEvent('popstate', { state: { route: 'lecturer-dashboard' } });
          window.dispatchEvent(navEvent);
        }, 200);
        return;
      }

      // Static registrar credentials
      if (email.toLowerCase() === 'registrar123@gmail.com' && password === 'registrar123456789@') {
        localStorage.setItem('registrar_user', JSON.stringify({
          id: 'reg-001',
          name: 'Registrar',
          email: 'ragistrar123@gmail.com',
          role: 'registrar'
        }));
        // Default: mark approval false until admin approves
        if (localStorage.getItem('registrar_approved') === null) {
          localStorage.setItem('registrar_approved', 'false');
        }
        setSuccess('Registrar login successful! Redirecting to dashboard...');
        window.history.pushState({ route: 'registrar-dashboard' }, '', '/registrar-dashboard');
        setTimeout(() => {
          const navEvent = new PopStateEvent('popstate', { state: { route: 'registrar-dashboard' } });
          window.dispatchEvent(navEvent);
        }, 200);
        return;
      }

      // Login with MongoDB backend
      const apiResponse = await loginUser(email, password);

      if (apiResponse.success) {
        // Store JWT token
        localStorage.setItem('auth_token', apiResponse.data.token);

        // Set authenticated user
        localStorage.setItem('auth_user', JSON.stringify({
          id: apiResponse.data.user._id,
          name: apiResponse.data.user.name,
          email: apiResponse.data.user.email
        }));

        // Always update profile with latest user data from login
        localStorage.setItem('student_profile', JSON.stringify(apiResponse.data.user.profile || {
          name: apiResponse.data.user.name || '',
          birthdate: apiResponse.data.user.dateOfBirth ? new Date(apiResponse.data.user.dateOfBirth).toISOString().split('T')[0] : '',
          courseDetails: apiResponse.data.user.education?.course || '',
          certificateDetails: apiResponse.data.user.education?.qualification || '',
          gender: apiResponse.data.user.gender || '',
          email: apiResponse.data.user.email
        }));

        setSuccess('Welcome back! Redirecting...');
        setTimeout(() => onAuthenticated?.(), 500);
      }
    } catch (error) {
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-illustration" aria-hidden>
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
          <Logo size="xlarge" showText={true} style={{ color: 'white', marginBottom: '1rem' }} />
          <div className="tag">Learn. Build. Shine.</div>
        </div>
        <div className="auth-form-area">
          <h2>Welcome back</h2>
          <p className="subtitle">Access your personalized student dashboard</p>

          <form onSubmit={submit} className="auth-form">
            <label className="field">
              <span>Email</span>
              <input name="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label className="field">
              <span>Password</span>
              <input name="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            {error && <div className="msg error" role="alert">{error}</div>}
            {success && <div className="msg success">{success}</div>}
            <button className="auth-submit" type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <div className="switch">
            <span>New here? <button type="button" onClick={onSwitchToSignup} className="link">Create an account</button></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
