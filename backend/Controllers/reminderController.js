const pool = require('../utils/db');

exports.getAll = async (req, res) => {
  try {
    const [reminders] = await pool.query('SELECT * FROM reminders WHERE user_id = ?', [req.user.id]);
    res.json(reminders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.create = async (req, res) => {
  try {
    
    const { medication_id, time, method, status } = req.body;
    if (!medication_id || !time) return res.status(400).json({ message: 'Missing fields' });

    // Verify medication belongs to user
    const [med] = await pool.query('SELECT * FROM medications WHERE id = ? AND user_id = ?', [medication_id, req.user.id]);
    if (med.length === 0) return res.status(400).json({ message: 'Invalid medication_id' });

    const [result] = await pool.query(
      'INSERT INTO reminders (user_id, medication_id, time, method) VALUES (?, ?, ?, ?)',
      [req.user.id, medication_id, time, method ,status|| 'Email']
    );

    const [reminder] = await pool.query('SELECT * FROM reminders WHERE id = ?', [result.insertId]);
    res.status(201).json(reminder[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.update = async (req, res) => {
  try {
    const { medication_id, time, method, status } = req.body;

    // Build dynamic query parts
    const fields = [];
    const values = [];

    if (medication_id) {
      // Validate medication ownership
      const [med] = await pool.query('SELECT * FROM medications WHERE id = ? AND user_id = ?', [medication_id, req.user.id]);
      if (med.length === 0) return res.status(400).json({ message: 'Invalid medication_id' });
      fields.push('medication_id = ?');
      values.push(medication_id);
    }
    if (time) { fields.push('time = ?'); values.push(time); }
    if (method) { fields.push('method = ?'); values.push(method); }
    if (status) { fields.push('status = ?'); values.push(status); }

    if (fields.length === 0) return res.status(400).json({ message: 'No fields to update' });

    values.push(req.params.id, req.user.id);

    const [result] = await pool.query(
      `UPDATE reminders SET ${fields.join(', ')} WHERE id = ? AND user_id = ?`,
      values
    );

    if (result.affectedRows === 0) return res.status(404).json({ message: 'Reminder not found' });

    const [reminder] = await pool.query('SELECT * FROM reminders WHERE id = ?', [req.params.id]);
    res.json(reminder[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.delete = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM reminders WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Reminder not found' });
    res.json({ message: 'Reminder deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
