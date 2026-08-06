const taskRepository = require('../repositories/taskRepository');

function getAll(filters){
    let result = taskRepository.findAll();

    if (filters.done !== undefined) {
        const isDone = filters.done === 'true'; 
        result = result.filter(task => task.done === isDone);
    }

    if (filters.search){
        const term = filters.search.toLowerCase();
        result = result.filter(task => task.title.toLowerCase().includes(term));
    }

    const offset = parseInt(filters.offset) || 0;
    const limit = filters.limit !== undefined ? parseInt(filters.limit) : result.length;
    result = result.slice(offset, offset + limit);

    return result;
}

function getById(id){
    const task = taskRepository.findById(id);
    if (!task) {
        const error = new Error("Task not found");
        error.status = 404;
        throw error;
    }
    return task;
}

function createTask(title){
    if (!title || title.trim() === '') {
        const error = new Error("Title is required and cannot be empty");
        error.status = 400;
        throw error;
    }
    return taskRepository.create({title: title.trim() });
}

function updateTask(id, updates){
    const task = taskRepository.findById(id);
    if (!task) {
        const error = new Error("Task not found");
        error.status = 404;
        throw error;
    }

    const {title, done } = updates;

    if (title === undefined && done === undefined) {
        const error = new Error("Provide at least 'title' or 'done' to update");
        error.status = 400;
        throw error;
    }

    if (title !== undefined) {
        if (typeof title !== 'string' || title.trim() === '') {
            const error = new Error("Title must be a non-empty string");
            error.status = 400;
            throw error;
        }
    }

    if (done !== undefined && typeof done !== 'boolean') {
        const error = new Error("Done must be a boolean");
        error.status = 400;
        throw error;
    }

    return taskRepository.update(id, { title, done });
}

function deleteTask(id){
const task = taskRepository.findById(id);
    if (!task) {
        const error = new Error("Task not found");
        error.status = 404;
        throw error;
    }
    return taskRepository.remove(id);
}

module.exports = { getAll, getById, createTask, updateTask, deleteTask };