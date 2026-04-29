const User = require("./User");
const Task = require("./Task");

// ✅ correct relationship
User.hasMany(Task, { foreignKey: "userId" });
Task.belongsTo(User, { foreignKey: "userId" });

module.exports = { User, Task };