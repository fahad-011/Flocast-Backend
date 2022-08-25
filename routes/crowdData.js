const express = require("express");
const router = express.Router();

// Controllers

const { upload, getForecasts } = require("../controllers/crowddata");
router.route("/upload").post(upload);
router.route("/getForecasts").get(getForecasts);

module.exports = router;