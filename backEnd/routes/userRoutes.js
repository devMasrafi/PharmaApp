const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.json({ message: "user not found" });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("isMatch:", isMatch);
    if (!isMatch) {
      console.log("Password mismatch");
      return res.json({ message: "invalid credentials" });
    }

    // JWT generate
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({ message: "login successful", token });
  } catch (error) {
    res.json({ message: "login failed" });
  }
});

module.exports = router;
