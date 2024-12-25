const illnessModel = require("../models/illnessModel");

const addIllness = async (req, res) => {
  try {
    const { illnessName, description, medicines } = req.body;

    const newIllness = new illnessModel({
      illnessName,
      description,
      medicines,
    });

    await newIllness.save();
    res.status(201).json(newIllness);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getAllIllness = async (req, res) => {
  try {
    const illnesses = await illnessModel.find();
    res.json(illnesses);
  } catch (error) {
    res.json({ message: "could not get illnesses" });
  }
};

const deleteIllness = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedIllness = await illnessModel.findByIdAndDelete(id);

    if (!deletedIllness) {
      return res.json({ message: "illness not found" });
    }

    res.json({ message: "illness deleted" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = { addIllness, getAllIllness, deleteIllness };
