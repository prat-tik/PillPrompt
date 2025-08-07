const pool = require('../utils/db');

// Helper to get current date-time in MySQL format
function getCurrentDateTime() {
  return new Date().toISOString().slice(0, 19).replace('T', ' ');
}

// Mark dose as taken
exports.takeDose = async (req, res) => {
  try {
    const medication_id = req.params.id;
    const [med] = await pool.query(
      'SELECT * FROM medications WHERE id = ? AND user_id = ?',
      [medication_id, req.user.id]
    );
    if (med.length === 0)
      return res.status(404).json({ message: 'Medication not found' });

    const takenAt = getCurrentDateTime();

    await pool.query(
      'INSERT INTO dose_logs (user_id, medication_id, taken_at, status) VALUES (?, ?, ?, ?)',
      [req.user.id, medication_id, takenAt, 'taken']
    );
    res.json({ message: 'Dose marked as taken', taken_at: takenAt });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Mark dose as missed
exports.missDose = async (req, res) => {
  try {
    const medication_id = req.params.id;
    const [med] = await pool.query(
      'SELECT * FROM medications WHERE id = ? AND user_id = ?',
      [medication_id, req.user.id]
    );
    if (med.length === 0)
      return res.status(404).json({ message: 'Medication not found' });

    const takenAt = getCurrentDateTime();

    await pool.query(
      'INSERT INTO dose_logs (user_id, medication_id, taken_at, status) VALUES (?, ?, ?, ?)',
      [req.user.id, medication_id, takenAt, 'missed']
    );
    res.json({ message: 'Dose marked as missed', taken_at: takenAt });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// CREATE (manual entry: admin or user can directly add a dose log)
exports.create = async (req, res) => {
  try {
    const { medication_id, taken_at, status } = req.body;
    await pool.query(
      'INSERT INTO dose_logs (user_id, medication_id, taken_at, status) VALUES (?, ?, ?, ?)',
      [req.user.id, medication_id, taken_at, status]
    );
    res.json({ message: 'Dose log created' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// READ ALL (get all logs for user, optional: filter by medication)
exports.getAll = async (req, res) => {
  try {
    const medication_id = req.query.medication_id;
    let query = 'SELECT * FROM dose_logs WHERE user_id = ?';
    let params = [req.user.id];
    if (medication_id) {
      query += ' AND medication_id = ?';
      params.push(medication_id);
    }
    const [logs] = await pool.query(query, params);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const dose_log_id = req.params.log_id;
    const { taken_at, status } = req.body;
    const [result] = await pool.query(
      'UPDATE dose_logs SET taken_at = ?, status = ? WHERE id = ? AND user_id = ?',
      [taken_at, status, dose_log_id, req.user.id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Dose log not found' });

    res.json({ message: 'Dose log updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE
exports.delete = async (req, res) => {
  try {
    const dose_log_id = req.params.log_id;
    const [result] = await pool.query(
      'DELETE FROM dose_logs WHERE id = ? AND user_id = ?',
      [dose_log_id, req.user.id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Dose log not found' });
    res.json({ message: 'Dose log deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
