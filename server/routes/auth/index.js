const express = require("express");
const controller = require("./controllers");
const validation = require("./validation");
const { registerValidator, login } = require("./validation");
const { validationResult } = require("express-validator");
//====================================
const router = express.Router();

router.post(
  "/register",
  validation.register(),
  controller.validation,
  controller.register
);

router.post(
  "/login",
  validation.login(),
  controller.validation,
  controller.login
);

router.post("/loadAvatar", controller.loadAvatar);

module.exports = router;
