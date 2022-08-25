const crypto = require("crypto");
const ErrorResponse = require("../utils/errorResponse");
const Crowddata = require("../models/CrowdData");
const sendEmail = require("../utils/sendEmail");
const axios = require("axios");

// @desc    Login user
exports.upload = async (req, res, next) => {
  const {
    latitude,
    longitude,
    imgBase64,
    pinCode,
    dist,
    floodSeverity,
    username,
  } = req.body;
  const headers = {
    contentType: "application/json",
  };
  try {
    axios
      .post("http://localhost:5000/predict", { imgBase64 }, { headers })
      .then(async (response) => {
        console.log(response.data);
        if (response.data.prediction !== "Flooding")
          return res.status(403).send("Image Is Not Valid !!");
        else {
          // Check if email and password is provided
          if (
            !latitude ||
            !longitude ||
            !imgBase64 ||
            !pinCode ||
            !dist ||
            !floodSeverity
          ) {
            return next(new ErrorResponse("Please provide all details", 400));
          }

          const crowddata = await Crowddata.create({
            latitude,
            longitude,
            imgBase64,
            pinCode,
            dist,
            floodSeverity,
            username,
          });
          await crowddata.save();
          return res
            .status(200)
            .json({ success: true, message: "CrowdData Uploaded" });
        }
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err });
  }
};
