"use strict";

var jwt = require("jsonwebtoken");
var config = require("config");
module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    var token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Auth error"
      });
    }
    var decoded = jwt.verify(token, process.env.secretKey);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({
      message: "Auth error"
    });
  }
};