const User = require("../models/userModel");
const generateUserName = require("../utils/generateUsername");

const signup = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    let userName = generateUserName(email);
    let userRole = role ? role : "staff";
    if (!email && !password) {
      return res
        .status(400)
        .json({ status: "fail", message: "please enter email and password" });
    }

    const userFound = await User.findOne({ email: email });
    if (userFound) {
      return res
        .status(400)
        .json({ status: "fail", message: "email already exist" });
    }
    const user = await User.create({
      username: userName,
      email,
      password,
      role: userRole,
    });
    return res
      .status(201)
      .json({ status: "success", message: "user created", data: user });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "fail", message: "server error", data: error.message });
  }
};
module.exports = signup;
