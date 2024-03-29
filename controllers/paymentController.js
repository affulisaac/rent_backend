const asyncHandler = require("express-async-handler");
const Payment = require("../model/paymentModel");
const Tenant = require("../model/tenantModel");
const { sendMessage } = require("../services/arkesel-sms");
const { sendEmail } = require("../services/mailer");
const moment = require("moment");
const getPayments = async (req, res) => {
  try {
    const { aggregate } = req.query;
    if (aggregate) {
      const tenantPayments = await Payment.aggregate([
        {
          $match: {
            business: req?.user?.business?._id,
          },
        },
        {
          $group: {
            _id: "$tenant",
            totalAmountPaid: { $sum: "$amount" },
            payments: { $push: "$$ROOT" },
          },
        },
        {
          $lookup: {
            from: "tenants",
            localField: "_id",
            foreignField: "_id",
            as: "tenant",
          },
        },
        {
          $unwind: "$tenant",
        },
        {
          $lookup: {
            from: "rents",
            localField: "payments.rent",
            foreignField: "_id",
            as: "rents",
          },
        },
        {
          $unwind: "$rents",
        },
        {
          $lookup: {
            from: "apartments",
            localField: "rents.apartment",
            foreignField: "_id",
            as: "apartment",
          },
        },
        {
          $lookup: {
            from: "properties",
            localField: "rents.property",
            foreignField: "_id",
            as: "property",
          },
        },
        {
          $addFields: {
            rent: {
              $mergeObjects: [
                "$rents",
                {
                  apartment: { $arrayElemAt: ["$apartment", 0] },
                  property: { $arrayElemAt: ["$property", 0] },
                },
              ],
            },
          },
        },
        {
          $project: {
            _id: 0,
            totalAmountPaid: 1,
            payments: 1,
            rent: 1,
            tenant: {
              _id: "$tenant._id",
              name: "$tenant.name",
              contact_number: "$tenant.contact_number",
              email: "$tenant.email",
            },
          },
        },
      ]);
      res.status(200).json(tenantPayments);
    } else {
      const payment = await Payment.find(req.filterObj)
        .populate("tenant", "name email contact_number")
        .populate({
          path: "rent",
          populate: [
            {
              path: "apartment",
              select: "name _id",
            },
            {
              path: "property",
              select: "name _id",
            },
          ],
        });
      res.status(200).json(payment);
    }
  } catch (error) {
    console("An error occured " + error?.message);
    res.status(400).json({ message: error?.message });
  }
};

const getAggregatedPayments = async (req, res) => {
  try {
    const payment = await Payment.find(req.filterObj)
      .populate("tenant", "name email")
      .populate({
        path: "rent",
        populate: [
          {
            path: "apartment",
            select: "name _id",
          },
          {
            path: "property",
            select: "name _id",
          },
        ],
      });
    res.status(200).json(payment);
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
};

const addPayment = async (req, res) => {
  try {
    const payment = await Payment.create(req.body);
    const tenant = await Tenant.findById(req.body?.tenant);
    const { name, email } = tenant;
    const date = moment(payment?.createdAt).format('MMMM Do YYYY, h:mm:ss a');
    const { amount, _id: paymentId, method, } = payment;
    const formatedAmount = amount.toLocaleString("en-US");
    const link = `${process.env.FRONTEND_URL}/receipt/${payment?._id}`;
    if (tenant) {
      console.log(tenant);
      sendMessage(
        [tenant?.contact_number],
        `Dear ${
          tenant?.name
        }, your payment of GHS ${payment?.amount.toLocaleString(
          "en-US"
        )}.00 has been received. Kindly click on the link to view your receipt. ${
         link}`
      );
      console.log( { name, email, amount: formatedAmount, paymentId, link, date, paymentMethod: method })
      await sendEmail(
        tenant?.email,
        `GHS ${formatedAmount}.00 rent payment received`,
        "../../templates/receipt.ejs",
        { name, email, amount: formatedAmount,  link, date, paymentMethod: method, paymentId }
      );
    }
    res.status(200).json(payment);
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
};

const updatePayment = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id);
  if (!payment) {
    res.status(400);
    throw new Error("Payment not found");
  }
  const updatedPayment = Payment.findByIdAndUpdate(
    req.params.id,
    req.body
  ).populate("user");
  console.log(updatedPayment);
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

const getPayment = async (req, res) => {
  try {
    const paymentItem = await Payment.findById(req.params.id);
    if (!paymentItem) {
      throw new Error(`We could not find this payment`);
    }

    const payment = await Payment.findById(req.params.id)
      .populate("tenant")
      .populate("business")
      .populate({
        path: "rent",
        populate: [
          {
            path: "apartment",
            select: "name _id",
          },
          {
            path: "property",
            select: "name _id",
          },
        ],
      });
    res.status(200).json(payment);
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
};

module.exports = {
  getPayments,
  addPayment,
  deletePayment,
  updatePayment,
  getPayment,
  getAggregatedPayments,
};
