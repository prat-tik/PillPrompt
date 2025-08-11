require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = require('./app');
const cron = require('node-cron');
const pool = require('./utils/db');
const mail = require('./email/email');

const PORT = process.env.PORT || 5000;

// ✅ CORS setup for Vercel + local dev
const allowedOrigins = [
  'http://localhost:3000',
  'https://pill-prompt-1l73-4rafped5b-pratiks-projects-1e4951dd.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});