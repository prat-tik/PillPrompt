const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const doseController = require('../Controllers/doseController');

// Get all doses
router.get('/', auth, doseController.getAll);

// Create a new dose
router.post('/create', auth, doseController.create);

// Update an existing dose
router.put('/:id', auth, doseController.update);

// Delete a dose
router.delete('/:id', auth, doseController.delete);

// Take a dose
router.post('/:id/take', auth, doseController.takeDose);

// Miss a dose
router.post('/:id/miss', auth, doseController.missDose);

module.exports = router;