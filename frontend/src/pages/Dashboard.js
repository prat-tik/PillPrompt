export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get('/dashboard').then(res => setData(res.data));
  }, []);

  if (!data) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-blue-50 px-6 py-8">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center text-blue-900 mb-2">Welcome, {data.user.name}</h1>
      <p className="text-center text-gray-600 mb-6">Role: {data.user.role}</p>

      {/* Grid for features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Medications */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-3 text-blue-800">Your Medications</h2>
          {data.medications.map(med => (
            <div key={med.id} className="border-b py-2">
              <strong>{med.name}</strong> — {med.dosage} ({med.schedule})
            </div>
          ))}
        </div>

        {/* Reminders */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-3 text-blue-800">Upcoming Reminders</h2>
          {data.reminders.map(rem => (
            <div key={rem.id} className="border-b py-2">
              {rem.time} via {rem.method}
            </div>
          ))}
        </div>
      </div>

      {/* Forms Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <MedicationForm onAdd={() => API.get('/dashboard').then(res => setData(res.data))} />
        <ReminderForm meds={data.medications} onAdd={() => API.get('/dashboard').then(res => setData(res.data))} />
        <DoseLogForm meds={data.medications} onAdd={() => API.get('/dashboard').then(res => setData(res.data))} />
      </div>
    </div>
  );
}
