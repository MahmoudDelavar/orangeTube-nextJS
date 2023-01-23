const express = require("express");
const controller = require("./controllers");

//====================================
const router = express.Router();

router.post("/getLikes", controller.getLikes);
router.post("/upLike", controller.upLike);
router.post("/unLike", controller.unLike);

router.post("/getDisLikes", controller.getDisLikes);
router.post("/unDisLike", controller.unDisLike);
router.post("/upDisLike", controller.upDisLike);

module.exports = router;
