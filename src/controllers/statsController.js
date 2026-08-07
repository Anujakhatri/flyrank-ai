const statsService = require('../services/statsService');

async function getStats(req, res, next){
    try {
        const result = await statsService.getStats();
        res.json(result);
    } catch (error) {
        next(error);
    }
}

module.exports = { getStats };