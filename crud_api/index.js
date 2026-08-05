const express = require('express');
const app = express();

app.use(express.json());  //middleware to parse JSON request body

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

app.post('/tasks', (req, res) => {
  const {title} = req.body;  //object destructuring to get title from req.body
  if (!title || title.trim()===''){
    return res.status(400).json({error:"Title is required and cannot be empty"});
  }

  const newTask = {
    id: tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
    title: req.body.title,
    done: false
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.get('/health', (req, res) =>{ 
  res.json({status: "ok"})
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});