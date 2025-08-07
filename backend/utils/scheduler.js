const pool = require('./db');

// This runs every minute and logs reminders due at current time
const sendDueReminders = async () => {
  try {
    const now = new Date();
    const hhmm = now.toTimeString().slice(0, 5); // "HH:mm"

    const [reminders] = await pool.query(
      'SELECT r.id, r.method, u.email, m.name, m.dosage FROM reminders r JOIN users u ON r.user_id = u.id JOIN medications m ON r.medication_id = m.id WHERE r.time = ?',
      [hhmm]
    );

    for (const reminder of reminders) {
      console.log(`Sending ${reminder.method} reminder to ${reminder.email}: Take ${reminder.name} (${reminder.dosage}) now.`);
      // Here you would integrate with Twilio, SendGrid, etc.

      // Mark reminder as sent
      await pool.query('UPDATE reminders SET status = "sent" WHERE id = ?', [reminder.id]);
    }
  } catch (err) {
    console.error('Error sending reminders:', err);
  }
};

module.exports = { sendDueReminders };
