const Router = require("express");
const Staking = require("../models/Staking"); // Подключаем модель стейкинга
const User = require("../models/User"); // Подключаем модель стейкинга
const router = new Router();

// GET запрос для получения всех записей стейкинга
router.get("/staking", async (req, res) => {
  try {
    const allStakings = await Staking.find(); // Получаем все записи стейкинга из базы данных

    // Возвращаем все записи стейкинга
    // return res.json({ stakings: allStakings });
    return res.json(allStakings);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error" });
  }
});


// GET запрос для получения всех записей стейкинга
router.get("/users", async (req, res) => {
  try {
    const allUsers = await User.find(); // Получаем все записи стейкинга из базы данных

    // Возвращаем все записи стейкинга
    return res.json({ users: allUsers });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id); // Получаем все записи стейкинга из базы данных
    console.log(user);
    // Возвращаем все записи стейкинга
    return res.json(user);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { email, tel, balance } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { email, tel, balance },
      { new: true, runValidators: true } // Возвращаем обновленный объект и валидируем перед сохранением
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    res.status(200).json({ message: "Данные пользователя успешно обновлены", user: updatedUser });
  } catch (error) {
    console.error("Ошибка при обновлении данных пользователя:", error);
    res.status(500).json({ message: "Ошибка сервера при обновлении данных пользователя" });
  }
})

module.exports = router;
