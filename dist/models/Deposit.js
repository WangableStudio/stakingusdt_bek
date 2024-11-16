"use strict";

var _require = require("mongoose"),
  Schema = _require.Schema,
  model = _require.model;

//таблица пользователей
var Deposit = new Schema({
  price: {
    type: Number,
    required: true
  },
  operation: {
    type: String,
    "enum": ["WITHDRAW", "DEPOSIT"],
    "default": "WITHDRAW"
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  depositTerm: {
    type: Number
  },
  address: {
    type: String
  },
  currency: {
    type: String,
    "enum": ["USDT", "RUB"],
    "default": "USDT"
  },
  status: {
    type: String,
    "enum": ["PROCESS", "DONE", "WITHDRAW"],
    "default": "PROCESS"
  },
  image: {
    type: String,
    "default": null
  },
  refbalance: {
    type: Boolean,
    "default": false
  },
  interestRate: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});
module.exports = model("Deposit", Deposit);