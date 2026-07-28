const tasksRepo = require('../repositories/tasks.repository');
const { ValidationError, NotFoundError } = require('../errors');

function getTasks(query) {
  let result = tasksRepo.findAll();

  // Filter by done status
  if (query.done !== undefined) {
    if (query.done !== 'true' && query.done !== 'false') {
      throw new ValidationError('done must be true or false');
    }
    const done = query.done === 'true';
    result = result.filter((t) => t.done === done);
  }

  // Filter by search word
  if (query.search !== undefined) {
    const word = String(query.search).trim();
    if (word === '') {
      throw new ValidationError('search must not be empty');
    }
    const lower = word.toLowerCase();
    result = result.filter((t) => t.title.toLowerCase().includes(lower));
  }

  return result;
}

function getTaskById(id) {
  const task = tasksRepo.findById(id);
  if (!task) {
    throw new NotFoundError(`Task ${id} not found`);
  }
  return task;
}

function createTask(data) {
  const { title } = data;

  if (title === undefined || title === null || String(title).trim() === '') {
    throw new ValidationError('title is required and cannot be empty');
  }

  return tasksRepo.create({ title: String(title).trim() });
}

function updateTask(id, data) {
  const task = tasksRepo.findById(id);
  if (!task) {
    throw new NotFoundError(`Task ${id} not found`);
  }

  const { title, done } = data ?? {};
  const hasTitle = Object.prototype.hasOwnProperty.call(data ?? {}, 'title');
  const hasDone = Object.prototype.hasOwnProperty.call(data ?? {}, 'done');

  if (!hasTitle && !hasDone) {
    throw new ValidationError('request body must include title and/or done');
  }

  const updates = {};

  if (hasTitle) {
    if (title === null || String(title).trim() === '') {
      throw new ValidationError('title cannot be empty');
    }
    updates.title = String(title).trim();
  }

  if (hasDone) {
    if (typeof done !== 'boolean') {
      throw new ValidationError('done must be a boolean');
    }
    updates.done = done;
  }

  return tasksRepo.update(task, updates);
}

function deleteTask(id) {
  const index = tasksRepo.findIndexById(id);
  if (index === -1) {
    throw new NotFoundError(`Task ${id} not found`);
  }
  tasksRepo.remove(index);
}

function getStats() {
  return tasksRepo.getStats();
}

function resetTasks() {
  return tasksRepo.reset();
}

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getStats,
  resetTasks,
};
