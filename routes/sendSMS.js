const express = require("express");
const router = express.Router();

// Controllers

const { sendsms } = require("../controllers/sendSMS");
router.route("/send").post(sendsms);

module.exports = router;
