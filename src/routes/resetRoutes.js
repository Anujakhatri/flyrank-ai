const express = require('express');
const router = express.Router();

const taskController = require('../controllers/resetController');

/**
 * @openapi
 * /reset:
 *   post:
 *     summary: Reset tasks to the original seed data
 *     responses:
 *       200:
 *         description: Tasks reset
 */

router.post('/', taskController.resetTasks);

module.exports = router;