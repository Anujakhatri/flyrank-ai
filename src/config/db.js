require('dotenv').config();
const env = require('env-var');
const { Pool } = require('pg');
const db = new Pool({
    user: env.get('USERNAME').default('postgres').asString(),
    host: env.get('HOST').default('localhost').asString(),
    database: env.get('DATABASE').default('tasks_db').asString(),
    password: env.get('PASSWORD').asString(),
    port: 5432,
})

module.exports = db;