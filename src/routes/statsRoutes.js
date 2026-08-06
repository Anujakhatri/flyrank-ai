const express = require('express');
const router = express.Router();
const statsService = require('../services/statsService');

/**
 * @openapi
 * /stats:
 *   get:
 *     summary: Get task counts (total, done, open)
 *     responses:
 *       200:
 *         description: Task statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total: { type: integer, example: 7 }
 *                 done: { type: integer, example: 3 }
 *                 open: { type: integer, example: 4 }
 */

router.get('/', (req, res) => {
    res.json(statsService.getStats());
});

module.exports = router;