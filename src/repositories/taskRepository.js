const tasks = require('../data/tasks');

function findAll() {
    return tasks;
}

function findById(id) {
    return tasks.find(t => t.id === id);
}

function create(task) {
    const newTask = {
        id: tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
        title: task.title,
        done: false
    };
    tasks.push(newTask);
    return newTask;
}
function update(id, updates) {
    const task = tasks.find(t => t.id === id);
    if (updates.title !== undefined) {
        task.title = updates.title.trim();
    }
    if (updates.done !== undefined) {
        task.done = updates.done;
    }
    return task;
}

function remove(id) {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return false;

    tasks.splice(index, 1);
    return true;
}

function reset(){
    tasks.length = 0; // Clear the array
    tasks.push(
        {id: 1, title: "Learn Node.js", done: true},
        {id: 2, title: "Understand Express.js", done: true},
        {id: 3, title: "Middleware Concept", done: false},
        {id: 4, title: "MongoDB database", done: false}
    );
    return tasks;
}

module.exports = { findAll, findById, create, update, remove, reset };