
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid");
const db = require("./db");
app.use(bodyParser.json());
app.use(cors());

app.get("/contacts", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM contacts");
    res.send(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving contacts.");
  }
});

app.post("/create-message", async (req, res) => {
  try {
    const { senderId, receiverId, text, date } = req.body;
    const result = await db.query(
      'INSERT INTO messages ("senderId", "receiverId", text, date ) VALUES ($1, $2, $3, $4) RETURNING *',
      [senderId, receiverId, text, date]
    );
    res.send(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating message.");
  }
});

app.get("/message-user/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      `SELECT * FROM messages WHERE "senderId" = 1 AND "receiverId" = $1`,
      [id]
    );
    res.send(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving messages.");
  }
});

app.post("/create-user", async (req, res) => {
  try {
    const { login, password } = req.body;
    const result = await db.query(
      "INSERT INTO users (login, password) VALUES ($1, $2) RETURNING *",
      [login, password]
    );
    res.send(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating user.");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { login, password } = req.body;
    const result = await db.query(
      "SELECT * FROM users WHERE login = $1 AND password = $2",
      [login, password]
    );
    if (result.rows.length > 0) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging in.");
  }
});

app.listen(3001, () => {
  console.log(`Hola KSG, everythings work well`);
});
