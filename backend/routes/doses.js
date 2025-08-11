const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const doseController = require('../controllers/doseController');  // fix casing: controllers (lowercase)

// Get all dose logs for user
router.get('/', auth, doseController.getAll);

// Create a new dose log
router.post('/', auth, doseController.create);

// Update dose log by ID
router.put('/:id', auth, doseController.update);

// Delete dose log by ID
router.delete('/:id', auth, doseController.delete);

// Mark dose as taken
router.post('/:id/take', auth, doseController.takeDose);

// Mark dose as missed
router.post('/:id/miss', auth, doseController.missDose);

module.exports = router;