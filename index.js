const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');

const openapi = require('./openai.json');

app.use(express.json());  //middleware to parse JSON request body
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapi));

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

app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  const { title, done } = req.body || {};

  // at least one valid field must be present
  if (title === undefined && done === undefined) {
    return res.status(400).json({ error: "Provide at least 'title' or 'done' to update" });
  }

  if (title !== undefined) {
    if (typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ error: "Title must be a non-empty string" });
    }
    task.title = title.trim();
  }

  if (done !== undefined) {
    if (typeof done !== 'boolean') {
      return res.status(400).json({ error: "Done must be a boolean" });
    }
    task.done = done;
  }

  res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
  const id= parseInt(req.params.id);
  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks.splice(taskIndex, 1);
  res.status(204).send();  // No content response
});


app.get('/health', (req, res) =>{ 
  res.json({status: "ok"})
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});