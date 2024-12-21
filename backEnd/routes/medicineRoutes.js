const express = require("express");

const {
  addMedicine,
  getMedicine,
  updateMedicine,
  deleteMedicine,
} = require("../controllers/medicinControllers");
const auth = require("../controllers/authController");

const router = express.Router();

// get all medicines
router.get("/", auth.protect, getMedicine);

// add new medicine
router.post("/addmedicine", auth.protect, addMedicine);

//udpate medicine
router.put("/:id", auth.protect, updateMedicine);

// delete a medicine
router.delete("/:id", auth.protect, deleteMedicine);

module.exports = router;
