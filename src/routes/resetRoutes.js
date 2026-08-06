const express = require('express');
const router = express.Router();

const taskController = require('../controllers/resetController');

router.post('/', taskController.resetTasks);

module.exports = router;