const express = require("express");
const authRouter = require("./auth");
const videoRouter = require("./video");
//====================================
const router = express.Router();

router.use("/auth", authRouter);
router.use("/video", videoRouter);
module.exports = router;
