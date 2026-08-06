const SEED_DATA = [
    { id: 1, title: "Learn Node.js", done: true },
    { id: 2, title: "Understand Express.js", done: true },
    { id: 3, title: "Middleware Concept", done: false },
    { id: 4, title: "MongoDB database", done: false }
];

const tasks = [...SEED_DATA];

module.exports = { tasks, SEED_DATA };