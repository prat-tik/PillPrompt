import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Dashboard.css';

function Dashboard() {
  const [userInfo, setUserInfo] = useState(null);
  const [reminders, setReminders] = useState([]);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Simulate API call delay with setTimeout
    setTimeout(() => {
      try {
        // Dummy user info
        const userData = {
          name: 'John Doe',
          age: 35,
          sex: 'Male',
          photoUrl: 'https://randomuser.me/api/portraits/men/75.jpg',
        };

        // Dummy reminders
        const remindersData = [
          { time: '8:00 AM', med: 'Aspirin 75mg', status: 'Pending' },
          { time: '12:00 PM', med: 'Vitamin D 1000IU', status: 'Pending' },
          { time: '9:00 PM', med: 'Metformin 500mg', status: 'Taken' },
        ];

        // Dummy recent activity
        const activityData = [
          'Metformin 500mg taken at 9:00 PM',
          'Vitamin D 1000IU scheduled for 12:00 PM',
        ];

        setUserInfo(userData);
        setReminders(remindersData);
        setActivity(activityData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load dummy data');
        setLoading(false);
      }
    }, 1000); // Simulate 1 second delay
  }, []);

  if (loading) return <div className="dashboard-container">Loading...</div>;
  if (error) return <div className="dashboard-container">Error: {error}</div>;

  return (
    <div className="dashboard-container">
      <div className="user-info">
        <img src={userInfo.photoUrl} alt={`${userInfo.name}'s profile`} className="user-photo" />
        <div className="user-details">
          <h2>Welcome, {userInfo.name}</h2>
          <p>Age: {userInfo.age}</p>
          <p>Sex: {userInfo.sex}</p>
        </div>
      </div>

      <button
        className="add-medications-btn"
        onClick={() => navigate('/add-medication')}
      >
        Add Your Medications
      </button>

      <div className="dashboard-section">
        <h3>Today's Reminders</h3>
        <ul className="reminder-list">
          {reminders.map((item, i) => (
            <li key={i} className={`reminder-item ${item.status.toLowerCase()}`}>
              <span className="reminder-time">{item.time}</span>
              <span className="reminder-med">{item.med}</span>
              <span className="reminder-status">{item.status}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="dashboard-section">
        <h3>Recent Activity</h3>
        <ul className="activity-list">
          {activity.map((act, i) => (
            <li key={i}>{act}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
