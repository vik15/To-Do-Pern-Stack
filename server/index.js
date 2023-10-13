const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db");

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// Create a todo ✅
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await db.one(
      "INSERT INTO todo(description) VALUES($1) RETURNING *;",
      [description]
    );
    res.json(newTodo);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all todos ✅
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await db.any("SELECT * FROM todo;");
    res.json(allTodos);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Get a todo ✅
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getTodo = await db.one("SELECT * FROM todo where t_id = $1;", [id]);
    res.json(getTodo);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Update a todo ✅
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    await db.any("UPDATE todo SET description = $2 WHERE t_id = $1;", [
      id,
      description,
    ]);
    res.json({ message: "Todo was updated!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete a todo ✅
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.any("DELETE FROM todo WHERE t_id = $1 RETURNING *;", [id]);
    res.json({ message: "Row Deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
