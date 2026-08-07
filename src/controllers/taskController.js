// http handling middleware
const taskService = require('../services/taskService');

async function getTasks(req, res, next){
    try {
        const result = await taskService.getAll(req.query);
        res.json(result);
    } catch (error) {
        next(error);
    }
}

async function getTaskById(req, res, next){
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            const error = new Error("Invalid task ID");
            error.status = 400;
            throw error;
        }
        const task = await taskService.getById(id);
        res.json(task);
    } catch (error) {
        next(error);
    }
}

async function createTask(req, res, next){
    try {
        const task = await taskService.createTask(req.body.title);
        res.status(201).json(task);
    } catch (error) {
        next(error);
    }
}

async function updateTask(req, res, next){
    try{
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            const error = new Error("Invalid task ID");
            error.status = 400;
            throw error;
        }
        const task = await taskService.updateTask(id, req.body || {});
        res.json(task);
    } catch (error) {
        next(error);
    }
}

async function deleteTask(req, res, next){
    try{
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            const error = new Error("Invalid task ID");
            error.status = 400;
            throw error;
        }
        await taskService.deleteTask(id);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
}
module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask };
