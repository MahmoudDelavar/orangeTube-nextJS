const express = require("express");
const controller = require("./controllers");
const validation = require("./validation");
const { registerValidator, login } = require("./validation");
const { validationResult } = require("express-validator");
//====================================
const router = express.Router();

router.post("/upload", controller.uploadVideo);
router.post("/thumbnail", controller.thumbnail);
router.post("/addVideo", controller.addVideo);
router.post("/getAllVideos", controller.getAllVideos);
router.post("/getSubscribtionVideos", controller.getSubscribtionVideos);

module.exports = router;
