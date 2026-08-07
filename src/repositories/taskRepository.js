// const { tasks, SEED_DATA } = require('../data/tasks');

let nextId = Math.max(...tasks.map(t => t.id)) + 1;

const pool = require('../config/db');

async function intializeDb(){
    //create table if not exists
    await pool.query(`
        CREATE TABLE IF NOT EXISTS tasks (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            done BOOLEAN DEFAULT false
        );
    `);
}
function findAll() {
    return tasks;
}

function findById(id) {
    return tasks.find(t => t.id === id);
}

function create(task) {
    const newTask = {
        id: nextId++,
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

function reset() {
    tasks.length = 0;
    tasks.push(...SEED_DATA.map(t => ({ ...t })));
    nextId = Math.max(...tasks.map(t => t.id)) + 1;
    return tasks;
}

module.exports = { findAll, findById, create, update, remove, reset };