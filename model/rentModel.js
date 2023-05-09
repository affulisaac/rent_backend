const mongoose = require("mongoose");

  const tenantSchema = mongoose.Schema(
    {
      tenant: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Tenant",
          required: [true, "Please select tenant"],
        },

      rent_start_date: {
        type: String,
        required: [true, "Rent start date required"],
      },

      apartment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Apartment"
      },

      rent_end_date: {
        type: String,
        required: [true, "Rent end date required"],
      },
      amount_per_month: {
        type: String,
        required: [true, "Amount per month is required"],
      },
      total_amount: {
        type: Number,
        required: false,
      },
      rooms: {
        type: Array,
        required: true
      },
      remarks: {
        type: String,
        required: true
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "User",
      },
      number_of_month: {
          type: Number,
          required: [true, "Number of month is required"],
        },
    },
    {
      timestamps: true,
    }
  );
module.exports = mongoose.model("Rent", tenantSchema);
