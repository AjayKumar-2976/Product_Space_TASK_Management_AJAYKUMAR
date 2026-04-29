const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// ✅ middleware FIRST
app.use(cors());
app.use(express.json());


app.use((req, res, next) => {
  console.log("➡️", req.method, req.url);
  next();
});

// ✅ routes NEXT
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);



// test route
app.get("/", (req, res) => {
  res.send("API running...");
});

// ✅ export LAST
module.exports = app;