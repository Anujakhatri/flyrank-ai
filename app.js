const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }));

const taskRouters = require('./src/routes/taskRoutes');
const statsRouters = require('./src/routes/statsRoutes');
const healthRouters = require('./src/routes/healthRoutes');
const resetRouters = require('./src/routes/resetRoutes');

const swaggerSpec = require('./src/config/swagger');
const swaggerUi = require('swagger-ui-express');

const errorhandling = require('./src/middleware/error-handling');


app.use(express.json()); //middleware to parse json body
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
    res.send("Hello Server!!");
})

app.use('/tasks', taskRouters);
app.use('/stats', statsRouters);
app.use('/', healthRouters);
app.use('/reset', resetRouters);


app.use(errorhandling); //centralized error handling middleware

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
