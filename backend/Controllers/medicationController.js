const pool = require('../utils/db');

// Get all medications for logged-in user
exports.getAll = async (req, res) => {
  try {
    const [meds] = await pool.query(
      'SELECT * FROM medications WHERE user_id = ?',
      [req.user.id]
    );
    res.json(meds);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new medication
exports.create = async (req, res) => {
  try {
    const {
      name,
      sex,
      medicine,
      dosage,
      unit,
      time,
      frequency, 
      notes
    } = req.body;

    if (!name || !sex || !medicine || !dosage || !time) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const [result] = await pool.query(
      `INSERT INTO medications
       (user_id, name, sex, medicine, dosage, unit, time, frequency, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [req.user.id, name, sex, medicine, dosage, unit, time, frequency, notes]
    );
    console.log('New medication created with ID:', result.insertId);

    const [med] = await pool.query('SELECT * FROM medications WHERE id = ?', [result.insertId]);
    res.status(201).json(med[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update medication by ID
exports.update = async (req, res) => {
  try {
    const {
      name,
      sex,
      medicine,
      dosage,
      unit,
      time,
      frequency,
      notes
    } = req.body;

    const fields = [];
    const values = [];

    if (name) { fields.push('name = ?'); values.push(name); }
    if (sex) { fields.push('sex = ?'); values.push(sex); }
    if (medicine) { fields.push('medicine = ?'); values.push(medicine); }
    if (dosage) { fields.push('dosage = ?'); values.push(dosage); }
    if (unit) { fields.push('unit = ?'); values.push(unit); }
    if (time) { fields.push('time = ?'); values.push(time); }
    if (frequency) { fields.push('frequency = ?'); values.push(frequency); }
    if (notes !== undefined) { fields.push('notes = ?'); values.push(notes); }

    if (fields.length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }

    values.push(req.params.id, req.user.id);

    const [result] = await pool.query(
      `UPDATE medications SET ${fields.join(', ')} WHERE id = ? AND user_id = ?`,
      values
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Medication not found' });
    }

    const [updated] = await pool.query('SELECT * FROM medications WHERE id = ?', [req.params.id]);
    res.json(updated[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete medication
exports.delete = async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM medications WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Medication not found' });
    }

    res.json({ message: 'Medication deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};