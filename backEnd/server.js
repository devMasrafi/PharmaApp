const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");

const medicineRoutes = require("./routes/medicineRoutes");
const authRouter = require("./routes/authRoutes");

// dataBase Connection
dotenv.config();
connectDB();

const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/v1/medicines", medicineRoutes);
app.use("/api/v1/users", authRouter);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
