const pool = require('../utils/db');

exports.takeDose = async (req, res) => {
  try {
    const medication_id = req.params.id;
    // Verify medication ownership
    const [med] = await pool.query('SELECT * FROM medications WHERE id = ? AND user_id = ?', [medication_id, req.user.id]);
    if (med.length === 0) return res.status(404).json({ message: 'Medication not found' });

    await pool.query(
      'INSERT INTO dose_logs (user_id, medication_id, status) VALUES (?, ?, ?)',
      [req.user.id, medication_id, 'taken']
    );

    res.json({ message: 'Dose marked as taken' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.missDose = async (req, res) => {
  try {
    const medication_id = req.params.id;
    // Verify medication ownership
    const [med] = await pool.query('SELECT * FROM medications WHERE id = ? AND user_id = ?', [medication_id, req.user.id]);
    if (med.length === 0) return res.status(404).json({ message: 'Medication not found' });

    await pool.query(
      'INSERT INTO dose_logs (user_id, medication_id, status) VALUES (?, ?, ?)',
      [req.user.id, medication_id, 'missed']
    );

    res.json({ message: 'Dose marked as missed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
