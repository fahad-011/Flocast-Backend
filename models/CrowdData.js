const mongoose = require("mongoose");

const CrowdDataSchema = new mongoose.Schema({
    latitude: {
        type: String,
        required: [true, "Please provide latitude"],
    },
    longitude: {
        type: String,
        required: [true, "Please provide longitude"],
    },
    imgBase64: {
        type: String,
        required: [true, "Please provide image"],
    },
    pinCode: {
        type: Number,
        minlength: 6,
        required: [true, "Please provide a PIN"],
    },
    dist: {
        type: String,
        required: [true, "Please provide your dist name"],
    },
    floodSeverity: {
        type: String,
        required: [true, "Please provide your dist name"],
        enum: ["Low", "Medium", "High"],
    },
    description: {
        type: String,
    },
    username: {
        type: String,
    },

});

const crowdData = mongoose.model("CROWD", CrowdDataSchema);

module.exports = crowdData; 