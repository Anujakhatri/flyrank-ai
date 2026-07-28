const BASE_TASKS = [
  { id: 1, title: 'Drink water', done: true },
  { id: 2, title: 'Walk for 10 minutes', done: false },
  { id: 3, title: 'Prepare breakfast', done: false },
  { id: 4, title: 'Prepare for work', done: true },
];

const tasks = BASE_TASKS.map((task) => ({ ...task }));

function findAll() {
  return tasks;
}

function findById(id) {
  return tasks.find((t) => t.id === id);
}

function create(taskData) {
  const id = tasks.length === 0 ? 1 : Math.max(...tasks.map((t) => t.id)) + 1;
  const task = { id, title: taskData.title, done: false };
  tasks.push(task);
  return task;
}

function update(task, updates) {
  if (updates.title !== undefined) {
    task.title = updates.title;
  }
  if (updates.done !== undefined) {
    task.done = updates.done;
  }
  return task;
}

function remove(index) {
  tasks.splice(index, 1);
}

function findIndexById(id) {
  return tasks.findIndex((t) => t.id === id);
}

function getStats() {
  const doneCount = tasks.filter((t) => t.done).length;
  return {
    total: tasks.length,
    done: doneCount,
    open: tasks.length - doneCount,
  };
}

function reset() {
  tasks.length = 0;
  tasks.push(...BASE_TASKS.map((task) => ({ ...task })));
  return tasks;
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
  findIndexById,
  getStats,
  reset,
};
