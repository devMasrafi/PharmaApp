const express = require("express");

const { addMedicine, getMedicine, updateMedicine, deleteMedicine } = require("../controllers/medicinControllers");

const router = express.Router();

// add new medicine
router.post("/", addMedicine);


// get all medicines
router.get('/', getMedicine)


//udpate medicine
router.put("/:id", updateMedicine);

// delete a medicine
router.delete('/:id', deleteMedicine )


module.exports = router;
