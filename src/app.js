// App configuration — wires routes, middleware, and Swagger UI.
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const taskRoutes = require('./routes/taskRoutes');
const statsRoutes = require('./routes/statsRoutes');
const resetRoutes = require('./routes/resetRoutes');
const errorHandler = require('./middleware/error-handling');

const app = express();

app.use(express.json());

// Serve interactive API documentation.
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health endpoint for quick sanity checks.
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Mount feature routes.
app.use('/tasks', taskRoutes);
app.use('/', statsRoutes); // /stats
app.use('/', resetRoutes); // /reset

// Central error handler — must be last.
app.use(errorHandler);

module.exports = app;
