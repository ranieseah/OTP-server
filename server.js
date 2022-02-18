const express = require("express");
const connectDB = require("./models/db");
const OTPModel = require("./models/schema");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB("mongodb://127.0.0.1:27017/interview");

const genOTP = () => {
  code = Math.floor(100000 + Math.random() * 899999);
  return code;
};

app.post("/generateOTP", async (req, res) => {
  if (req.body.mobile > 80000000 && req.body.mobile < 99999999) {
    const OTP = genOTP();
    const user = await OTPModel.findOne({ mobile: req.body.mobile });
    if (user) {
      user.OTP = OTP;
      await user.save();
    } else {
      const user = await OTPModel.create({
        mobile: req.body.mobile,
        OTP: OTP,
      });
    }
    res.json(OTP);
  } else {
    res.json({ msg: "invalid number" });
  }
});

app.post("/checkOTP", async (req, res) => {
  if (req.body.mobile > 80000000 && req.body.mobile < 99999999) {
    const user = await OTPModel.findOne({ mobile: req.body.mobile });
    if (user) {
      if (user.OTP === req.body.OTP) {
        res.json({ msg: "validated" });
      } else {
        res.json({ msg: "validation fail" });
      }
    } else {
      res.json({ msg: "generate OTP" });
    }
  } else {
    res.json({ msg: "invalid number" });
  }
});

app.listen(5004);
