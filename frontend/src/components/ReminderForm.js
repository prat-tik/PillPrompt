import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import './reminderform.css'; // Import your CSS styles
export default function ReminderForm({ medication, onClose }) {
  const [form, setForm] = useState({
    time: '',
    method: '',
    status: '',
    email: '',  // New field for email when method=email
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  console.log('Medication in ReminderForm:', medication);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate required fields
    if (!form.time || !form.method) {
      setError('Please fill out all required fields.');
      return;
    }
    if (form.method === 'Email' && !form.email) {
      setError('Please enter an email address.');
      return;
    }

    const payload = {
      medication_id: medication.id,
      time: form.time,
      method: form.method,
      status: form.status || 'Pending',
      ...(form.method === 'Email' && { email: form.email }) // include email only if method=email
    };

    try {
      console.log('Creating reminder with payload:', payload);
      const response = await API.post(`/reminders`, payload);
      console.log('Reminder created:', response.data);
      setSuccess('Reminder added successfully!');
      setForm({ time: '', method: '', status: '', email: '' });
      navigate('/dashboard'); // Redirect to reminders page
    } catch (error) {
      console.error('Error creating reminder:', error);
      setError('Failed to add reminder. Please try again.');
    }
  };

  return (
    <div className="add-reminder-form relative bg-white p-4 rounded">
      <h2 className="text-2xl font-semibold mb-4">Add Reminder</h2>
      <p className="mb-4">Medication: <strong>{medication ? medication.medicine : "No Name"}</strong></p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <div className="form-group flex-grow">
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group flex-grow">
          <label htmlFor="method">Method</label>
          <select
            id="method"
            name="method"
            value={form.method}
            onChange={handleChange}
            required
          >
            <option value="">Select Method</option>
            <option value="SMS">SMS</option>
            <option value="Email">Email</option>
            <option value="Push">Push</option>
          </select>
        </div>

        {form.method === 'Email' && (
          <div className="form-group flex-grow">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@mail.com"
              required
            />
          </div>
        )}

        <div className="form-group flex-grow">
          <label htmlFor="status">Status</label>
          <input
            type="text"
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
            placeholder="optional"
          />
        </div>

        <div>
          <button type="submit" className="btn btn-primary">Add Reminder</button>
        </div>
      </form>
      <button className="close-button" onClick={() => onClose(false)}>
        &times;
      </button>

      {error && <div className="form-error text-red-600 mt-2">{error}</div>}
      {success && <div className="form-success text-green-600 mt-2">{success}</div>}
    </div>
  );
}
