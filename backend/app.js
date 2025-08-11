const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const medicationRoutes = require('./routes/medications');
const reminderRoutes = require('./routes/reminders');
const doseRoutes = require('./routes/doses');
const dashboardRoutes = require('./routes/Dashboard');
const pool = require('./utils/db');

const app = express();

// 🔐 Trust proxy (for secure cookies/auth headers via Vercel/Render)
app.set('trust proxy', 1);

// 📦 Parsers
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// 🌐 CORS Configuration
const allowedOrigins = [
  'http://localhost:3000',
  'https://pill-prompt-1l73.vercel.app',
  'https://pill-prompt-1l73-efc6bmcd6-pratiks-projects-1e4951dd.vercel.app'
];
const previewPattern = /^https:\/\/pill-prompt-1l73-[^.]+\.vercel\.app$/;

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || previewPattern.test(origin)) {
      return callback(null, true);
    }
    console.warn(`🚫 CORS Blocked: ${origin}`);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 🚪 Preflight support
app.options('*', cors());

// 🧩 Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/medications', medicationRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/doses', doseRoutes);
app.use('/api/dashboard', dashboardRoutes);

// 🧪 Test DB connection
app.get('/api/test-db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users LIMIT 1');
    res.json({ ok: true, userSample: rows });
  } catch (err) {
    console.error('DB test error:', err);
    res.status(500).json({ ok: false, error: 'DB connection failed' });
  }
});

// 🛠 404 fallback
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

// 🔥 Error handler (CORS-safe JSON response)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message || err);
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ message: 'Blocked by CORS policy' });
  }
  res.status(500).json({ message: 'Server error' });
});

module.exports = app;