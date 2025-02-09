"use strict";

var _require = require("express-validator"),
  check = _require.check;
var registerValidator = [check("tel", "Некорректный номер телефона").isLength({
  min: 11,
  max: 11
}), check("firstName", "Имя и фамилия обязательны").isLength({
  min: 1
}), check("email", "Некоректный адрес электронной почты").isEmail(),
//валидность почты
check("password", "Пароль должен содержать от 6 до 15 символов").isLength({
  min: 6,
  max: 15
}),
//пароль от 6 символов до 15
check("secretWord", "Секретное слово должно содержать от 4 до 20 символов").isLength({
  min: 4,
  max: 20
}), check("firstName").isString().withMessage("Имя не заполнена"), check("lastName").isString().withMessage("Фамилия не заполнена"), check("surName").isString().withMessage("Отчество не заполнена")
// check("referalCode", "Реферальный код содержит 6 символов").isLength({
//     min: 0,
//     max: 6,
// }),
];
var loginValidator = [check("tel", "Некорректный номер телефона").isLength({
  min: 11,
  max: 11
})];
module.exports = {
  loginValidator: loginValidator,
  registerValidator: registerValidator
};