import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import './Dashboard.css';
import ReminderForm from '../components/ReminderForm';

export default function Dashboard() {
  const [data, setData] = useState({
    user: { name: "", role: "" },
    medications: [],
    reminders: []
  });
  const navigate = useNavigate();
  const [showAdd, setShowAdd] = useState(false);
  const [currentMedication, setCurrentMedication] = useState({});
  const [deletingId, setDeletingId] = useState(null);

  const handleReminderDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this reminder?");
    if (!confirmed) return;
    try {
      const response = await API.delete(`/reminders/${id}`);
      if (response.status !== 200 && response.status !== 204) {
        throw new Error(`Failed to delete reminder with id ${id}`);
      }
      alert('Reminder deleted successfully.');
      window.location.reload();
    } catch (error) {
      alert(`Error deleting reminder: ${error.message}`);
      setDeletingId(null);
    }
  };

  const deleteMedication = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this medication?');
    if (!confirmed) return;
    try {
      const response = await API.delete(`/medications/${id}`);
      if (response.status !== 200 && response.status !== 204) {
        throw new Error(`Failed to delete medication with id ${id}`);
      }
      alert('Medication deleted successfully.');
      window.location.reload();
    } catch (error) {
      alert(`Error deleting medication: ${error.message}`);
      setDeletingId(null);
    }
  };

  const handleShowAdd = (med) => {
    setCurrentMedication(med);
    setShowAdd(true);
  };

  useEffect(() => {
    API.get('/dashboard').then(res => setData(res.data));
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="welcome-header">
        Welcome, {data.user.name}
      </h1>
      <p className="role-text">Role: {data.user.role}</p>

      <div className="content-grid">
        {/* Medications Section */}
        <div>
          <div className="card">
            <h2 className="section-title">Your Medications</h2>
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
          </div>

          {/* Add Medications Button BELOW card */}
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
        </div>
      </div>

      {showAdd && (
        <div className="modal-overlay">
          <div onClick={(e) => e.stopPropagation()}>
            <ReminderForm medication={currentMedication} onClose={setShowAdd} />
          </div>
        </div>
      )}
    </div>
  );
}
