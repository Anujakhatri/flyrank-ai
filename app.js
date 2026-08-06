const express = require('express');
const app = express();
const taskRouters = require('./src/routes/taskRoutes');
const statsRouters = require('./src/routes/statsRoutes');
const healthRouters = require('./src/routes/healthRoutes');
const resetRouters = require('./src/routes/resetRoutes');

const errorhandling = require('./src/middleware/error-handling');


app.use(express.json()); //middleware to parse json body

app.get('/', (req, res) => {
    res.send("Hello Server!!");
})

app.use('/tasks', taskRouters);
app.use('/stats', statsRouters);
app.use('/', healthRouters);
app.use('/reset', resetRouters);


app.use(errorhandling); //centralized error handling middleware

app.listen(3000, () => console.log('Server running on port 3000'));
