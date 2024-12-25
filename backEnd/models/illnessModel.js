const mongoose = require("mongoose");

const illnessSchema = new mongoose.Schema({
    illnessName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    medicines: [
        {
            type: String,
        },
    ],
})


module.exports = mongoose.model("Illness", illnessSchema);