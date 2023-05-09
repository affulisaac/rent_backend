const axios = require("axios");


const sendMessage =  async (recipients, message) => {
  const data = {
    sender: process.env.SENDER,
    message: message,
    recipients: recipients,
  };

  const config = {
    method: "post",
    url: "https://sms.arkesel.com/api/v2/sms/send",
    headers: {
      "api-key": process.env.ARKESEL_SMS_KEY,
    },
    data: data,
  };

 return  axios(config)
 
};

module.exports = {
  sendMessage,
};
