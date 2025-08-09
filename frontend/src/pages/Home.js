import React, { useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Home.css';
import logo from '../assets/folder/3ed35b72-0eba-4417-851e-10bc6388ba43.jpg';

function Home() {
  // Ref for the How It Works section
  const howItWorksRef = useRef(null);

  // Scroll handler
  const handleHowItWorksClick = (e) => {
    e.preventDefault();
    if (howItWorksRef.current) {
      howItWorksRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="homepage-container">
      <nav className="navbar">
        <div className="navbar-left">
          <img src={logo} alt="PillPrompt Logo" className="navbar-logo" />
          <span className="navbar-title">PillPrompt</span>
        </div>
        <ul className="nav-links">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Home
            </NavLink>
          </li>
          <li>
            {/* Scroll smoothly on click */}
            <a
              href="#how-it-works"
              onClick={handleHowItWorksClick}
              className="nav-link"
              style={{ cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}
            >
              How It Works
            </a>
          </li>
          <li>
            <NavLink
              to="/features"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Features
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Contact
            </NavLink>
          </li>
        </ul>
        <div className="nav-cta">
          <Link to="/login" className="btn-outline">Login</Link>
          <Link to="/register" className="btn-primary">Sign Up</Link>
        </div>
      </nav>

      <header className="hero-section">
        <h1>
          Never Miss a Dose.<br />
          <span className="highlight">Ever.</span>
        </h1>
        <p>
          PillPrompt keeps your medication routine on track—<b>effortlessly, reliably, beautifully</b>.
        </p>
        <div className="hero-actions">
          <Link to="/register" className="btn-primary">Get Started Free</Link>
          {/* Changed this Link to anchor with scroll handler */}
          <a
            href="#how-it-works"
            onClick={handleHowItWorksClick}
            className="btn-outline"
            style={{ cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}
          >
            See How It Works
          </a>
        </div>
      </header>

      <section className="features-section">
        <div className="feature-card">
          <span className="feature-icon">⏰</span>
          <h3>Smart Reminders</h3>
          <p>Never forget a dose with perfectly timed notifications.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">📅</span>
          <h3>Personalized Schedules</h3>
          <p>Customize routines for every prescription or supplement.</p>
        </div>
      </section>

      {/* How It Works section with ref */}
      <section
        className="how-it-works-section"
        id="how-it-works"
        ref={howItWorksRef}
      >
        <h2>How It Works</h2>
        <div className="how-steps">
          <div className="how-step">
            <span>1</span>
            <p>Add your meds in seconds.</p>
          </div>
          <div className="how-step">
            <span>2</span>
            <p>Set your schedule and preferences.</p>
          </div>
          <div className="how-step">
            <span>3</span>
            <p>Get reminders on any device.</p>
          </div>
          <div className="how-step">
            <span>4</span>
            <p>Track your progress and stay healthy!</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-links">
          <Link to="/support">Support</Link>
          <Link to="/blog">Blog</Link>
        </div>
        <div className="social-icons">
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
            <span role="img" aria-label="Twitter">🐦</span>
          </a>
          <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
            <span role="img" aria-label="Instagram">📸</span>
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
            <span role="img" aria-label="LinkedIn">💼</span>
          </a>
        </div>
        <div>
          &copy; {new Date().getFullYear()} PillPrompt. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Home;
