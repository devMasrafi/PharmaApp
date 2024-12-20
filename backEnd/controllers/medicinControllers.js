const Medicine = require("../models/medicineModel");

const addMedicine = async (req, res) => {
  try {
    const {
      name,
      manufacturer,
      illnesses,
      stock,
      buyPrice,
      sellPrice,
      sellerInfo,
    } = req.body;

    const newMedicine = new Medicine({
      name,
      manufacturer,
      illnesses,
      stock,
      buyPrice,
      sellPrice,
      sellerInfo,
    });

    await newMedicine.save();
    res.status(201).json(newMedicine);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// get all medicine
const getMedicine = async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// upupdateMedicine

const updateMedicine = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedMedicine = await Medicine.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedMedicine) {
      return res.json({ message: "medicine not found" });
    }

    res.json(updatedMedicine);
  } catch (error) {
    res.json({ message: "medicine update failed" });
  }
};

// delete medicine
const deleteMedicine = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMedicine = await Medicine.findByIdAndDelete(id);
    if (!deletedMedicine) {
      return res.json({ message: "medicine not found" });
    }

    res.json({ message: "medicine deleted" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = { addMedicine, getMedicine, updateMedicine, deleteMedicine };
