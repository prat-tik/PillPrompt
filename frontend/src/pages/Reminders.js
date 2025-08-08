// // Reminders.js
// import React, { useEffect, useState } from 'react';

// function Reminders() {
//   const [reminders, setReminders] = useState([]);
//   const [showAdd, setShowAdd] = useState(false);
//   const [form, setForm] = useState({
//     time: '', method: '', status: ''
//   });

//   // Fetch all reminders on load
//   useEffect(() => {
//     fetch('/api/reminders')
//       .then(res => res.json())
//       .then(data => setReminders(data));
//   }, []);

//   // Handle changes in add form
//   const handleFormChange = e => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Submit new reminder
//   const handleAddReminder = e => {
//     e.preventDefault();
//     fetch('/api/reminders', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(form)
//     })
//       .then(res => res.json())
//       .then(newReminder => {
//         setReminders([...reminders, newReminder]);
//         setShowAdd(false);
//         setForm({ time: '', method: '', status: '' });
//       });
//   };

//   return (
//     <div>
//       <h2>Reminders</h2>
//       <button onClick={() => setShowAdd(true)}>Add Reminder</button>
//       <table border="1" cellPadding="8" style={{ marginTop: 12, background: '#f9f9f9' }}>
//         <thead>
//           <tr>
//            {/* <th>id</th> */}
//             <th>time</th>
//             <th>method</th>
//             <th>status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {reminders.map(r => (
//             <tr key={r.id}>
//               {/* <td>{r.id}</td> */}
//               <td>{r.time}</td>
//               <td>{r.method}</td>
//               <td>{r.status || '—'}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
      
//       {showAdd &&
//         <div style={{
//           position: 'fixed', top: 0, left:0, width: '100vw', height: '100vh',
//           background: 'rgba(0,0,0,0.4)', display: 'flex',
//           justifyContent:'center', alignItems:'center', zIndex: 1000
//         }}>
//           <form onSubmit={handleAddReminder}
//             style={{ background: '#fff', padding: 24, borderRadius: 8, minWidth: 300 }}>
//             <h3>Add New Reminder</h3>
//             <label>
//               Time <input type="text" name="time" value={form.time} onChange={handleFormChange} placeholder="e.g. 12:30" required /><br/>
//             </label>
//             <label>
//               Method <input type="text" name="method" value={form.method} onChange={handleFormChange} placeholder="sms/email/push" required /><br/>
//             </label>
//             <label>
//               Status <input type="text" name="status" value={form.status} onChange={handleFormChange} placeholder="optional"/><br/>
//             </label>
//             <button type="submit">Add</button>
//             <button type="button" onClick={() => setShowAdd(false)} style={{ marginLeft: 8 }}>Cancel</button>
//           </form>
//         </div>
//       }
//     </div>
//   );
// }

// export default Reminders;
