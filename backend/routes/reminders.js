const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const reminderController = require('../Controllers/reminderController');

router.get('/', auth, reminderController.getAll);
router.post('/', auth, reminderController.create);
router.put('/:id', auth, reminderController.update);
router.delete('/:id', auth, reminderController.delete);

module.exports = router;
