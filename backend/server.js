require("dotenv").config();
const app = require("./app");
const { connectDB, sequelize } = require("./config/db");

// import models (VERY IMPORTANT)
require("./models");

const PORT = process.env.PORT || 5000;

// connect DB
connectDB();

// create tables
sequelize.sync().then(() => {
  console.log("Tables created ✅");
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});