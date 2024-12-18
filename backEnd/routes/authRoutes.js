const express = require("express");
const signup = require("../controllers/authController");
const router = express.Router();

router.route("/").post(signup);

module.exports = router;
