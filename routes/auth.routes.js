const Router = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const authMiddleware = require("../middleware/auth.middleware");
const { registerValidator, loginValidator } = require("../dto/auth.dto");
const router = new Router();
const Deposit = require("../models/Deposit");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const verificationCodes = {}; // Хранилище кодов

router.post("/give-code", async (req, res) => {
  const { email } = req.body;

  try {
    const verificationCode = crypto.randomInt(1000, 9999).toString(); // Генерация кода

    // Сохранение кода в памяти
    verificationCodes[email] = verificationCode;
    console.log(verificationCode);

    // Отправка кода на почту
    const transporter = nodemailer.createTransport({
      service: "gmail", // Замените на используемого почтового провайдера
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Код подтверждения",
      text: `Ваш код подтверждения: ${verificationCode}`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Код подтверждения отправлен на почту." });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Ошибка сервера" });
  }
});

router.post("/registration", registerValidator, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Некорректный запрос", errors });
    }

    const { tel, email, password, secretWord, role, referal, firstName, lastName, surName, code } = req.body;
    if(!firstName && !lastName){
      return res.status(400).json({ message: "Имя и фамилия обязательны" });
    }
    // Проверяем, был ли запрошен код
    const savedCode = verificationCodes[email];
    if (!savedCode) {
      return res.status(400).json({ message: "Код не был запрашиваем." });
    }

    // Проверяем правильность кода
    if (savedCode !== code) {
      return res.status(400).json({ message: "Неверный код подтверждения." });
    }

    // Проверка, зарегистрирован ли пользователь с таким email
    const candidate_email = await User.findOne({ email });
    if (candidate_email) {
      return res.status(400).json({
        message: `Пользователь с почтой ${email} уже зарегистрирован`,
      });
    }

    const hashPassword = await bcrypt.hash(password, 5);

    const user = new User({
      tel,
      email,
      password: hashPassword,
      secretWord,
      role,
      firstName,
      lastName,
      surName,
    });

    console.log(user);

    if (referal) {
      // Находим пользователя, которому принадлежит реферальный код
      const referringUser = await User.findById(referal);
      if (referringUser) {
        await User.findByIdAndUpdate(referal, {
          $push: { referrals: user._id },
        });

        // Настраиваем транспортер для отправки уведомления
        const transporter = nodemailer.createTransport({
          service: "gmail", // Замените на используемого почтового провайдера
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        // Конфигурация письма
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: referringUser.email,
          subject: "Новый реферал зарегистрирован",
          text: `У вас появился новый реферал: ${firstName} ${lastName}.`,
        };

        // Отправляем уведомление по email
        await transporter.sendMail(mailOptions);
        console.log("Уведомление отправлено владельцу реферальной ссылки.");
      }
    }

    await user.save();

    delete verificationCodes[email];

    return res.json({ message: "Пользователь успешно зарегистрирован." });
  } catch (e) {
    res.status(500).send({ message: "Ошибка сервера" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password, code, tel } = req.body;

  try {
    // Проверка наличия кода подтверждения
    const savedCode = verificationCodes[email];
    if (!savedCode) {
      return res.status(400).json({ message: "Код не был запрашиваем." });
    }

    // Проверка правильности кода
    if (savedCode !== code) {
      return res.status(400).json({ message: "Неверный код подтверждения." });
    }

    // Поиск пользователя
    const user = await User.findOne({ email }).populate("referrals");
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    // Проверка пароля
    const isPassValid = bcrypt.compareSync(password, user.password);
    if (!isPassValid) {
      return res.status(400).json({ message: "Неправильный пароль" });
    }

    if(tel !== user.tel){
      return res.status(400).json({ message: "Неверный номер телефона" });
    }

    // Генерация токена
    const token = jwt.sign({ id: user.id }, process.env.secretKey, {
      expiresIn: "1d",
    });

    const referrals = [];
    for (const referral of user.referrals) {
      const deposit = await Deposit.find({ user: referral._id });
      if (deposit.length > 0) {
        referrals.push(referral);
      }
    }
    const lastDeposit = await Deposit.findOne().sort({ createdAt: -1 });

    // Удаляем код из памяти после успешной проверки
    delete verificationCodes[email];

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        tel: user.tel,
        email: user.email,
        role: user.role,
        balance: user.balance,
        refbalance: user.refbalance,
        referrals: referrals,
        firstName: user.firstName,
        lastName: user.lastName,
        surName: user.surName,
        lastDepositTime: lastDeposit?.createdAt,
      },
    });
  } catch (e) {
    console.log(e);
    res.send({ message: "Server error" });
  }
});


// Добавьте этот код в ваш роутер

router.get("/auth", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id }).populate("referrals");

    const lastDeposit = await Deposit.findOne().sort({ createdAt: -1 });

    const token = jwt.sign({ id: user.id }, process.env.secretKey, {
      expiresIn: "1d",
    });

    const referrals = [];

    for (const referral of user.referrals) {
      const deposit = await Deposit.find({ user: referral._id });
      if (deposit.length > 0) {
        referrals.push(referral);
      }
    }

    return res.json({
      token,
      user: {
        id: user.id,
        tel: user.tel,
        email: user.email,
        role: user.role,
        balance: user.balance,
        refbalance: user.refbalance,
        referrals: referrals,
        firstName: user.firstName,
        lastName: user.lastName,
        surName: user.lastName,
        lastDepositTime: lastDeposit?.createdAt,
      },
    });
  } catch (e) {
    console.log(e);
    res.send({ message: "Server error" });
  }
});


router.get("/me", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate("referrals");
    const lastDeposit = await Deposit.findOne().sort({ createdAt: -1 });

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    const referrals = [];

    for (const referral of user.referrals) {
      const deposit = await Deposit.find({ user: referral._id });
      if (deposit.length > 0) {
        referrals.push(referral);
      }
    }


    return res.json({
      user: {
        id: user.id,
        tel: user.tel,
        email: user.email,
        role: user.role,
        balance: user.balance,
        referrals: referrals,
        firstName: user.firstName,
        lastName: user.lastName,
        surName: user.lastName,
        lastDepositTime: lastDeposit?.createdAt,
      },
    });
  } catch (e) {
    console.log(e);
    res.send({ message: "Server error" });
  }
});
module.exports = router;
