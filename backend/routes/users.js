const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../Controllers/userController');

router.get('/me', auth, userController.getMe);

module.exports = router;
