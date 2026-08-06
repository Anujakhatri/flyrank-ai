const express = require('express');
const router = express.Router();
const statsService = require('../services/statsService');

router.get('/', (req, res) => {
    res.json(statsService.getStats());
});

module.exports = router;