const mongoose = require("mongoose");

const OTPSchema = new mongoose.Schema(
  {
    mobile: { type: Number, required: true, unique: true },
    OTP: { type: Number },
  },
  { collection: "GovTech" }
);

const OTPModel = mongoose.model("OTPModel", OTPSchema);

module.exports = OTPModel;
