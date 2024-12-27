const express = require("express");
const auth = require("../controllers/authController");
const router = express.Router();

router.route("/addstaff").post(auth.protect, auth.adminAuth, auth.signup);
router.route("/login").post(auth.login);
router.route("/").get(auth.allUser);
router.route("/profile").get(auth.protect, auth.profile);

module.exports = router;
