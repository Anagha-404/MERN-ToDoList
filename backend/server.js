require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // allow requests from the React dev server
app.use(express.json()); // parse JSON request bodies

// Routes
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("To-Do List API is running");
});

// Connect to the database first, then start listening
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
