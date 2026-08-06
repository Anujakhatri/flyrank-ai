// Route layer — only maps URLs to controllers.

const router = require('express').Router();
const { resetTasks } = require('../controllers/resetController');

/**
 * @swagger
 * /reset:
 *   post:
 *     summary: Reseed tasks to the default set of 4 sample tasks
 *     tags: [Reset]
 *     responses:
 *       200:
 *         description: Tasks reset
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/Task' }
 *                 total: { type: integer }
 */
router.post('/reset', resetTasks);

module.exports = router;
