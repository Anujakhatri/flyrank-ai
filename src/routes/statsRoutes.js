// Route layer — only maps URLs to controllers.

const router = require('express').Router();
const { getStats } = require('../controllers/statsController');

/**
 * @swagger
 * /stats:
 *   get:
 *     summary: Get task statistics
 *     tags: [Stats]
 *     responses:
 *       200:
 *         description: Task counts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalTasks: { type: integer }
 *                 completedTasks: { type: integer }
 *                 pendingTasks: { type: integer }
 */
router.get('/stats', getStats);

module.exports = router;
