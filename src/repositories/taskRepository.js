const pool = require('../config/db');

async function intializeDb(){
    //create table if not exists
    await pool.query(`
        CREATE TABLE IF NOT EXISTS tasks (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            done BOOLEAN DEFAULT false
        );
    `);
    //check table is empty or not
    const result = await pool.query('SELECT COUNT(*) from tasks');
    if ( parseInt(result.rows[0].count) === 0) {  //"0" -> 0 ; 0===0 -> true
        await pool.query(`
            INSERT INTO tasks (title, done) VALUES 
            ('Learn Node.js', true),
            ('Understand Express.js', true), 
            ('Middleware Concept', false)
        `);
            console.log('Database initialized with 3 tasks');
    }
}

intializeDb();

async function findAll() {
    const result = await pool.query('SELECT * FROM tasks ORDER BY id');
    return result.rows;
}

async function findById(id) {
    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    return result.rows[0];
}

async function create(task) {
    const newTask = await pool.query('INSERT INTO tasks (title) VALUES ($1) RETURNING *', [task.title]);
    return newTask.rows[0];
}

async function update(id, updates) {
    const task = await pool.query('UPDATE tasks SET title = $1, done = $2 WHERE id = $3 RETURNING *', [updates.title, updates.done, id]);
    return task.rows[0];
}

async function remove(id) {
    const index = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
    return result.rows.lenght > 0;
}

async function reset() {
    await pool.query('TRUNCATE TABLE tasks RESTART IDENTITY');
    await pool.query (`
        INSERT INTO tasks (title, done) VALUES
        ('Learn Node.js', true),
        ('Understand Express.js', true), 
        ('Middleware Concept', false)
        `);

        const result = await pool.query('SELECT * FROM tasks ORDER BY id');
        return result.rows;
}

module.exports = { findAll, findById, create, update, remove, reset };