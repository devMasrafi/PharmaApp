const User = require("../models/userModel");

// generate JWT token
exports.generateToken = async (id) => {
  try {
    const user = await User.findById({ _id: id });
    const token = await user.generateJwtToken();
    await user.save();
    return { token };
  } catch (error) {
    console.log(error);
  }
};
