const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");

const medicineRoutes = require("./routes/medicineRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const addStaffRoutes = require("./routes/addStaffRoute.js");

// dataBase Connection
dotenv.config();
connectDB();

const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/medicines", medicineRoutes);
app.use("/api/users", userRoutes);
app.use("/api/users/create", addStaffRoutes);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
