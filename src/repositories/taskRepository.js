// Repository layer — raw CRUD on the in-memory array. No validation, no HTTP.

const store = require('../data/tasks');

function findAll() {
  return store.getAll();
}

function findById(id) {
  return store.getAll().find((task) => task.id === id) || null;
}

function create(task) {
  const newTask = { id: store.getNextId(), ...task };
  store.getAll().push(newTask);
  return newTask;
}

function update(id, patch) {
  const tasks = store.getAll();
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) return null;
  tasks[index] = { ...tasks[index], ...patch };
  return tasks[index];
}

function remove(id) {
  const tasks = store.getAll();
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) return null;
  const [removed] = tasks.splice(index, 1);
  return removed;
}

function reset(seed) {
  if (!Array.isArray(seed)) {
    throw new Error('Reset seed must be an array');
  }
  store.setAll(seed);
}

module.exports = { findAll, findById, create, update, remove, reset };
