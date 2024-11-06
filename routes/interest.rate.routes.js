const express = require("express");
const InterestRateSetting = require("../models/InterestRateSetting"); // Подключаем модель ставок
const authMiddleware = require("../middleware/auth.middleware"); // Подключаем middleware для проверки авторизации администратора

const router = express.Router();

// Создать или обновить процентную ставку для указанного периода
router.post("/set-interest-rate", authMiddleware, async (req, res) => {
    const { period, interestRate } = req.body;

    if (!period || !interestRate) {
        return res.status(400).json({ message: "Необходимо указать период и процентную ставку" });
    }

    try {
        // Проверка на существующую запись для периода
        let setting = await InterestRateSetting.findOne({ period });
        
        if (setting) {
            // Обновить процентную ставку для существующего периода
            setting.interestRate = interestRate;
            await setting.save();
        } else {
            // Создать новую запись, если для этого периода её ещё нет
            setting = await InterestRateSetting.create({ period, interestRate });
        }

        res.status(200).json({ message: "Процентная ставка успешно установлена", setting });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при установке процентной ставки" });
    }
});

// Метод PUT для обновления процентной ставки для конкретного периода
router.put("/update-interest-rate/:period", authMiddleware, async (req, res) => {
    const { period } = req.params; // Период, который нужно обновить
    const { interestRate } = req.body; // Новый процент

    if (!interestRate) {
        return res.status(400).json({ message: "Необходимо указать процентную ставку для обновления" });
    }

    try {
        // Ищем настройку по периоду
        const setting = await InterestRateSetting.findOne({ period });
        
        if (!setting) {
            return res.status(404).json({ message: `Процентная ставка для периода ${period} не найдена` });
        }

        // Обновляем процентную ставку
        setting.interestRate = interestRate;
        await setting.save();

        res.status(200).json({ message: "Процентная ставка успешно обновлена", setting });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при обновлении процентной ставки" });
    }
});

// Получить все процентные ставки для периодов
router.get("/interest-rates", async (req, res) => {
    try {
        const rates = await InterestRateSetting.find();
        res.status(200).json(rates);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при получении процентных ставок" });
    }
});

module.exports = router;
