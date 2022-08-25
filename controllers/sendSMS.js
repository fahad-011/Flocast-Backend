require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const Citizen = require("../models/CitizenDetails");
const ErrorResponse = require("../utils/errorResponse");

exports.sendsms = async (req, res) => {
    const client = require('twilio')(accountSid, authToken);
    const { dist, state, message } = req.body;

    if (!dist || !state || !message) {
        return next(new ErrorResponse("Please provide all details", 400));
    }
    const citizens = await Citizen.find({ dist });
    // const citizenSize = citizens.length;
    // console.log(citizens.length);
    // console.log(message);
    for (const item of citizens) {
        // console.log(item.phone);
        client.messages
            .create({
                body: message,
                messagingServiceSid: 'MGb9a60c3d74401247ac636412687de32f',
                to: "+91" + item.phone
            })
            .then(message => console.log(message))
            .done();
    }
    // console.log(accountSid)

};