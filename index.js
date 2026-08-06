const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task CRUD API',
      version: '1.0.0',
      description: 'A simple task management API built step by step'
    },
    servers: [{ url: 'http://localhost:3000' }],
    components: {
      schemas: {
        Task: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            title: { type: 'string', example: 'Buy Book' },
            done: { type: 'boolean', example: false }
          }
        }
      }
    }
  },
  apis: ['./index.js'] // JSDoc comments yही file bata padhcha
};

const openapiSpec = swaggerJsdoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpec));

const tasks = require('./src/data/tasks');

app.get('/', (req, res) => {
  res.send("Hello Server!!");
});

/**
 * @openapi
 * /tasks:
 *   get:
 *     summary: List all tasks (supports filtering, search, and pagination)
 *     parameters:
 *       - name: done
 *         in: query
 *         schema: { type: boolean }
 *         description: Filter tasks by done status
 *       - name: search
 *         in: query
 *         schema: { type: string }
 *         description: Filter tasks whose title contains this text
 *       - name: limit
 *         in: query
 *         schema: { type: integer }
 *         description: Max number of tasks to return
 *       - name: offset
 *         in: query
 *         schema: { type: integer }
 *         description: Number of tasks to skip before collecting results
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
app.get('/tasks', (req, res) => {
  let result = tasks;
  const { done, search, limit, offset } = req.query;

  if (done !== undefined) {
    const isDone = done === 'true';
    result = result.filter(task => task.done === isDone);
  }

  if (search) {
    const term = search.toLowerCase();
    result = result.filter(task => task.title.toLowerCase().includes(term));
  }

  // pagination applies LAST, after all filters
  const offsetNum = parseInt(offset) || 0;
  const limitNum = limit !== undefined ? parseInt(limit) : result.length;

  const paginated = result.slice(offsetNum, offsetNum + limitNum);

  res.json(paginated);
});

/**
 * @openapi
 * /tasks/{id}:
 *   get:
 *     summary: Get a single task by id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: The task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 */
app.get('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === id);
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

/**
 * @openapi
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string, example: "Buy book" }
 *             required: [title]
 *     responses:
 *       201:
 *         description: Task created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Missing or empty title
 */
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: "Title is required and cannot be empty" });
  }

  const newTask = {
    id: tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
    title: title.trim(),
    done: false
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

/**
 * @openapi
 * /tasks/{id}:
 *   put:
 *     summary: Update a task's title and/or done status
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string, example: "Read Nodejs book" }
 *               done: { type: boolean, example: true }
 *     responses:
 *       200:
 *         description: Updated task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Invalid or empty body
 *       404:
 *         description: Task not found
 */
app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  const { title, done } = req.body || {};

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

/**
 * @openapi
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204:
 *         description: Task deleted, no content
 *       404:
 *         description: Task not found
 */
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks.splice(taskIndex, 1);
  res.status(204).send();
});

/**
 * @openapi
 * /stats:
 *   get:
 *     summary: Get task counts (total, done, open)
 *     responses:
 *       200:
 *         description: Task statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total: { type: integer, example: 7 }
 *                 done: { type: integer, example: 3 }
 *                 open: { type: integer, example: 4 }
 */
app.get('/stats', (req, res) => {
  const total = tasks.length;
  const done = tasks.filter((t) => t.done).length;
  const open = total - done;
  res.json({ total, done, open });
});

/**
 * @openapi
 * /reset:
 *   post:
 *     summary: Reset tasks to the original seed data
 *     responses:
 *       200:
 *         description: Tasks reset
 */
app.post('/reset', (req, res) => {
  tasks.length = 0;
  tasks.push(
    { id: 1, title: "Learn Node.js", done: true },
    { id: 2, title: "Understand Express.js", done: true },
    { id: 3, title: "Middleware Concept", done: false }
  );
  res.json({ message: "Tasks reset", tasks });
});

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health check
 *     responses:
 *       200:
 *         description: Server is running
 */
app.get('/health', (req, res) => {
  res.json({ status: "ok" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});