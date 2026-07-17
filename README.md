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
