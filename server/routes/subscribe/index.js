const express = require("express");
const controller = require("./controllers");

//====================================
const router = express.Router();

router.post("/subscribeCounter", controller.subscribeCounter);
router.post("/isSubscribe", controller.isSubscribe);
router.post("/subscribe", controller.subscribe);
router.post("/unSubscribe", controller.unSubscribe);

module.exports = router;
