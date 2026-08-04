const express = require('express');
const app = express();

//export tasks data
const tasks = require('./data/tasks');

app.get('/', (req, res) => {
  res.send("Hello Server!!");
});

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === id);
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

app.get('/health', (req, res) =>{ 
  res.json({status: "ok"})
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});