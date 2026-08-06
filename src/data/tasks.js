// In-memory data store and seed values.
const DEFAULT_TASKS = [
  { id: 1, title: 'Buy groceries', done: false },
  { id: 2, title: 'Read a book', done: true },
  { id: 3, title: 'Write project docs', done: false },
  { id: 4, title: 'Workout', done: true },
];

let tasks = [...DEFAULT_TASKS];
let nextId = tasks.length + 1;

function getAll() {
  return tasks;
}

function setAll(newTasks) {
  tasks = [...newTasks];
  nextId = tasks.length + 1;
}

function getNextId() {
  return nextId++;
}

module.exports = { getAll, setAll, getNextId, DEFAULT_TASKS };
