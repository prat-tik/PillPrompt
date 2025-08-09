require('dotenv').config();
const app = require('./app');
const cron = require('node-cron');
const pool = require('./utils/db');
const PORT = process.env.PORT || 5000;
const mail = require('./email/email');
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

