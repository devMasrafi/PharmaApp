const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  illnesses: [
    {
      type: String,
    },
  ],
  stock: {
    type: Number,
    required: true,
  },
  buyPrice: {
    type: Number,
    required: true,
  },
  sellPrice: {
    type: Number,
    required: true,
  },
  sellerInfo: {
    sellerName: {
      type: String,
    },
    sellerContactNumber: {
      type: String,
    },
    sellerEmail: {
      type: String,
    },
  },
});

module.exports= mongoose.model("medicine",medicineSchema)
