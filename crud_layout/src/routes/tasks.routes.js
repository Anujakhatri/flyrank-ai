const express = require('express');
const router = express.Router();
const tasksService = require('../services/tasks.service');

// ---------------------------------------------------------------------------
// Stage 2 — Read: list + single task
// ---------------------------------------------------------------------------
router.get('/tasks', (req, res) => {
  const result = tasksService.getTasks(req.query);
  res.json(result);
});

// ---------------------------------------------------------------------------
// Extras — stats
// ---------------------------------------------------------------------------
router.get('/stats', (req, res) => {
  const stats = tasksService.getStats();
  res.json(stats);
});

// Extras — reset back to example tasks
router.post('/reset', (req, res) => {
  const tasks = tasksService.resetTasks();
  res.json(tasks);
});

// ---------------------------------------------------------------------------
// Stage 3 — Create
// ---------------------------------------------------------------------------
router.post('/tasks', (req, res) => {
  const task = tasksService.createTask(req.body);
  res.status(201).json(task);
});

router.get('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const task = tasksService.getTaskById(id);
  res.json(task);
});

// ---------------------------------------------------------------------------
// Stage 4 — Update & Delete
// ---------------------------------------------------------------------------
router.put('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const task = tasksService.updateTask(id, req.body);
  res.json(task);
});

router.delete('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  tasksService.deleteTask(id);
  res.status(204).send();
});

module.exports = router;
