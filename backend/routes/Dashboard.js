const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const dashboardController = require('../Controllers/dashboardController');

// Get dashboard data for the authenticated user
router.get('/', auth, dashboardController.getDashboard);

// (Optional) Add more dashboard-related routes as needed
// router.post('/some-action', auth, dashboardController.someAction);

module.exports = router;
