const express = require("express");
const auth = require("../controllers/authController");
const { addIllness, getAllIllness, deleteIllness } = require("../controllers/illnessController");

const router = express.Router();

// routes

router.post("/", auth.protect, addIllness);
router.get("/", auth.protect, getAllIllness);
router.delete('/:id', auth.protect, deleteIllness);

module.exports = router;
