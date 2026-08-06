const swaggerJsDoc = require('swagger-jsdoc');

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
    apis: ['./src/routes/*.js'] //all route files to JSDoc
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);
module.exports = swaggerSpec;