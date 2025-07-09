import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Please fill out all fields.');
      return;
    }
    setSuccess('Thank you for reaching out! We’ll get back to you soon.');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-intro">
        Have a question, suggestion, or need support? Fill out the form below and our team will respond as soon as possible.
      </p>
      <form className="contact-form" onSubmit={handleSubmit} autoComplete="off">
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            name="name"
            id="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            name="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@email.com"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message *</label>
          <textarea
            name="message"
            id="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Type your message here..."
            required
          />
        </div>
        {error && <div className="form-error">{error}</div>}
        {success && <div className="form-success">{success}</div>}
        <button type="submit" className="contact-btn">
          Send Message
        </button>
      </form>
      <div className="contact-alt">
        <p>Or email us directly at <a href="mailto:support@pillprompt.com">support@pillprompt.com</a></p>
      </div>
    </div>
  );
}

export default Contact;
