// routes/dashboard.js
const express = require('express');
const pool = require('../utils/db');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const userId = req.user.id;
  const user = {
    id: req.user.id,
    name: req.user.name,
    role: req.user.role,
    photo: req.user.photo
  };
  const [medications] = await pool.query(
    'SELECT id, name, medicine, sex, unit, dosage FROM medications WHERE user_id = ?', [userId]
  );
  const [reminders] = await pool.query(
    'SELECT r.id, r.time, r.method, r.status, m.name,r.medication_id AS medication_name FROM reminders r JOIN medications m ON r.medication_id = m.id WHERE r.user_id = ?', [userId]
  );
  const [doseLogs] = await pool.query(
    'SELECT d.id, d.taken_at, d.status, m.name AS medication_name FROM dose_logs d JOIN medications m ON d.medication_id = m.id WHERE d.user_id = ? ORDER BY d.taken_at DESC LIMIT 10', [userId]
  );

  res.json({
    user,
    medications,
    reminders,
    doseLogs
  });
});

module.exports = router;
