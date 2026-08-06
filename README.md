# First CRUD API — Task Management

A self-contained Express.js REST API for managing tasks, with a clean layered architecture (routes → controllers → services → repositories), an in-memory data store, and interactive Swagger documentation.

## Folder Structure

```
First-CRUD-API/
├── server.js                 # Entry point — starts the HTTP server
├── package.json
└── src/
    ├── app.js                # App configuration — wires routes, middleware, and Swagger UI
    ├── config/
    │   └── swagger.js        # Swagger/OpenAPI definition (JSDoc-merged)
    ├── data/
    │   └── tasks.js          # In-memory data store + default seed values
    ├── repositories/
    │   └── taskRepository.js # Raw data access (find / create / update / delete)
    ├── services/
    │   └── taskService.js    # Validation & business rules; throws Error with .status
    ├── controllers/
    │   ├── taskController.js # Handles req/res for /tasks
    │   ├── statsController.js# Handles req/res for /stats
    │   └── resetController.js# Handles req/res for /reset
    ├── routes/
    │   ├── taskRoutes.js     # Maps /tasks URLs to controllers (+ @swagger comments)
    │   ├── statsRoutes.js    # Maps /stats to its controller (+ @swagger comments)
    │   └── resetRoutes.js    # Maps /reset to its controller (+ @swagger comments)
    └── middleware/
        └── error-handling.js # Central error handler — returns { error: message }
```

### Layer Responsibilities

- **Routes** — Only map URLs to controller functions. No logic, no validation.
- **Controllers** — Only handle `req` / `res`. Call the service, catch errors, forward via `next(err)`.
- **Services** — All validation and business rules. Throw `Error` with a `.status` property. Never touch `req` / `res`.
- **Repositories** — Raw data access (CRUD on the in-memory array). No validation, no HTTP.
- **Middleware** — Central error handler reads `err.status` (default 500) and returns `{ error: message }`.

## Data Model

```json
Task: { "id": 1, "title": "Buy groceries", "done": false }
```

## Install & Run

```bash
npm install
npm start         # production
npm run dev       # with nodemon auto-reload
```

Server boots on `http://localhost:3000`.

Interactive API docs: <http://localhost:3000/docs>

## Endpoints

| Method | Path           | Description                                  |
| ------ | -------------- | -------------------------------------------- |
| GET    | `/tasks`       | List tasks (filters & pagination)            |
| GET    | `/tasks/:id`   | Get a single task by id                      |
| POST   | `/tasks`       | Create a new task                            |
| PUT    | `/tasks/:id`   | Update an existing task (title and/or done)  |
| DELETE | `/tasks/:id`   | Delete a task                                |
| GET    | `/stats`       | Get task counts                              |
| POST   | `/reset`       | Reseed tasks to the default 4 sample tasks   |

### `GET /tasks`

Query params (all optional):

- `done` — boolean filter (`true` / `false`)
- `search` — case-insensitive substring match against `title`
- `limit` — max items to return
- `offset` — items to skip

```bash
curl "http://localhost:3000/tasks?done=false&search=gro&limit=5&offset=0"
```

Response:

```json
{
  "data": [
    { "id": 1, "title": "Buy groceries", "done": false }
  ],
  "total": 1,
  "count": 1
}
```

### `GET /tasks/:id`

```bash
curl http://localhost:3000/tasks/1
# 200: { "id": 1, "title": "Buy groceries", "done": false }
# 404: { "error": "Task not found" }
```

### `POST /tasks`

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Walk the dog"}'
```

```json
// 201
{ "id": 5, "title": "Walk the dog", "done": false }
// 400
{ "error": "Title is required and must be a non-empty string" }
```

### `PUT /tasks/:id`

Body must include at least one of `title` or `done`.

```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"done": true}'
```

```json
// 200
{ "id": 1, "title": "Buy groceries", "done": true }
// 400 — neither field
{ "error": "At least one of \"title\" or \"done\" must be provided" }
// 404
{ "error": "Task not found" }
```

### `DELETE /tasks/:id`

```bash
curl -X DELETE http://localhost:3000/tasks/1
# 204 No Content
# 404
{ "error": "Task not found" }
```

### `GET /stats`

```bash
curl http://localhost:3000/stats
# 200
{ "totalTasks": 4, "completedTasks": 2, "pendingTasks": 2 }
```

### `POST /reset`

```bash
curl -X POST http://localhost:3000/reset
# 200
{
  "message": "Tasks reset to defaults",
  "data": [
    { "id": 1, "title": "Buy groceries", "done": false },
    { "id": 2, "title": "Read a book", "done": true },
    { "id": 3, "title": "Write project docs", "done": false },
    { "id": 4, "title": "Workout", "done": true }
  ],
  "total": 4
}
```

## Swagger / OpenAPI Docs

After starting the server, open:

```
http://localhost:3000/docs
```

The UI lists every endpoint with parameters, request body schema, and response codes (200 / 201 / 204 / 400 / 404). It also exposes a **Try it out** panel that calls the running API directly.

## Notes

- Data is in-memory only — restarting the server resets the state to the 4 default sample tasks.
- No authentication, no database, no extra endpoints beyond the list above.
