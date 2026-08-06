const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Check API health
 *     description: Returns the health status of the API
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 */
router.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});

module.exports = router;