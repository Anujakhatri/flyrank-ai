const { Pool } = require('pg');

const db = new Pool({
    user: env.get('USERNAME')|| 'postgres',
    host: env.get('HOST')|| 'localhost',
    database: env.get('DATABASE')|| 'tasks_db',
    password: env.get('PASSWORD'),
    port: 5432,
})

module.exports = db;