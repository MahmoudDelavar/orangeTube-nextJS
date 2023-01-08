const express = require("express");
const controller = require("./controllers");
const validation = require("./validation");
const { registerValidator, login } = require("./validation");
const { validationResult } = require("express-validator");
//====================================
const router = express.Router();

router.post("/upload", controller.uploadVideo);
router.post("/thumbnail", controller.thumbnail);

module.exports = router;
