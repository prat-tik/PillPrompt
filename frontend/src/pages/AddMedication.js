import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddMedication.css';

function AddMedication() {
  const [form, setForm] = useState({
    name: '',
    sex: '',
    medicine: '',
    dosage: '',
    unit: 'mg',
    time: '',
    frequency: 'Once daily',
    notes: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.sex || !form.medicine || !form.dosage || !form.time) {
      setError('Please fill out all required fields.');
      return;
    }
    setSuccess('Medication added! (Backend will handle saving)');
    setForm({
      name: '',
      sex: '',
      medicine: '',
      dosage: '',
      unit: 'mg',
      time: '',
      frequency: 'Once daily',
      notes: '',
    });
    setTimeout(() => {
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <div className="add-medication-card">
      <h2 className="add-medication-title">Add Medication</h2>
      <form className="add-medication-form" onSubmit={handleSubmit} autoComplete="off">
        <div className="form-group">
          <label>Patient Name *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full name"
            required
          />
        </div>
        <div className="form-group">
          <label>Sex *</label>
          <select
            name="sex"
            value={form.sex}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other / Prefer not to say</option>
          </select>
        </div>
        <div className="form-group">
          <label>Medicine Name *</label>
          <input
            type="text"
            name="medicine"
            value={form.medicine}
            onChange={handleChange}
            placeholder="e.g. Paracetamol"
            required
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Dosage *</label>
            <input
              type="number"
              min="0"
              name="dosage"
              value={form.dosage}
              onChange={handleChange}
              placeholder="e.g. 500"
              required
            />
          </div>
          <div className="form-group">
            <label>Unit</label>
            <select
              name="unit"
              value={form.unit}
              onChange={handleChange}
            >
              <option value="mg">mg</option>
              <option value="ml">ml</option>
              <option value="g">g</option>
              <option value="IU">IU</option>
              <option value="tabs">tabs</option>
              <option value="caps">caps</option>
              <option value="drops">drops</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label>Time to Take *</label>
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Frequency *</label>
          <select
            name="frequency"
            value={form.frequency}
            onChange={handleChange}
            required
          >
            <option value="Once daily">Once daily</option>
            <option value="Twice daily">Twice daily</option>
            <option value="Three times daily">Three times daily</option>
            <option value="As needed">As needed</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Notes</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Any special instructions..."
          />
        </div>
        {error && <div className="form-error">{error}</div>}
        {success && <div className="form-success">{success}</div>}
        <button type="submit" className="add-medication-btn">
          Add Medication
        </button>
      </form>
    </div>
  );
}

export default AddMedication;
