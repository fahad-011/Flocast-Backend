
require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

exports.sendsms = async (req, res) => {
    // console.log(accountSid)
    const client = require('twilio')(accountSid, authToken);
    client.messages
        .create({
            body: 'Hello',
            messagingServiceSid: 'MGb9a60c3d74401247ac636412687de32f',
            to: '+917008467367'
        })
        .then(message => console.log(message.sid))
        .done();
};