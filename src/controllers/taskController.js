// http handling middleware
const taskService = require('../services/taskService');

function getTasks(req, res, next){
    try {
        const result = taskService.getAll(req.query);
        res.json(result);
    } catch (error) {
        next(error);
    }
}

function getTaskById(req, res, next){
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            const error = new Error("Invalid task ID");
            error.status = 400;
            throw error;
        }
        const task = taskService.getById(id);
        res.json(task);
    } catch (error) {
        next(error);
    }
}

function createTask(req, res, next){
    try {
        const task = taskService.createTask(req.body.title);
        res.status(201).json(task);
    } catch (error) {
        next(error);
    }
}

function updateTask(req, res, next){
    try{
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            const error = new Error("Invalid task ID");
            error.status = 400;
            throw error;
        }
        const task = taskService.updateTask(id, req.body || {});
        res.json(task);
    } catch (error) {
        next(error);
    }
}

function deleteTask(req, res, next){
    try{
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            const error = new Error("Invalid task ID");
            error.status = 400;
            throw error;
        }
        taskService.deleteTask(id);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
}
module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask };
