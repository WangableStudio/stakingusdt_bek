require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const app = express();
const corsMiddleware = require("./middleware/cors.middleware");
const User = require("./models/User");
const depositRoutes = require("./routes/deposit.routes");
const interestRateRoutes = require("./routes/interest.rate.routes");
const cors = require("cors");
const Staking = require("./models/Staking");
const axios = require('axios');
const path = require('path');
const fileUpload = require('express-fileupload');
const Deposit = require('./models/Deposit');

const PORT = process.env.PORT || 5000;

// config.get("serverPort");


app.use(cors());
app.use(corsMiddleware);
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/deposit", depositRoutes);
app.use("/api/", interestRateRoutes);

const start = async () => {
  try {


    await mongoose.connect(process.env.dbURL);

    // await Deposit.updateMany(
    //   { interestRate: { $exists: false } },  // Убедитесь, что поле refbalance существует
    //   { $unset: { interestRate: 0 } }     // Установите значение поля refbalance в false
    // );     

    // setInterval(() => {
    //   axios.get('https://stakingusdt-bek.onrender.com/api/user/users')
    //     .then(() => console.log('Pinged server'))
    //     .catch(err => console.error(err));
    // }, 5 * 60 * 1000);

    // await User.findOneAndUpdate({ _id: "6677e2b4d9f5e008ca0561ce" }, { role: "ADMIN" });
    // const staking = await Staking.find()
    // console.log(staking);

    app.listen(PORT, () => {
      console.log("server started on port ", PORT);
    });
  } catch (e) {
    console.log(e);
  }
};
start();
