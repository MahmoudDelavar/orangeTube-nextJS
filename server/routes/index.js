const express = require("express");
const authRouter = require("./auth");
const videoRouter = require("./video");
const subscribeRouter = require("./subscribe");
//====================================
const router = express.Router();

router.use("/auth", authRouter);
router.use("/video", videoRouter);
router.use("/subscribe", subscribeRouter);
module.exports = router;
