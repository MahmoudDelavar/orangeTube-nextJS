const autoBind = require("auto-bind");
const { validationResult } = require("express-validator");
const user = require("./../models/user");
const video = require("./../models/video");
const subscribe = require("./../models/subscribe");
const comment = require("./../models/comment");
const like = require("./../models/like");
const disLike = require("./../models/disLike");
//====================================

module.exports = class {
  constructor() {
    autoBind(this);
    this.User = user;
    this.Video = video;
    this.Subscribe = subscribe;
    this.Comment = comment;
    this.Like = like;
    this.DisLike = disLike;
  }

  validation(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      let erros = result.array();
      let data = [];
      erros.forEach((err) => data.push(err.msg));
      return res.status(400).json({ message: "validation erros", data });
    }
    next();
  }

  response({ res, code = 200, data = {}, message = null, isSuccess = true }) {
    res.status(code).json({ message, data, isSuccess });
  }
};
