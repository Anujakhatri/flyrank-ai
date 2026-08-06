// Controller for /stats.
const taskService = require('../services/taskService');

function getStats(req, res, next) {
  try {
    const stats = taskService.getStats();
    res.status(200).json(stats);
  } catch (err) {
    next(err);
  }
}

module.exports = { getStats };
