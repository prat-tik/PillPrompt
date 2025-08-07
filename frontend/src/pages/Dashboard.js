import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

// Import your form components as before
import MedicationForm from '../components/MedicationForm';
import ReminderForm from '../components/ReminderForm';
import DoseLogForm from '../components/DoseLogForm';


// Example mock data
const initialData = {
  user: {
    name: "Jane Doe",
    role: "Patient",
  },
  medications: [
    { id: 1, name: "Aspirin", dosage: "100mg", schedule: "Morning" },
    { id: 2, name: "Metformin", dosage: "500mg", schedule: "Evening" },
  ],
  reminders: [
    { id: 1, time: "8:00 AM", method: "SMS" },
    { id: 2, time: "8:00 PM", method: "App Notification" },
  ],
};

export default function Dashboard() {
  const [data, setData] = useState(initialData);
  const navigate = useNavigate();
  const [showAdd, setShowAdd] = useState(false);
  const [currentMedication, setCurrentMedication] = useState({});

  // Handlers for adding new items (simulate backend updates)
  const handleAddMedication = (med) => {
    setData(prev => ({
      ...prev,
      medications: [...prev.medications, { ...med, id: Date.now() }]
    }));
  };

  const handleAddReminder = (rem) => {
    setData(prev => ({
      ...prev,
      reminders: [...prev.reminders, { ...rem, id: Date.now() }]
    }));
  };

  const handleShowAdd = (med) => {
    setCurrentMedication(med);
    setShowAdd(true);
  }
  // You can add similar handlers for DoseLogForm if needed
  useEffect(() => {
    API.get('/dashboard').then(res => setData(res.data));
  }, []);
  return (
    <div className="min-h-screen bg-blue-50 px-6 py-8">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center text-blue-900 mb-2">
        Welcome, {data.user.name}
      </h1>
      <p className="text-center text-gray-600 mb-6">
        Role: {data.user.role}
      </p>

      {/* Grid for features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Medications */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-3 text-blue-800">Your Medications</h2>
          {data.medications.map(med => (
            <div key={med.id} className="border-b py-2">
              <strong>{med.medicine}</strong> — {med.dosage} ({med.schedule})

              <button
                className="addmedications-btn"
                onClick={() => handleShowAdd(med)}
              >
                Add reminder
              </button>
            </div>
          ))}
        </div>

        {showAdd &&
          <div
            // onClick={() => setShowAdd(false)}
            style={{
              position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
              background: 'rgba(0,0,0,0.4)', display: 'flex',
              justifyContent: 'center', alignItems: 'center', zIndex: 1000,
            }}>
            <div onClick={(e) => e.stopPropagation()}>
              <ReminderForm medication={currentMedication} onClose={setShowAdd}/>

            </div>
            {/* <button
              className="absolute top-4 right-4 text-white bg-red-500 px-3 py-1 rounded"
              onClick={() => setShowAdd(false)}
            >
              Close
            </button> */}

          </div>
        }


        {/* Reminders */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-3 text-blue-800">Upcoming Reminders</h2>
          {data.reminders.map(rem => (
            <div key={rem.id} className="border-b py-2">
              {rem.time} via {rem.method}
              </div>))} 
        </div>
      </div>

      {/* Forms Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* <MedicationForm onAdd={handleAddMedication} />
        <ReminderForm meds={data.medications} onAdd={handleAddReminder} />
        <DoseLogForm meds={data.medications} onAdd={() => {}} /> */}
      </div>

      <button
        className="addmedications-btn"
        onClick={() => navigate('/addmedication')}
      >
        Add Your Medications
      </button>
    </div>
  );
}

