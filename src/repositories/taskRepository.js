const pool = require('../config/db');

async function intializeDb() {
    //create table if not exists
    await pool.query(`
        CREATE TABLE IF NOT EXISTS tasks (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            done BOOLEAN DEFAULT false,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);

    // alter table in case columns are missing
    await pool.query(`ALTER TABLE tasks ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;`);
    await pool.query(`ALTER TABLE tasks ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;`);

    //check table is empty or not
    const result = await pool.query('SELECT COUNT(*) from tasks');
    if (parseInt(result.rows[0].count) === 0) {  //"0" -> 0 ; 0===0 -> true
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

async function findAll(filters = {}) {
    let query = 'SELECT * FROM tasks';
    const values = [];
    const conditions = [];

    if (filters.done !== undefined) {
        values.push(filters.done === 'true');
        conditions.push(`done = $${values.length}`);
    }

    if (filters.search) {
        values.push(`%${filters.search}%`);
        conditions.push(`title ILIKE $${values.length}`);
    }

    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY title ASC';

    if (filters.limit !== undefined) {
        values.push(parseInt(filters.limit));
        query += ` LIMIT $${values.length}`;
    }

    const offset = parseInt(filters.offset) || 0;
    if (offset > 0) {
        values.push(offset);
        query += ` OFFSET $${values.length}`;
    }

    const result = await pool.query(query, values);
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
    const task = await pool.query('UPDATE tasks SET title = $1, done = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *', [updates.title, updates.done, id]);
    return task.rows[0];
}

async function remove(id) {
    const index = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
    return result.rows.lenght > 0;
}

async function reset() {
    await pool.query('TRUNCATE TABLE tasks RESTART IDENTITY');
    await pool.query(`
        INSERT INTO tasks (title, done) VALUES
        ('Learn Node.js', true),
        ('Understand Express.js', true), 
        ('Middleware Concept', false)
        `);

    const result = await pool.query('SELECT * FROM tasks ORDER BY id');
    return result.rows;
}

async function getStats() {
    const result = await pool.query(`
        SELECT 
            COUNT(*) as total,
            COUNT(*) FILTER (WHERE done = true) as completed,
            COUNT(*) FILTER (WHERE done = false) as pending
        FROM tasks
    `);
    return {
        total: parseInt(result.rows[0].total) || 0,
        completed: parseInt(result.rows[0].completed) || 0,
        pending: parseInt(result.rows[0].pending) || 0
    };
}

module.exports = { findAll, findById, create, update, remove, reset, getStats };