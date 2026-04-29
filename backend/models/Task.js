const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Task = sequelize.define("Task", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "pending",
  },
   userId: {                    // 🔥 ADD THIS
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Task;