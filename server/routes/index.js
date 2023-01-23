const express = require("express");
const authRouter = require("./auth");
const videoRouter = require("./video");
const subscribeRouter = require("./subscribe");
const commentRouter = require("./comment");
const likeAndDislike = require("./like-dislike");
//====================================
const router = express.Router();

router.use("/auth", authRouter);
router.use("/video", videoRouter);
router.use("/subscribe", subscribeRouter);
router.use("/comment", commentRouter);
router.use("/likeAndDislike", likeAndDislike);
module.exports = router;
