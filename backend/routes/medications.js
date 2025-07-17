const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const medicationController = require('../Controllers/medicationController');

router.get('/', auth, medicationController.getAll);
router.post('/create', auth, medicationController.create);
router.put('/:id', auth, medicationController.update);
router.delete('/:id', auth, medicationController.delete);

module.exports = router;
