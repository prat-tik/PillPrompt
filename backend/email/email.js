require('dotenv').config(); // ✅ Load environment variables

const nodemailer = require('nodemailer');
const cron = require('node-cron');
const pool = require('../utils/db'); // Adjust the path if needed

// ✅ Email transporter setup (using Gmail + app password)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'pratikkhatiwada00@gmail.com',
    pass: 'lfis cvsc hrah pfdt', // App password, not regular Gmail password
  },
});

// 📧 Function to send reminder email
function sendReminderEmail(to, subject, text) {
  const mailOptions = {
    from: '"PillPrompt Reminder" <pratikkhatiwada00@gmail.com>',
    to: to,           // Use the 'to' parameter passed to the function
    subject: subject, // Use the 'subject' parameter
    text: text        // Use the 'text' parameter
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Error sending email:', err);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}
cron.schedule('10 * * * * *', async () => {
  console.log('Checking reminders...');

  try {
    // Fetch reminders due within the last 2 minutes (adjust condition as needed)
    const [rows] = await pool.query(
      `SELECT r.*, u.email,u.name, m.medicine 
       FROM reminders r 
       JOIN users u ON r.user_id = u.id 
       JOIN medications m ON r.medication_id = m.id 
       WHERE r.method = 'Email' 
         AND NOW() >= r.time AND NOW() < DATE_ADD(r.time, INTERVAL 2 MINUTE)`
    );
    const cleanReminders = Array.isArray(rows)
      ? rows.filter(r => r && typeof r === 'object' && r.email && r.id)
      : [];

    for (const rem of cleanReminders) {
      try {
        // Send reminder email if email exists
        await sendReminderEmail(
          rem.email,
          'Medication Reminder',
          `Hi ${rem.name}, this is a reminder to take your medication: ${rem.medicine} at ${rem.time}`
        );

        // Update reminder status to 'Sent'
        await pool.query("UPDATE reminders SET status='Sent' WHERE id=?", [rem.id]);

        console.log(`Reminder sent to: ${rem.email} for medication: ${rem.medicine}`);

      } catch (err) {
        console.error(`Error sending or updating reminder for id: ${rem.id}`, err);
      }
    }
  }
  catch (err) {
    console.error("Error querying or processing reminders:", err);
  }
});

console.log('Email reminder service started');
