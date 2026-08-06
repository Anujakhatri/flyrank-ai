// Controller for POST /reset.
const taskService = require('../services/taskService');

function resetTasks(req, res, next) {
  try {
    const tasks = taskService.resetTasks();
    res.status(200).json({ message: 'Tasks reset to defaults', data: tasks, total: tasks.length });
  } catch (err) {
    next(err);
  }
}

module.exports = { resetTasks };
