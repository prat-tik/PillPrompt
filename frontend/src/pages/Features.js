import React from 'react';
import './Features.css';

function Features() {
  return (
    <div className="features-main-container">
      <h1 className="features-title">PillPrompt Features</h1>
      <p className="features-intro">
        Discover what makes PillPrompt the easiest and most reliable way to manage your medications and stay healthy.
      </p>

      <div className="features-grid">
        <div className="feature-block">
          <span className="feature-icon">⏰</span>
          <h2>Smart Reminders</h2>
          <p>
            Receive perfectly timed notifications so you never miss a dose. Our reminders adapt to your schedule and preferences.
          </p>
        </div>
        <div className="feature-block">
          <span className="feature-icon">📅</span>
          <h2>Personalized Schedules</h2>
          <p>
            Easily customize routines for every prescription, supplement, or medication. Flexible options for daily, weekly, or as-needed medications.
          </p>
        </div>
        <div className="feature-block">
          <span className="feature-icon">📈</span>
          <h2>Progress Tracking</h2>
          <p>
            Monitor your adherence and see your progress over time. Stay motivated and celebrate your healthy habits.
          </p>
        </div>
        <div className="feature-block">
          <span className="feature-icon">🌐</span>
          <h2>Works Anywhere</h2>
          <p>
            Access PillPrompt from any device—phone, tablet, or desktop. Your reminders and records sync seamlessly across platforms.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Features;
