// Service layer — business rules and validation. Throws Error with .status.

const taskRepository = require('../repositories/taskRepository');
const { DEFAULT_TASKS } = require('../data/tasks');

function toBool(v) {
  if (typeof v === 'boolean') return v;
  if (v === 'true' || v === '1' || v === 1) return true;
  if (v === 'false' || v === '0' || v === 0) return false;
  return undefined;
}

function listTasks({ done, search, limit, offset } = {}) {
  let tasks = taskRepository.findAll();

  const doneFilter = toBool(done);
  if (doneFilter !== undefined) {
    tasks = tasks.filter((t) => t.done === doneFilter);
  }

  if (search) {
    const needle = String(search).toLowerCase();
    tasks = tasks.filter((t) => t.title.toLowerCase().includes(needle));
  }

  const total = tasks.length;
  const off = offset ? parseInt(offset, 10) : 0;
  const lim = limit ? parseInt(limit, 10) : tasks.length;
  const start = Number.isFinite(off) ? off : 0;
  const end = start + (Number.isFinite(lim) ? lim : tasks.length);
  const paginated = tasks.slice(start, end);

  return { data: paginated, total };
}

function getTask(id) {
  const taskId = parseInt(id, 10);
  if (!Number.isInteger(taskId) || taskId <= 0) {
    const err = new Error('Invalid task id');
    err.status = 400;
    throw err;
  }
  const task = taskRepository.findById(taskId);
  if (!task) {
    const err = new Error('Task not found');
    err.status = 404;
    throw err;
  }
  return task;
}

function createTask(body) {
  if (!body || typeof body !== 'object') {
    const err = new Error('Request body required');
    err.status = 400;
    throw err;
  }
  const { title } = body;
  if (title === undefined || title === null || String(title).trim() === '') {
    const err = new Error('Title is required and must be a non-empty string');
    err.status = 400;
    throw err;
  }
  return taskRepository.create({ title: String(title).trim(), done: false });
}

function updateTask(id, body) {
  const taskId = parseInt(id, 10);
  if (!Number.isInteger(taskId) || taskId <= 0) {
    const err = new Error('Invalid task id');
    err.status = 400;
    throw err;
  }
  if (!body || typeof body !== 'object') {
    const err = new Error('Request body required');
    err.status = 400;
    throw err;
  }

  const hasTitle = body.title !== undefined;
  const hasDone = body.done !== undefined;

  if (!hasTitle && !hasDone) {
    const err = new Error('At least one of "title" or "done" must be provided');
    err.status = 400;
    throw err;
  }

  const patch = {};
  if (hasTitle) {
    if (body.title === null || String(body.title).trim() === '') {
      const err = new Error('Title must be a non-empty string');
      err.status = 400;
      throw err;
    }
    patch.title = String(body.title).trim();
  }
  if (hasDone) {
    const bool = toBool(body.done);
    if (bool === undefined) {
      const err = new Error('"done" must be a boolean');
      err.status = 400;
      throw err;
    }
    patch.done = bool;
  }

  const updated = taskRepository.update(taskId, patch);
  if (!updated) {
    const err = new Error('Task not found');
    err.status = 404;
    throw err;
  }
  return updated;
}

function deleteTask(id) {
  const taskId = parseInt(id, 10);
  if (!Number.isInteger(taskId) || taskId <= 0) {
    const err = new Error('Invalid task id');
    err.status = 400;
    throw err;
  }
  const removed = taskRepository.remove(taskId);
  if (!removed) {
    const err = new Error('Task not found');
    err.status = 404;
    throw err;
  }
  return removed;
}

function getStats() {
  const all = taskRepository.findAll();
  const totalTasks = all.length;
  const completedTasks = all.filter((t) => t.done).length;
  const pendingTasks = totalTasks - completedTasks;
  return { totalTasks, completedTasks, pendingTasks };
}

function resetTasks() {
  taskRepository.reset(DEFAULT_TASKS);
  return taskRepository.findAll();
}

module.exports = {
  listTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getStats,
  resetTasks,
};
