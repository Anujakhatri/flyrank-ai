const resetService = require('../services/resetService');
async function resetTasks(req, res, next){
    try{
        const tasks = await resetService.resetTasks();
        res.json({ message: "Tasks have been reset to initial state", tasks });
    } catch (error) {
        next(error);
    }
}

module.exports = { resetTasks };
