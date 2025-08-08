import React, { useState } from "react";
import "./AddMedication.css";
import { useNavigate } from "react-router-dom";
import API from '../api';

export default function MedicationForm() {
  const initialState = {
    name: "user",
    sex: "Female",
    medicine: "sinex",
    dosage: "454",
    unit: "mg",
    time: "3:45",
    frequency: "Once daily",
    notes: "",
    // reminderMethod: "email",
    // email: "",
    // phone: ""
  };

  const [form, setForm] = useState(initialState);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    console.log('Submitting form before validation', form);
    // Validate required fields
    if (
      !form.name ||
      !form.sex ||
      !form.medicine ||
      !form.dosage ||
      !form.time
    ) {
      setError('Please fill out all required fields.');
      return;
    }
    // if (form.reminderMethod === 'email' && !form.email) {
    //   setError('Please provide an email address.');
    //   return;
    // }
    // if (form.reminderMethod === 'sms' && !form.phone) {
    //   setError('Please provide a phone number.');
    //   return;
    // }

    const payload = {
      name: form.name,
      sex: form.sex,
      medicine: form.medicine,
      dosage: `${form.dosage} ${form.unit}`,
      time: form.time,
      frequency: form.frequency,
      notes: form.notes,
      // reminderMethod: form.reminderMethod,
      // email: form.email,
      // phone: form.phone
    };

    try {
      console.log('Submitting medication:', payload);
      await API.post('/medications/create', payload);
      setSuccess('Medication added!');
      setForm(initialState);
      setTimeout(() => navigate('/dashboard'), 1200);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="med-form-bg">
      <form className="med-form" onSubmit={handleSubmit}>
        <h1>Add Medication</h1>

        <label>Name *</label>
        <input
          name="name"
          required
          value={form.name}
          onChange={handleChange}
        />

        <label>Sex *</label>
        <select name="sex" value={form.sex} onChange={handleChange}>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
          <option value="Others">Others</option>
        </select>

        <label>medicine *</label>
        <input
          name="medicine"
          required
          value={form.medicine}
          onChange={handleChange}
        />

        {/* Dosage + Unit on same row */}
        <div className="form-row dose-unit-row">
          <div className="dose-field">
            <label>Dosage *</label>
            <input
              name="dosage"
              required
              value={form.dosage}
              onChange={handleChange}
            />
          </div>
          <div className="unit-field">
            <label>Unit</label>
            <select name="unit" value={form.unit} onChange={handleChange}>
              <option value="mg">mg</option>
              <option value="ml">ml</option>
            </select>
          </div>
        </div>

        <label>Time to Take *</label>
        <input
          name="time"
          type="time"
          required
          value={form.time}
          onChange={handleChange}
        />

        <label>Frequency *</label>
        <select name="frequency" value={form.frequency} onChange={handleChange}>
          <option>Once daily</option>
          <option>Twice daily</option>
          <option>Thrice daily</option>
        </select>

        <label>Notes</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Any special instructions..."
        />

        <div className="divider" />

        {/* <h4>Add Reminder</h4>
        <label>Reminder Method *</label>
        <select
          name="reminderMethod"
          value={form.reminderMethod}
          onChange={handleChange}
          required
        >
          <option value="email">Email</option>
          <option value="sms">SMS</option>
          <option value="inAppReminder">In-App Reminder</option>
        </select>

        {/* Required fields for reminder, conditional */}
        {/* {form.reminderMethod === "email" && (
          <>
            <label>Email Address *</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </>
        )}

        {form.reminderMethod === "sms" && (
          <>
            <label>Phone Number *</label>
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="+1 234 567 8901"
              required
            />
          </>
        )}

        {form.reminderMethod === "inAppReminder" && (
          <p style={{ fontStyle: "italic", color: "#555", marginTop: "6px" }}>
            In-app reminders will notify you directly within the application.
          </p>
        )} */} 

        {error && <div className="form-error">{error}</div>}
        {success && <div className="form-success">{success}</div>}

        <button className="add-btn" type="submit">
          Add Medication
        </button>
      </form>
    </div>
  );
}
