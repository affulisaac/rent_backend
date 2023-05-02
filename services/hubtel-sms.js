const fetch = require('node-fetch');

  const sendSMS = async(recipient, message) => {
    const query = new URLSearchParams({
      clientid: process.env.CLIENT_ID,
      clientsecret: process.env.CLIENT_SECRET,
      from: process.env.SENDER,
      to: recipient,
      content: message
    }).toString();
  
    const resp = await fetch(
      `https://devp-sms03726-api.hubtel.com/v1/messages/send?${query}`,
      {method: 'GET'}
    );
    const data = await resp.text();
    console.log(data);
  }
  

  module.exports = {
      sendSMS
  }
  