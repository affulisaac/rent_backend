const asyncHandler = require("express-async-handler");
const Payment = require("../model/paymentModel")
const Tenant = require("../model/tenantModel")
const { sendSMS } = require("../services/hubtel-sms")
const { sendMessage } = require("../services/arkesel-sms")

const getPayments = asyncHandler(async (req, res) => {
  console.log(req?.filterObj)
  const payment = await Payment.find(req.filterObj).populate('tenant', 'name email');
  res.status(200).json(payment);
});

const addPayment = asyncHandler(async (req, res) => {
  console.log(req.body)
  const payment = await Payment.create(req.body);
  const tenant = await Tenant.findById(req.body?.tenant)
  if(tenant){
    console.log(tenant)
    sendMessage(['0547469379'], `Payment of Ghc${req.body.amount} has been received for your rent`)
  }
  res.status(200).json(payment);
});

const updatePayment = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id);
  if (!payment) {
    res.status(400);
    throw new Error("Payment not found");
  }
  const updatedPayment = Payment.findByIdAndUpdate(req.params.id, req.body).populate('user');
  console.log(updatedPayment)
  res.status(200).json(updatedPayment._update);
});

const deletePayment = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id);
  if (!payment) {
    res.status(400);
    throw new Error(`Could not find payment with ID ${req.params.id}`);
  }
  await Payment.findByIdAndDelete(req.params.id);
  res.status(200).json({ id: req.params.id, message: "Deleted successfully" });
});

const getPayment = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id).catch((err) => {
    res.status(400);
    throw new Error("Payment not found");
  });
  res.status(200).json(payment);
});

module.exports = {
  getPayments, addPayment, deletePayment, updatePayment, getPayment
};
