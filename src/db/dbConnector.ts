import { Pool } from 'pg';

const { DB_USERNAME, DB_PASSWORD, DB_HOSTNAME, DB_PORT, DB_NAME } = process.env;

const pool = new Pool({
  max: 20,
  user: DB_USERNAME,
  host: DB_HOSTNAME,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: Number(DB_PORT),
  idleTimeoutMillis: 30000
});

export default pool;
