const tasks = require('../data/tasks');
function reset(){
    tasks.length = 0; // Clear the array
    tasks.push(
        {id: 1, title: "Learn Node.js", done: true},
        {id: 2, title: "Understand Express.js", done: true},
        {id: 3, title: "Middleware Concept", done: false},
        {id: 4, title: "MongoDB database", done: false}
    );
    return tasks;
}
module.exports = { reset };