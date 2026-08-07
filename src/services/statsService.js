const taskRepository = require('../repositories/taskRepository');

async function getStats() {
    return await taskRepository.getStats();
}

module.exports = { getStats };