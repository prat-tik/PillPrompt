require('dotenv').config();

const app = require('./app');
const cron = require('node-cron');

// Optional: kick off any scheduled jobs here
// cron.schedule('*/5 * * * *', () => {
//   console.log('Cron job running every 5 minutes');
// });

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown (optional)
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.close(() => process.exit(0));
});
process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully...');
  server.close(() => process.exit(0));
});