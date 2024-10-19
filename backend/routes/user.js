
const express = require("express")

const { asynchandler } = require('../middleware/errorHandler');
const UserController = require("../controllers/userController")

const router = express.Router();

router.get("/users/count",asynchandler(UserController.getUserCount))

module.exports = router
