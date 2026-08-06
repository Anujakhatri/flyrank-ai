const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

/**
 * @openapi
 * /tasks:
 *   get:
 *     summary: List all tasks (supports filtering, search, pagination)
 *     parameters:
 *       - name: done
 *         in: query
 *         schema: { type: boolean }
 *       - name: search
 *         in: query
 *         schema: { type: string }
 *       - name: limit
 *         in: query
 *         schema: { type: integer }
 *       - name: offset
 *         in: query
 *         schema: { type: integer }
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

router.get('/', taskController.getTasks);

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

router.get('/:id', taskController.getTaskById);

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

router.post('/', taskController.createTask);

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
 *               title: { type: string }
 *               done: { type: boolean }
 *     responses:
 *       200:
 *         description: Updated task
 *       400:
 *         description: Invalid or empty body
 *       404:
 *         description: Task not found
 */

router.put('/:id', taskController.updateTask);

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

router.delete('/:id', taskController.deleteTask);


module.exports = router;