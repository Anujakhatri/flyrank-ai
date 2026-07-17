# Task API

A simple Express CRUD API for managing tasks.

## Getting started

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm start
```

The API runs at `http://localhost:3000`.

## Endpoints

### `GET /`

Returns metadata about the API.

**Response**

```json
{
  "name": "Task API",
  "version": "1.0",
  "endpoints": ["/tasks"]
}
```

**Example**

```bash
curl http://localhost:3000/
```

### `GET /health`

Health check endpoint.

**Response**

```json
{
  "status": "ok"
}
```

**Example**

```bash
curl http://localhost:3000/health
```

### `GET /tasks`

Returns all tasks.

**Response**

```json
[
  { "id": 1, "title": "Buy groceries", "done": false },
  { "id": 2, "title": "Walk the dog", "done": true },
  { "id": 3, "title": "Read a book", "done": false }
]
```

**Example**

```bash
curl http://localhost:3000/tasks
```

### `GET /tasks/:id`

Returns a single task by id.

**Response (200)**

```json
{ "id": 1, "title": "Buy groceries", "done": false }
```

**Response (404)**

```json
{ "error": "Task 99 not found" }
```

**Example**

```bash
curl http://localhost:3000/tasks/1
curl http://localhost:3000/tasks/99
```
