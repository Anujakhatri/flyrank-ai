// Controller layer — only handles req/res, delegates to service, forwards errors.

const taskService = require('../services/taskService');

function listTasks(req, res, next) {
  try {
    const { data, total } = taskService.listTasks(req.query);
    res.status(200).json({ data, total, count: data.length });
  } catch (err) {
    next(err);
  }
}

function getTask(req, res, next) {
  try {
    const task = taskService.getTask(req.params.id);
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
}

function createTask(req, res, next) {
  try {
    const task = taskService.createTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
}

function updateTask(req, res, next) {
  try {
    const task = taskService.updateTask(req.params.id, req.body);
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
}

function deleteTask(req, res, next) {
  try {
    taskService.deleteTask(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { listTasks, getTask, createTask, updateTask, deleteTask };
