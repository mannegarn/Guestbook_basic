import express from "express";
import pg from "pg";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const db = new pg.Pool({
  connectionString: process.env.DB_CONN_STRING,
});

db.connect();

const app = express();
app.use(cors());

app.use(express.json());

app.get("/messages/", async (req, res) => {
  const payload = await db.query("SELECT * FROM messages");
  const data = await payload.rows;
  return res.json(data);
});

app.post("/messages", function (req, res) {
  console.log("req:", req.body);
  db.query("INSERT INTO messages (content) VALUES($1)", [req.body.content]);
  res.json({ status: "Message received!" });
});

app.delete("/messages/:id", async (req, res) => {
  const id = req.params.id;
  console.log("message_id:", id);
  try {
    await db.query("DELETE FROM messages WHERE id = $1", [id]);
    res.json({ status: "Message Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting message" });
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000...");
});
