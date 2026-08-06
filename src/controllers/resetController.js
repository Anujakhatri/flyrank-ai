const resetService = require('../services/resetService');
function resetTasks(req, res, next){
    try{
        const tasks = resetService.resetTasks();
        res.json({ message: "Tasks have been reset to initial state", tasks });
    } catch (error) {
        next(error);
    }
}

module.exports = { resetTasks };
