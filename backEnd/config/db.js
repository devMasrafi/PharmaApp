const mongoose = require("mongoose");

const connectDB = async () => {
  // console.log(process.env);

  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB Connected Successfully");
  } catch (error) {
    console.log("Database connection failed");
  }
};

module.exports = connectDB;
