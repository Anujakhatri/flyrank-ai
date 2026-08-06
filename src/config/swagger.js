// Swagger/OpenAPI configuration — combines swagger-jsdoc-generated paths with
// reusable component schemas.

const swaggerJSDoc = require('swagger-jsdoc');

const definition = {
  openapi: '3.0.0',
  info: {
    title: 'Task Management API',
    version: '1.0.0',
    description: 'A simple CRUD API for managing tasks.',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local development server',
    },
  ],
  components: {
    schemas: {
      Task: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          title: { type: 'string', example: 'Buy groceries' },
          done: { type: 'boolean', example: false },
        },
        required: ['id', 'title', 'done'],
      },
      Error: {
        type: 'object',
        properties: {
          error: { type: 'string', example: 'Task not found' },
        },
        required: ['error'],
      },
    },
  },
};

const options = {
  definition,
  apis: ['./src/routes/*.js'],
};

module.exports = swaggerJSDoc(options);
