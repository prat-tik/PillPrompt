import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // useNavigate for redirect after login
import './Login.css';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
const response = await fetch('https://pillprompt-1.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        // Save token to localStorage
        localStorage.setItem('token', data.token);
        // Redirect to dashboard or home page
        navigate('/dashboard');  // Adjust route as needed
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
        <h2>Login to PillPrompt</h2>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>
        {error && <div className="form-error">{error}</div>}
        <button className="btn-primary login-btn" type="submit">
          Login
        </button>
        <div className="login-bottom-text">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="signup-link">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
