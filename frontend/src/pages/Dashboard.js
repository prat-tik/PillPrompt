import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import './Dashboard.css'; // Import your CSS styles

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

  const [deletingId, setDeletingId] = useState(null);

  // Handler to delete a reminder by id
  const handleReminderDelete = async (id) => {
    // Confirmation before deleting
    const confirmed = window.confirm("Are you sure you want to delete this reminder?");
    if (!confirmed) return;

    // setDeletingId(id);
    try {
      const response = await API.delete(`/reminders/${id}`);

      if (response.status !== 200 && response.status !== 204) {
        throw new Error(`Failed to delete reminder with id ${id}`);
      }

      alert('Reminder deleted successfully.');
      // setDeletingId(null);
      // reload window
      window.location.reload();


      // Optionally notify parent component to refresh data
      // if (onDeleteSuccess) onDeleteSuccess(id);
    } catch (error) {
      alert(`Error deleting reminder: ${error.message}`);
      setDeletingId(null);
    }
  };

  // Function to delete medication by id
  const deleteMedication = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this medication?');
    if (!confirmed) return;

    // setDeletingId(id);
    try {
      const response = await API.delete(`/medications/${id}`);

      if (response.status !== 200 && response.status !== 204) {
        throw new Error(`Failed to delete medication with id ${id}`);
      }

      alert('Medication deleted successfully.');
      // setDeletingId(null);

      // Notify parent or refresh data if needed
      // if (onDeleteSuccess) onDeleteSuccess(id);
    } catch (error) {
      alert(`Error deleting medication: ${error.message}`);
      setDeletingId(null);
    }
  };

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

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-100 text-left">
                <th className="p-2 border-b border-gray-300">Medicine</th>
                <th className="p-2 border-b border-gray-300">Dosage</th>
                {/* <th className="p-2 border-b border-gray-300">Schedule</th>
                <th className="p-2 border-b border-gray-300">Time</th>
                <th className="p-2 border-b border-gray-300">Frequency</th> */}
                <th className="p-2 border-b border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.medications.map(med => (
                <tr key={med.id} className="hover:bg-gray-50">
                  <td className="p-2 border-b border-gray-200 font-semibold">{med.medicine}</td>
                  <td className="p-2 border-b border-gray-200">{med.dosage || 'N/A'}</td>
                  {/* <td className="p-2 border-b border-gray-200">{med.schedule || med.frequency || 'N/A'}</td>
                  <td className="p-2 border-b border-gray-200">{med.time || 'N/A'}</td>
                  <td className="p-2 border-b border-gray-200">{med.frequency || 'N/A'}</td> */}
                  <td className="p-2 border-b border-gray-200 space-x-2">
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded"
                      onClick={() => handleShowAdd(med)}
                    >
                      Add reminder
                    </button>

                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"
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

        {showAdd &&
          <div
            // onClick={() => setShowAdd(false)}
            style={{
              position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
              background: 'rgba(0,0,0,0.4)', display: 'flex',
              justifyContent: 'center', alignItems: 'center', zIndex: 1000,
            }}>
            <div onClick={(e) => e.stopPropagation()}>
              <ReminderForm medication={currentMedication} onClose={setShowAdd} />

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
        {/* <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-3 text-blue-800">Your Reminders</h2>
          {data.reminders.map(rem => (
            <div key={rem.id} className="border-b py-2">
              {rem.time} via {rem.method}
              </div>))} 
        </div> */}

        <div className="bg-white rounded-2xl shadow-lg p-6 max-h-[50vh] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-3 text-blue-800">Your Reminders</h2>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-100 text-left">
                {/* <th className="p-2 border-b border-gray-300">ID</th> */}
                {/* <th className="p-2 border-b border-gray-300">User ID</th> */}
                {/* <th className="p-2 border-b border-gray-300">Medication ID</th> */}
                <th className="p-2 border-b border-gray-300">Method</th>
                {/* <th className="p-2 border-b border-gray-300">Status</th> */}
                <th className="p-2 border-b border-gray-300">Time</th>
                <th className="p-2 border-b border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="">
              {data.reminders.map((rem) => (
                <tr key={rem.id} className="hover:bg-gray-50">
                  {/* <td className="p-2 border-b border-gray-200">{rem.id}</td> */}
                  {/* <td className="p-2 border-b border-gray-200">{rem.user_id}</td> */}
                  {/* <td className="p-2 border-b border-gray-200">{rem.medication_id}</td> */}
                  <td className="p-2 border-b border-gray-200">{rem.method}</td>
                  {/* <td className="p-2 border-b border-gray-200">{rem.status || 'N/A'}</td> */}
                  <td className="p-2 border-b border-gray-200">{rem.time || 'N/A'}</td>
                  <td className="p-2 border-b border-gray-200">
                    <button
                      onClick={() => handleReminderDelete(rem.id)}
                      disabled={deletingId === rem.id}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"
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

      {/* Forms Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* <MedicationForm onAdd={handleAddMedication} />
        <ReminderForm meds={data.medications} onAdd={handleAddReminder} />
        <DoseLogForm meds={data.medications} onAdd={() => {}} /> */}
      </div>

      <button
        className="add-medications-btn"
        onClick={() => navigate('/addmedication')}
      >
        Add Your Medications
      </button>
    </div>
  );
}

