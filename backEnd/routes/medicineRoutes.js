const express = require("express");

const {
  addMedicine,
  getMedicine,
  updateMedicine,
  deleteMedicine,
} = require("../controllers/medicinControllers");
const auth = require("../controllers/authController");

const router = express.Router();

// add new medicine
router.post("/", auth.protect, addMedicine);

// get all medicines
router.get("/", auth.protect, getMedicine);

//udpate medicine
router.put("/:id", auth.protect, updateMedicine);

// delete a medicine
router.delete("/:id", auth.protect, deleteMedicine);

module.exports = router;
