const { sendMessage } = require("../services/arkesel-sms");
const moment = require("moment");
const Rent = require("../model/rentModel");

const initiateSMS = async (req, res) => {
  const { type, tenant_id, rent_id } = req.body;
  try {
    const rent = await Rent.findById(rent_id)
      .populate("apartment")
      .populate("tenant");

    const tense = moment(rent?.rent_end_date).isBefore(moment())
      ? `expired`
      : `expires`;
    const due = moment(rent?.rent_end_date).format('MMMM Do YYYY');
    const dueDate = moment(rent?.rent_end_date,"YYYYMMDD").fromNow();
    let message = "";

    if (type === "rent_due_reminder") {
      message = `Dear ${rent?.tenant?.name}, please be aware that your tenancy ${tense} ${dueDate}.`;
    } else if (type === "rent_payment_reminder") {
      message = `Dear ${rent?.tenant?.name}, please be aware that your rent payment is due on ${due}.`;
    }

    sendMessage([rent?.tenant?.contact_number], message)
      .then((result) => {
        console.log(result?.data);
        res.status(200).json(result?.data);
      })
      .catch((err) => {
        console.log({ message: `Something went wrong: ${err}` });
        res.status(400).json({ message: `${err?.message}` });
      });

  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
};

module.exports = { initiateSMS };
