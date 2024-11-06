// models/InterestRateSetting.js
const { Schema, model } = require("mongoose");

// Таблица для процентных ставок
const InterestRateSetting = new Schema({
  period: {
    type: Number,
    enum: [1, 2, 3, 4, 5], // Периоды для ставок
    required: true,
    unique: true,
  },
  interestRate: { type: Number, required: true } // Текущая ставка для периода
});

module.exports = model("InterestRateSetting", InterestRateSetting);
