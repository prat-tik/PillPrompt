const pool = require('../utils/db');

exports.getAll = async (req, res) => {
  try {
    const [meds] = await pool.query('SELECT * FROM medications WHERE user_id = ?', [req.user.id]);
    res.json(meds);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.create = async (req, res) => {
  try {
    const { name, dosage, schedule, times, notes } = req.body;
    const timesJson = JSON.stringify(times || []);
    const [result] = await pool.query(
      'INSERT INTO medications (user_id, name, dosage, schedule, times, notes) VALUES (?, ?, ?, ?, ?, ?)',
      [req.user.id, name, dosage, schedule, timesJson, notes || null]
    );
    const [med] = await pool.query('SELECT * FROM medications WHERE id = ?', [result.insertId]);
    res.status(201).json(med[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.update = async (req, res) => {
  try {
    const { name, dosage, schedule, times, notes } = req.body;
    const timesJson = times ? JSON.stringify(times) : undefined;

    // Build dynamic query parts
    const fields = [];
    const values = [];

    if (name) { fields.push('name = ?'); values.push(name); }
    if (dosage) { fields.push('dosage = ?'); values.push(dosage); }
    if (schedule) { fields.push('schedule = ?'); values.push(schedule); }
    if (timesJson !== undefined) { fields.push('times = ?'); values.push(timesJson); }
    if (notes !== undefined) { fields.push('notes = ?'); values.push(notes); }

    if (fields.length === 0) return res.status(400).json({ message: 'No fields to update' });

    values.push(req.params.id, req.user.id);

    const [result] = await pool.query(
      `UPDATE medications SET ${fields.join(', ')} WHERE id = ? AND user_id = ?`,
      values
    );

    if (result.affectedRows === 0) return res.status(404).json({ message: 'Medication not found' });

    const [med] = await pool.query('SELECT * FROM medications WHERE id = ?', [req.params.id]);
    res.json(med[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.delete = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM medications WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Medication not found' });
    res.json({ message: 'Medication deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
