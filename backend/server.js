require('dotenv').config();
const app = require('./app');
const cron = require('node-cron');
const pool = require('./utils/db');
const PORT = process.env.PORT || 5000;
const mail = require('./email/email');
// Scheduler: run every minute to send reminders (console log stub)
// const sendDueReminders = async () => {
//   try {
//     const now = new Date();
//     const hhmm = now.toTimeString().slice(0, 5);

//     const [reminders] = await pool.query(
//       `SELECT r.id, r.method, u.email, m.name, m.dosage
//        FROM reminders r
//        JOIN users u ON r.user_id = u.id
//        JOIN medications m ON r.medication_id = m.id
//        WHERE r.time AND r.status = 'Pending' and r.time <= NOW()`,
//       [hhmm]
//     );

//     for (const reminder of reminders) {
//       console.log(`Reminder for ${reminder.email}: Take ${reminder.name} (${reminder.dosage}) now via ${reminder.method}`);
//       await pool.query('UPDATE reminders SET status = "sent" WHERE id = ?', [reminder.id]);
//     }
//   } catch (err) {
//     console.error('Error sending reminders:', err);
//   }
// };

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// cron.schedule('* * * * *', sendDueReminders);

