
const asyncHandler = require("express-async-handler");

const { sendSMS } = require("../services/hubtel-sms");
const { sendMessage } = require("../services/arkesel-sms")

const initiateSMS = async (req, res) => {
  const { type } = req.body

  if(type && type === 'remindTenantPayment'){
   const message =  `You are being reminded of your pending payment`
    sendMessage(['0547469379'], message)
    .then(result=>{
      console.log(result?.data)
      res.status(200).json(result?.data)
    }).catch(err=>{
      console.log({message: `Something went wrong: ${err}`})
      res.status(500).json({message: `Something went wrong`})
    })
  }
};

module.exports = { initiateSMS };
