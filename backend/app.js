const express = require('express');
const cors = require('cors');
const path = require('path'); // ✅ Needed for static file pathing

// Import route handlers
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const medicationRoutes = require('./routes/medications');
const reminderRoutes = require('./routes/reminders');
const doseRoutes = require('./routes/doses');
const dashboardRoutes = require('./routes/Dashboard');
const pool = require('./utils/db'); // MySQL pool

const app = express();

// ✅ Serve static files BEFORE any middleware
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/medications', medicationRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/doses', doseRoutes);
app.use('/api/dashboard', dashboardRoutes);

// DB test route
app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({ message: 'Server error' });
});

module.exports = app;