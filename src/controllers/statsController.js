const taskService = require('../services/taskService');

function getStats(req, res, next){
    try {
        const result = taskService.getStats();
        res.json(result);
    } catch (error) {
        next(error);
    }
}

module.exports = { getStats };