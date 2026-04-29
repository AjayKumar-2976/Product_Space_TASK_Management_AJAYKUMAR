const express = require("express");
const router = express.Router();

const { signup, login } = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);
console.log("LOGIN FUNCTION:", login);

module.exports = router;