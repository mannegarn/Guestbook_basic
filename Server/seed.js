import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const db = new pg.Pool({
  connectionString: process.env.DB_CONN_STRING,
});

db.connect();

db.query("CREATE TABLE messages (id SERIAL PRIMARY KEY, content VARCHAR(255))");
