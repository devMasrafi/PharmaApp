const jwt = require("jsonwebtoken");
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

exports.allUser = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.json({ message: error.message });
  }
};

exports.protect = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    // verify the token
    const decodedToken = jwt.verify(
      token,
      process.env.TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          return null;
        }
        return decoded;
      }
    );
    if (!decodedToken) {
      return res
        .status(401)
        .json({ status: "fail", message: "please login first" });
    }

    // find user from the decoded token
    const user = await User.findById(decodedToken.id);
    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "no user found with this token" });
    }
    req.user = user;

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ status: "fail", message: "server error", data: error.message });
  }
};

exports.profile = async (req, res) => {
  try {
    // Check if user data exists in req.user (set by protect middleware)
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized, please log in again.",
      });
    }

    // Fetch the user from the database (excluding sensitive data like password)
    const user = await User.findById(req.user._id).select('-password');

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found.",
      });
    }

    console.log("Logged-in user profile:", user);

    // Return user profile data
    return res.status(200).json({
      status: "success",
      message: "Profile fetched successfully.",
      data: user,
    });
  } catch (error) {
    console.error("Profile Route Error:", error.message);
    return res.status(500).json({
      status: "fail",
      message: "Server error while fetching profile.",
      data: error.message,
    });
  }
};

exports.adminAuth = (req, res, next) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({
        status: "fail",
        message: "you do not have permission to perform this action",
      });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ status: "fail", message: "server error", data: error.message });
  }
};
