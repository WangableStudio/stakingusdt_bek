const { Schema, model } = require("mongoose");

//таблица пользователей
const Deposit = new Schema({
  price: { type: Number, required: true },
  operation: {
    type: String,
    enum: ["WITHDRAW", "DEPOSIT"],
    default: "WITHDRAW"
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  depositTerm: {
    type: Number,
  },
  address: {
    type: String,
  },
  currency: {
    type: String,
    enum: ["USDT", "RUB"],
    default: "USDT"
  },
  status: {
    type: String,
    enum: ["PROCESS", "DONE"],
    default: "PROCESS"
  },
  image: { type: String, default: null },
  refbalance: { type: Boolean, default: false },
  interestRate: { type: Number, required: true } 
}, { timestamps: true });

module.exports = model("Deposit", Deposit);
