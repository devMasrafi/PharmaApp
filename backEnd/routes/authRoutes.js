const express = require("express");
const auth = require("../controllers/authController");
const router = express.Router();

router.route("/").post(auth.protect, auth.adminAuth, auth.signup);
router.route("/login").post(auth.login);
router.route("/allusers").get(auth.allUser);

module.exports = router;
