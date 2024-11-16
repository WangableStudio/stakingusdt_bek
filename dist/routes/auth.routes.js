"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var Router = require("express");
var User = require("../models/User");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var config = require("config");
var _require = require("express-validator"),
  check = _require.check,
  validationResult = _require.validationResult;
var authMiddleware = require("../middleware/auth.middleware");
var _require2 = require("../dto/auth.dto"),
  registerValidator = _require2.registerValidator,
  loginValidator = _require2.loginValidator;
var router = new Router();
var Deposit = require("../models/Deposit");
var crypto = require("crypto");
var nodemailer = require("nodemailer");
var verificationCodes = {}; // Хранилище кодов

router.post("/give-code", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var email, verificationCode, transporter, mailOptions;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          email = req.body.email;
          _context.prev = 1;
          verificationCode = crypto.randomInt(1000, 9999).toString(); // Генерация кода
          // Сохранение кода в памяти
          verificationCodes[email] = verificationCode;
          console.log(verificationCode);

          // Отправка кода на почту
          transporter = nodemailer.createTransport({
            service: "gmail",
            // Замените на используемого почтового провайдера
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS
            }
          });
          mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Код подтверждения",
            text: "\u0412\u0430\u0448 \u043A\u043E\u0434 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F: ".concat(verificationCode)
          };
          _context.next = 9;
          return transporter.sendMail(mailOptions);
        case 9:
          res.json({
            message: "Код подтверждения отправлен на почту."
          });
          _context.next = 16;
          break;
        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0);
          res.status(500).send({
            message: "Ошибка сервера"
          });
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 12]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.post("/registration", registerValidator, /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var errors, _req$body, tel, email, password, secretWord, role, referal, firstName, lastName, surName, code, savedCode, candidate_email, hashPassword, user, referringUser, transporter, mailOptions;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          errors = validationResult(req);
          if (errors.isEmpty()) {
            _context2.next = 4;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            message: "Некорректный запрос",
            errors: errors
          }));
        case 4:
          _req$body = req.body, tel = _req$body.tel, email = _req$body.email, password = _req$body.password, secretWord = _req$body.secretWord, role = _req$body.role, referal = _req$body.referal, firstName = _req$body.firstName, lastName = _req$body.lastName, surName = _req$body.surName, code = _req$body.code;
          if (!(!firstName && !lastName)) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            message: "Имя и фамилия обязательны"
          }));
        case 7:
          // Проверяем, был ли запрошен код
          savedCode = verificationCodes[email];
          if (savedCode) {
            _context2.next = 10;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            message: "Код не был запрашиваем."
          }));
        case 10:
          if (!(savedCode !== code)) {
            _context2.next = 12;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            message: "Неверный код подтверждения."
          }));
        case 12:
          _context2.next = 14;
          return User.findOne({
            email: email
          });
        case 14:
          candidate_email = _context2.sent;
          if (!candidate_email) {
            _context2.next = 17;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            message: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0441 \u043F\u043E\u0447\u0442\u043E\u0439 ".concat(email, " \u0443\u0436\u0435 \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D")
          }));
        case 17:
          _context2.next = 19;
          return bcrypt.hash(password, 5);
        case 19:
          hashPassword = _context2.sent;
          user = new User({
            tel: tel,
            email: email,
            password: hashPassword,
            secretWord: secretWord,
            role: role,
            firstName: firstName,
            lastName: lastName,
            surName: surName
          });
          console.log(user);
          if (!referal) {
            _context2.next = 34;
            break;
          }
          _context2.next = 25;
          return User.findById(referal);
        case 25:
          referringUser = _context2.sent;
          if (!referringUser) {
            _context2.next = 34;
            break;
          }
          _context2.next = 29;
          return User.findByIdAndUpdate(referal, {
            $push: {
              referrals: user._id
            }
          });
        case 29:
          // Настраиваем транспортер для отправки уведомления
          transporter = nodemailer.createTransport({
            service: "gmail",
            // Замените на используемого почтового провайдера
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS
            }
          }); // Конфигурация письма
          mailOptions = {
            from: process.env.EMAIL_USER,
            to: referringUser.email,
            subject: "Новый реферал зарегистрирован",
            text: "\u0423 \u0432\u0430\u0441 \u043F\u043E\u044F\u0432\u0438\u043B\u0441\u044F \u043D\u043E\u0432\u044B\u0439 \u0440\u0435\u0444\u0435\u0440\u0430\u043B: ".concat(firstName, " ").concat(lastName, ".")
          }; // Отправляем уведомление по email
          _context2.next = 33;
          return transporter.sendMail(mailOptions);
        case 33:
          console.log("Уведомление отправлено владельцу реферальной ссылки.");
        case 34:
          _context2.next = 36;
          return user.save();
        case 36:
          delete verificationCodes[email];
          return _context2.abrupt("return", res.json({
            message: "Пользователь успешно зарегистрирован."
          }));
        case 40:
          _context2.prev = 40;
          _context2.t0 = _context2["catch"](0);
          res.status(500).send({
            message: "Ошибка сервера"
          });
        case 43:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 40]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.post("/login", /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _req$body2, email, password, code, tel, savedCode, user, isPassValid, token, referrals, _iterator, _step, referral, deposit, lastDeposit;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password, code = _req$body2.code, tel = _req$body2.tel;
          _context3.prev = 1;
          // Проверка наличия кода подтверждения
          savedCode = verificationCodes[email];
          if (savedCode) {
            _context3.next = 5;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: "Код не был запрашиваем."
          }));
        case 5:
          if (!(savedCode !== code)) {
            _context3.next = 7;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: "Неверный код подтверждения."
          }));
        case 7:
          _context3.next = 9;
          return User.findOne({
            email: email
          }).populate("referrals");
        case 9:
          user = _context3.sent;
          console.log(user);
          if (user) {
            _context3.next = 13;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            message: "Пользователь не найден"
          }));
        case 13:
          // Проверка пароля
          isPassValid = bcrypt.compareSync(password, user.password);
          if (isPassValid) {
            _context3.next = 16;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: "Неправильный пароль"
          }));
        case 16:
          if (!(tel !== user.tel)) {
            _context3.next = 18;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: "Неверный номер телефона"
          }));
        case 18:
          // Генерация токена
          token = jwt.sign({
            id: user.id
          }, process.env.secretKey, {
            expiresIn: "1d"
          });
          referrals = [];
          _iterator = _createForOfIteratorHelper(user.referrals);
          _context3.prev = 21;
          _iterator.s();
        case 23:
          if ((_step = _iterator.n()).done) {
            _context3.next = 31;
            break;
          }
          referral = _step.value;
          _context3.next = 27;
          return Deposit.find({
            user: referral._id
          });
        case 27:
          deposit = _context3.sent;
          if (deposit.length > 0) {
            referrals.push(referral);
          }
        case 29:
          _context3.next = 23;
          break;
        case 31:
          _context3.next = 36;
          break;
        case 33:
          _context3.prev = 33;
          _context3.t0 = _context3["catch"](21);
          _iterator.e(_context3.t0);
        case 36:
          _context3.prev = 36;
          _iterator.f();
          return _context3.finish(36);
        case 39:
          _context3.next = 41;
          return Deposit.findOne().sort({
            createdAt: -1
          });
        case 41:
          lastDeposit = _context3.sent;
          // Удаляем код из памяти после успешной проверки
          delete verificationCodes[email];
          return _context3.abrupt("return", res.status(200).json({
            token: token,
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
              lastDepositTime: lastDeposit === null || lastDeposit === void 0 ? void 0 : lastDeposit.createdAt
            }
          }));
        case 46:
          _context3.prev = 46;
          _context3.t1 = _context3["catch"](1);
          console.log(_context3.t1);
          res.send({
            message: "Server error"
          });
        case 50:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 46], [21, 33, 36, 39]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

// Добавьте этот код в ваш роутер

router.get("/auth", authMiddleware, /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var user, lastDeposit, token, referrals, _iterator2, _step2, referral, deposit;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return User.findOne({
            _id: req.user.id
          }).populate("referrals");
        case 3:
          user = _context4.sent;
          _context4.next = 6;
          return Deposit.findOne().sort({
            createdAt: -1
          });
        case 6:
          lastDeposit = _context4.sent;
          token = jwt.sign({
            id: user.id
          }, process.env.secretKey, {
            expiresIn: "1d"
          });
          referrals = [];
          _iterator2 = _createForOfIteratorHelper(user.referrals);
          _context4.prev = 10;
          _iterator2.s();
        case 12:
          if ((_step2 = _iterator2.n()).done) {
            _context4.next = 20;
            break;
          }
          referral = _step2.value;
          _context4.next = 16;
          return Deposit.find({
            user: referral._id
          });
        case 16:
          deposit = _context4.sent;
          if (deposit.length > 0) {
            referrals.push(referral);
          }
        case 18:
          _context4.next = 12;
          break;
        case 20:
          _context4.next = 25;
          break;
        case 22:
          _context4.prev = 22;
          _context4.t0 = _context4["catch"](10);
          _iterator2.e(_context4.t0);
        case 25:
          _context4.prev = 25;
          _iterator2.f();
          return _context4.finish(25);
        case 28:
          return _context4.abrupt("return", res.json({
            token: token,
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
              lastDepositTime: lastDeposit === null || lastDeposit === void 0 ? void 0 : lastDeposit.createdAt
            }
          }));
        case 31:
          _context4.prev = 31;
          _context4.t1 = _context4["catch"](0);
          console.log(_context4.t1);
          res.send({
            message: "Server error"
          });
        case 35:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 31], [10, 22, 25, 28]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
router.get("/me", authMiddleware, /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var userId, user, lastDeposit, referrals, _iterator3, _step3, referral, deposit;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          userId = req.user.id;
          _context5.next = 4;
          return User.findById(userId).populate("referrals");
        case 4:
          user = _context5.sent;
          _context5.next = 7;
          return Deposit.findOne().sort({
            createdAt: -1
          });
        case 7:
          lastDeposit = _context5.sent;
          if (user) {
            _context5.next = 10;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            message: "Пользователь не найден"
          }));
        case 10:
          referrals = [];
          _iterator3 = _createForOfIteratorHelper(user.referrals);
          _context5.prev = 12;
          _iterator3.s();
        case 14:
          if ((_step3 = _iterator3.n()).done) {
            _context5.next = 22;
            break;
          }
          referral = _step3.value;
          _context5.next = 18;
          return Deposit.find({
            user: referral._id
          });
        case 18:
          deposit = _context5.sent;
          if (deposit.length > 0) {
            referrals.push(referral);
          }
        case 20:
          _context5.next = 14;
          break;
        case 22:
          _context5.next = 27;
          break;
        case 24:
          _context5.prev = 24;
          _context5.t0 = _context5["catch"](12);
          _iterator3.e(_context5.t0);
        case 27:
          _context5.prev = 27;
          _iterator3.f();
          return _context5.finish(27);
        case 30:
          return _context5.abrupt("return", res.json({
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
              lastDepositTime: lastDeposit === null || lastDeposit === void 0 ? void 0 : lastDeposit.createdAt
            }
          }));
        case 33:
          _context5.prev = 33;
          _context5.t1 = _context5["catch"](0);
          console.log(_context5.t1);
          res.send({
            message: "Server error"
          });
        case 37:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 33], [12, 24, 27, 30]]);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
module.exports = router;