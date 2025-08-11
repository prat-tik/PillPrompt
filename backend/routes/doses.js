const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const doseController = require('../Controllers/doseController');
router.get('/', auth, doseController.getAll);
router.post('/create', auth, doseController.create);
router.put('/:id', auth, doseController.update);
router.delete('/:id', auth, doseController.delete);
// Existing
router.post('/:id/take', auth, doseController.takeDose);
router.post('/:id/miss', auth, doseController.missDose);
module.exports = router;
