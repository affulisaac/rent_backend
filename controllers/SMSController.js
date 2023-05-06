
const asyncHandler = require("express-async-handler");

const { sendSMS } = require("../services/hubtel-sms");

const initiateSMS = asyncHandler(async (req, res) => {
  const { type } = req.body

  if(type && type === 'remindTenantPayment'){
   const message =  `You are being reminded of your pending payment`
   sendSMS('0547469379', message)
  }
 
});

module.exports = { initiateSMS };
