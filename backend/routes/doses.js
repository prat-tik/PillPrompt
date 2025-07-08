const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const doseController = require('../Controllers/doseController');

router.post('/:id/take', auth, doseController.takeDose);
router.post('/:id/miss', auth, doseController.missDose);

module.exports = router;
