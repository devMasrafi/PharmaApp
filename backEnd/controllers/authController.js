const User = require("../models/userModel");
const { generateToken } = require("../utils/generateToken");
const generateUserName = require("../utils/generateUsername");

exports.signup = async (req, res) => {
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

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // check user exist or not
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res
        .status(404)
        .json({ status: "fail", message: "user not found" });
    }

    // check password is right or wrong
    const isPasswordCorrect = await userFound.correctPassword(password);
    if (!isPasswordCorrect) {
      return res
        .status(404)
        .json({ status: "fail", message: "wrong email and password" });
    }

    // generate access and refresh token
    const { token } = await generateToken(userFound._id);

    return res.status(200).json({
      status: "success",
      message: "login succcessful",
      data: { token, userFound },
    });
  } catch (error) {
    return res.status(500).json({ status: "fail", message: "server error" });
  }
};
