const express = require("express");
const router = express.Router();
const { addUser } = require("../controllers/UserController");

router.post("/", addUser);

module.exports = router; 
