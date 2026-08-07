const taskRepository = require('../repositories/taskRepository');

async function resetTasks() {
    return await taskRepository.reset();
}

module.exports = { resetTasks };
