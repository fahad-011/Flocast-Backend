const crypto = require("crypto");
const ErrorResponse = require("../utils/errorResponse");
const Crowddata = require("../models/CrowdData");
const sendEmail = require("../utils/sendEmail");

// @desc    Login user
exports.upload = async (req, res, next) => {
    const { latitude, longitude, imgBase64, pinCode, dist, floodSeverity, username } = req.body;

    // Check if email and password is provided
    if (!latitude || !longitude || !imgBase64 || !pinCode || !dist || !floodSeverity) {
        return next(new ErrorResponse("Please provide all details", 400));
    }

    try {
        const crowddata = await Crowddata.create({ latitude, longitude, imgBase64, pinCode, dist, floodSeverity, username });
        await crowddata.save();
        return res.status(200).json({ message: "CrowdData Uploaded" })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: err })
    }


};
