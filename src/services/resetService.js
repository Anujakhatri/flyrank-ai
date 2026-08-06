const taskRepository = require('../repositories/taskRepository');

function resetTasks() {
    return taskRepository.reset();
}

module.exports = { resetTasks };
