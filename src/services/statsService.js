const taskRepository = require('../repositories/taskRepository');

async function getStats(){
    const all = await taskRepository.findAll();
    const total = all.length;
    const completed = all.filter(task => task.done).length;
    const pending = total - completed;
    return { total, completed, pending };
}

module.exports = { getStats };