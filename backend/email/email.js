const nodemailer = require('nodemailer');
const cron = require('node-cron');
const pool = require('../utils/db'); // Adjust the import based on your project structure
// Configure your email transporter (example: Gmail SMTP, use app password)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'ghimiresampada1729@gmail.com',
    pass: 'nlch zmtp cbjn laqt', // For Gmail, use app password, not your account password
  },
});

// Function to send email
function sendReminderEmail(to, subject, text) {
  const mailOptions = {
    from: '"PillPrompt Reminder" <ghimiresampada1729@gmail.com>',
    to: "ghimiresampada086@gmail.com",           // Use the 'to' parameter passed to the function
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


// Scheduler that runs every minute to check reminders
//const cron = require('node-cron');

cron.schedule('10 * * * * *', async () => {
  console.log('Checking reminders...');

  // Query your DB for due email reminders
  const reminders = await pool.query(
    // "SELECT r.*, u.email FROM reminders r JOIN users u ON r.user_id = u.id WHERE status='enabled' r.method='Email' AND r.time <= NOW()"
    "SELECT r.*, u.email FROM reminders r JOIN users u ON r.user_id = u.id WHERE r.method = 'Email'  AND NOW() >= r.time  AND NOW() < DATE_ADD(r.time, INTERVAL 4 MINUTE)"
  );
  // console.log('Fetched reminders:', reminders);

reminders.forEach(reminder => {
  const rem = reminder[0]; // Assuming reminders is an array of arrays
  // console.log('Processing reminder:', rem.email, rem.time);
  console.log(rem)
  if (rem.email) {                      // Only send if email exists and is not empty
    sendReminderEmail(
      rem.email,
      'Medication Reminder',
      `Hi, this is a reminder to take your medication at ${rem.time}`
    );
    pool.query("UPDATE reminders SET status='Sent' WHERE id=?", [rem.id]);
  } else {
    console.warn(`Skipping reminder id ${rem.id} because email is missing.`);
  }
});
console.log('Fetched reminders:', reminders);


});
console.log('Email reminder service started');
