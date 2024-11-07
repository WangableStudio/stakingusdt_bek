const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const Deposit = require("../models/Deposit");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const uuid = require("uuid");
const path = require("path");
const InterestRateSetting = require("../models/InterestRateSetting");

const depositRoutes = Router();

depositRoutes.post("/", authMiddleware, async (req, res) => {
    const { price, operation, address, withdrawalDetails, currency, depositTerm } = req.body;
    let refbalance = req.body.refbalance;
    const refBoolean = refbalance === "true";

    let fileName = null;
    if (req.files && req.files.image) {
        const { image } = req.files;
        fileName = uuid.v4() + '.jpg';
        await image.mv(path.resolve(__dirname, "..", "static", fileName));
    }

    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
    }

    if (operation === "WITHDRAW") {
        if (refBoolean && user.refbalance < +price) {
            return res.status(400).json({ message: "Сумма вывода больше, чем баланс реферального счета" });
        } else if (!refBoolean && user.balance < +price) {
            return res.status(400).json({ message: "Сумма вывода больше, чем баланс" });
        }
    } else {
        if (refBoolean && user.refbalance < price) {
            return res.status(400).json({ message: "Сумма зачисления больше, чем баланс реферала" });
        }
    }
    const period = Number(1)
    let interestSetting = await InterestRateSetting.findOne({ period })
    if (!refBoolean) {
        // Получаем текущую процентную ставку для указанного периода
        let interestSetting = await InterestRateSetting.findOne({ period });
        if (!interestSetting) {
            return res.status(404).json({ message: "Процентная ставка для указанного периода не найдена" });
        }
    }

    // Создаем депозит с фиксированной процентной ставкой
    return res.status(201).json('df');
    // const deposit = await Deposit.create({
    //     price,
    //     operation,
    //     address,
    //     withdrawalDetails,
    //     user: userId,
    //     currency,
    //     refbalance: refBoolean,
    //     depositTerm,
    //     interestRate: interestSetting.interestRate, // Фиксируем ставку на момент создания
    //     image: fileName
    // });

    // return res.status(201).json(deposit);
});
const calculateExpectedIncome = (price, depositTerm, interestRate) => {
    const annualPercent = interestRate / 100; // Преобразуем в доли
    const yearlyIncome = price * annualPercent; // Годовой доход
    const totalIncome = yearlyIncome * depositTerm; // Доход за весь срок

    return totalIncome; 
};

depositRoutes.post("/period-withdraw", authMiddleware, async (req, res) => {
    const { price, operation, address, withdrawalDetails, currency, depositTerm, status } = req.body;

    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
    }

    const interestSetting = await InterestRateSetting.findOne({ period: depositTerm });
    if (!interestSetting) {
        return res.status(404).json({ message: "Процентная ставка для указанного периода не найдена" });
    }
    // Создаем депозит
    const deposit = await Deposit.create({
        price,
        operation,
        address,
        withdrawalDetails,
        user: userId,
        currency,
        refbalance: false,
        depositTerm,
        interestRate: interestSetting.interestRate,
        status,
    });

    return res.status(201).json(deposit);
});


depositRoutes.get("/", authMiddleware, async (req, res) => {
    const deposit = await Deposit.find().populate('user');
    return res.json(deposit)
});

depositRoutes.get("/transactions", authMiddleware, async (req, res) => {
    const { operation } = req.query;
    const userId = req.user.id;
    let deposit;
    if (operation) {
        deposit = await Deposit.find({ user: userId, operation: operation });
    } else {
        deposit = await Deposit.find({ user: userId });
    }
    return res.json(deposit);
});

depositRoutes.get('/transactions/:user', authMiddleware, async (req, res) => {
    const { operation } = req.query;
    const { user } = req.params;
    const userRole = req.user.id
    const userRoleAdmin = await User.findById(userRole)
    if (userRoleAdmin.role !== 'ADMIN') {
        return res.status(403).json({ message: "Нет доступа" });
    }
    let deposit;
    if (operation) {
        deposit = await Deposit.find({ user: user, operation: operation });
    } else {
        deposit = await Deposit.find({ user: user });
    }
    return res.json(deposit);
})

depositRoutes.post("/change-status/:id", authMiddleware, [check("price").isNumeric().withMessage("Price should be a number")], async (req, res) => {
    const { id } = req.params;
    const { price, periodbalance } = req.body;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Некорректный запрос", errors });
        }
        const deposit = await Deposit.findByIdAndUpdate(id, {
            price: price
        }, { new: true });
        const refBoolean = deposit.refbalance === "true";
        if (!deposit) {
            return res.status(404).json({ message: "Операция не найдена" });
        }
        if (deposit.status === "DONE") {
            return res.status(400).json({ message: "Это операция уже выполнена" });
        }

        const user = await User.findById(deposit.user);
        if (!user) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        const exchangeRate = deposit.currency === "RUB" ? await getExchangeRate() : 1;
        const amountUSD = deposit.currency === "RUB" ? deposit.price / exchangeRate : deposit.price;

        if (deposit.operation === "DEPOSIT") {
            if (deposit.refbalance) {
                user.refbalance -= amountUSD;
            }
            user.balance += amountUSD;

            const period = Number(deposit.depositTerm)
            // Получаем текущую процентную ставку для указанного периода
            const interestSetting = await InterestRateSetting.findOne({ period });
            if (!interestSetting) {
                return res.status(404).json({ message: "Процентная ставка для указанного периода не найдена" });
            }

            deposit.interestRate = interestSetting.interestRate


            const referrers = await User.find({ referrals: user._id });
            console.log(referrers, "referrers");

            referrers.forEach(async (referrer) => {
                const referralBonus = 0.10 * amountUSD;
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
                    to: referrer.email,
                    subject: "Бонус за пополнение реферала",
                    text: `Ваш реферал совершил первое пополнение! Вам начислен бонус: ${referralBonus.toFixed(2)} USD.`,
                };

                // Отправляем уведомление по email
                await transporter.sendMail(mailOptions);
                referrer.refbalance += referralBonus;
                await referrer.save();
            });
        } else {
            if (deposit.refbalance) {
                if (amountUSD > user.refbalance) {
                    return res.status(400).json({ message: "Баланс реферального счета пользователя недостаточно для вывода" });
                } else {
                    user.refbalance -= amountUSD;
                }
            } else {
                if(!periodbalance){
                    if (amountUSD > user.balance) {
                        return res.status(400).json({ message: "Баланс пользователя недостаточно для вывода" });
                    } else {
                        user.balance -= amountUSD;
                    }
                }
            }
        }

        deposit.status = "DONE";
        await user.save();
        await deposit.save();

        return res.json({ user, deposit });
    } catch (e) {
        console.log(e);
        return res.status(500).json("Internal server error");
    }
});

function getExchangeRate() {
    return 62.5;
}


module.exports = depositRoutes;