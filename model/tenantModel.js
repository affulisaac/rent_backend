const mongoose = require("mongoose");

const tenantSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    nationality: {
      type: String,
      required: [true, "Nationality is required"],
    },
    contact_number: {
      type: String,
      required: [true, "Phone number is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    national_id: {
      type: String,
      required: [true, "National ID is required"],
    },
    occupation: {
      type: String,
      required: [true, "Occupation is required"],
    },
    emergency_contact: {
      type: String,
      required: [true, "Emergency number is required"],
    },
    emergency_contact_name: {
      type: String,
      required: [true, "Emergency contact name is required"],
    },
    rents: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rent"
    }],
    
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Tenant", tenantSchema);
