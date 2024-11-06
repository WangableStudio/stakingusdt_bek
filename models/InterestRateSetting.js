// models/InterestRateSetting.js
const { Schema, model } = require("mongoose");

// Таблица для процентных ставок
const InterestRateSetting = new Schema({
  period: {
    type: String,
    enum: ["1_YEAR", "2_YEARS", "3_YEARS", "4_YEARS", "5_YEARS"], // Периоды для ставок
    required: true,
    unique: true,
  },
  interestRate: { type: Number, required: true } // Текущая ставка для периода
});

module.exports = model("InterestRateSetting", InterestRateSetting);
