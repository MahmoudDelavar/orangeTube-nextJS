const express = require("express");
const controller = require("./controllers");

//====================================
const router = express.Router();

router.post("/saveComment", controller.saveComment);
router.post("/getComments", controller.getComments);

module.exports = router;
