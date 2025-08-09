require('dotenv').config(); // ✅ Load environment variables

const nodemailer = require('nodemailer');
const cron = require('node-cron');
const pool = require('../utils/db'); // Adjust the path if needed

// ✅ Email transporter setup (using Gmail + app password)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'ghimiresampada1729@gmail.com',
    pass: 'nlch zmtp cbjn laqt', // App password, not regular Gmail password
  },
});

// 📧 Function to send reminder email
function sendReminderEmail(to, subject, text) {
  const mailOptions = {
    from: '"PillPrompt Reminder" <ghimiresampada1729@gmail.com>',
    to: to,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Error sending email:', err);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

// ⏱ Cron job to run every minute at 10th second
cron.schedule('10 * * * * *', async () => {
  console.log('Checking reminders...');

  try {
    const [reminders] = await pool.query(
      `SELECT r.*, u.email 
       FROM reminders r 
       JOIN users u ON r.user_id = u.id 
       WHERE r.method = 'Email' 
       AND NOW() >= r.time  
       AND NOW() < DATE_ADD(r.time, INTERVAL 4 MINUTE)
       AND r.status = 'enabled'`
    );

    reminders.forEach(async (reminder) => {
      console.log('Processing reminder:', reminder);

      if (reminder.email) {
        sendReminderEmail(
          reminder.email,
          'Medication Reminder',
          `Hi, this is a reminder to take your medication at ${reminder.time}`
        );

        await pool.query("UPDATE reminders SET status='Sent' WHERE id=?", [reminder.id]);
      } else {
        console.warn(`Skipping reminder id ${reminder.id} because email is missing.`);
      }
    });

    console.log('Fetched reminders:', reminders.length);
  } catch (err) {
    console.error('Error querying reminders:', err);
  }
});

console.log('Email reminder service started');
