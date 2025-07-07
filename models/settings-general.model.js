const mongoose = require("mongoose");

const settingGeneralSchema = new mongoose.Schema(
  {
    websiteName: String,
    logo: String,
    copyright: String,
    phone: String,
    email: String,
    address: String,
    
  },
  { timestamps: true }
);

const SettingGeneral = mongoose.model(
  "SettingGeneral",
  settingGeneralSchema,
  "settings-general"
);

module.exports = SettingGeneral;
