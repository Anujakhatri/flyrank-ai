# Task CRUD API

A simple RESTful CRUD API for managing tasks, built with Node.js and Express — created step by step to learn backend fundamentals: routing, validation, status codes, and API documentation with Swagger.

## Tech Stack

- Node.js
- Express
- swagger-ui-express (interactive API docs)

## Installation & Run

```bash
git clone https://github.com/Anujakhatri/flyrank-ai.git
cd first-crud-api
npm install
npx nodemon index.js
```

Server runs at `http://localhost:3000`.
Interactive docs available at `http://localhost:3000/docs`.

## Endpoints

| Method | Endpoint      | Description                          | Success | Errors        |
|--------|---------------|---------------------------------------|---------|---------------|
| GET    | `/`           | Hello check                           | 200     | —             |
| GET    | `/health`     | Server health check                   | 200     | —             |
| GET    | `/tasks`      | List all tasks                        | 200     | —             |
| GET    | `/tasks/:id`  | Get a single task by id               | 200     | 404           |
| POST   | `/tasks`      | Create a new task                     | 201     | 400           |
| PUT    | `/tasks/:id`  | Update a task's title and/or done     | 200     | 400, 404      |
| DELETE | `/tasks/:id`  | Delete a task                         | 204     | 404           |

## Example Request

```bash
curl -i -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{"title":"Buy Book"}'
```
HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8

{
  "id":5,
  "title":"Buy Book",
  "done":false
}

## API Docs (Swagger UI)

![Swagger UI screenshot](./swagger.png)

## What I learned

Building this taught me routing, middleware order, input validation as a business rule (never trust the client), correct HTTP status code usage, and describing an API with OpenAPI/Swagger.