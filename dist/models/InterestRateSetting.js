"use strict";

// models/InterestRateSetting.js
var _require = require("mongoose"),
  Schema = _require.Schema,
  model = _require.model;

// Таблица для процентных ставок
var InterestRateSetting = new Schema({
  period: {
    type: Number,
    "enum": [1, 2, 3, 4, 5],
    // Периоды для ставок
    required: true,
    unique: true
  },
  interestRate: {
    type: Number,
    required: true
  } // Текущая ставка для периода
});
module.exports = model("InterestRateSetting", InterestRateSetting);