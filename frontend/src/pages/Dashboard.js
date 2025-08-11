// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import './Dashboard.css';
import ReminderForm from '../components/ReminderForm';

export default function Dashboard() {
  console.log("Dashboard component mounted");

  const [data, setData] = useState({
    user: { name: '', role: '' },
    medications: [],
    reminders: [],
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [showAdd, setShowAdd] = useState(false);
  const [currentMedication, setCurrentMedication] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Token:", token);

    if (!token) {
      console.warn("No token found, redirecting to login");
      navigate('/login');
      return;
    }

    console.log("Fetching dashboard data...");
    API.get('/dashboard')
      .then(res => {
        console.log("Dashboard data received:", res.data);
        setData(res.data || {});
        setLoading(false);
      })
      .catch(err => {
        console.error('Dashboard fetch error:', err.response?.data || err.message);
        navigate('/login');
      });
  }, [navigate]);

  const handleReminderDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this reminder?');
    if (!confirmed) return;

    setDeletingId(id);
    try {
      await API.delete(`/reminders/${id}`);
      alert('Reminder deleted successfully.');
      setData(prev => ({
        ...prev,
        reminders: prev.reminders.filter(rem => rem.id !== id),
      }));
    } catch (error) {
      alert(`Error deleting reminder: ${error.response?.data?.message || error.message}`);
    }
    setDeletingId(null);
  };

  const deleteMedication = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this medication?');
    if (!confirmed) return;

    setDeletingId(id);
    try {
      await API.delete(`/medications/${id}`);
      alert('Medication deleted successfully.');
      setData(prev => ({
        ...prev,
        medications: prev.medications.filter(med => med.id !== id),
      }));
    } catch (error) {
      alert(`Error deleting medication: ${error.response?.data?.message || error.message}`);
    }
    setDeletingId(null);
  };

  const handleShowAdd = (med) => {
    setCurrentMedication(med);
    setShowAdd(true);
  };

  if (loading) return <p>Loading dashboard...</p>;
  if (!data?.user) return <p>Error loading user data. Please try logging in again.</p>;

  return (
    <div className="dashboard-container">
      <h1 className="welcome-header">Welcome, {data.user.name || 'Guest'}</h1>
      <p className="role-text">Role: {data.user.role || 'N/A'}</p>

      <div className="content-grid">
        {/* Medications Section */}
        <div>
          <div className="card">
            <h2 className="section-title">Your Medications</h2>
            {data.medications?.length === 0 ? (
              <p>No medications added yet.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Medicine</th>
                    <th>Dosage</th>
                    <th>Unit</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.medications.map(med => (
                    <tr key={med.id}>
                      <td>{med.medicine}</td>
                      <td>{med.dosage || 'N/A'}</td>
                      <td>{med.unit || 'N/A'}</td>
                      <td>
                        <button
                          className="add-reminder-btn"
                          onClick={() => handleShowAdd(med)}
                        >
                          Add reminder
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => deleteMedication(med.id)}
                          disabled={deletingId === med.id}
                        >
                          {deletingId === med.id ? 'Deleting...' : 'Delete'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="add-medication-btn-container">
            <button
              className="add-medication-btn"
              onClick={() => navigate('/addmedication')}
            >
              Add Your Medications
            </button>
          </div>
        </div>

        {/* Reminders Section */}
        <div className="card">
          <h2 className="section-title">Your Reminders</h2>
          {data.reminders?.length === 0 ? (
            <p>No reminders set.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.reminders.map(rem => (
                  <tr key={rem.id}>
                    <td>{rem.method}</td>
                    <td>{rem.status || 'Pending'}</td>
                    <td>{rem.time || 'N/A'}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => handleReminderDelete(rem.id)}
                        disabled={deletingId === rem.id}
                      >
                        {deletingId === rem.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showAdd && currentMedication && (
        <div className="modal-overlay" onClick={() => setShowAdd(false)}>
          <div onClick={e => e.stopPropagation()}>
            <ReminderForm
              medication={currentMedication}
              onClose={() => setShowAdd(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}