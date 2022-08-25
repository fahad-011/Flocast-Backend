const express = require("express");
const router = express.Router();

// Controllers

const { upload } = require("../controllers/crowddata");
router.route("/upload").post(upload);

module.exports = router;