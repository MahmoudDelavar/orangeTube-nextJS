const { validationResult } = require("express-validator");
const controller = require("../controller");
const debug = require("debug")("app:main");
//====================================

module.exports = new (class extends controller {
  //------------------subscribeNumber------------------
  async subscribeCounter(req, res) {
    const response = await this.Subscribe.find({ userTo: req.body.userTo });
    const count = response.length;
    this.response({
      res,
      isSuccess: true,
      code: 200,
      message: "calculateded subscribers",
      data: count,
    });
  }

  //-------------checked isSubscribe or not-------------
  async isSubscribe(req, res) {
    const { userTo, userFrom } = req.body;
    const response = await this.Subscribe.find({
      userTo: userTo,
      userFrom: userFrom,
    });

    let result = false;
    if (response.length !== 0) {
      result = true;
    }
    this.response({
      res,
      isSuccess: true,
      code: 200,
      data: result,
    });
  }
  //-------------Subscribe-------------
  async subscribe(req, res) {
    const subscribe = new this.Subscribe({
      userTo: req.body.userTo,
      userFrom: req.body.userFrom,
    });
    subscribe.save((err, doc) => {
      if (err) {
        return this.response({
          res,
          isSuccess: false,
          code: 400,
          message: "can't be subscribe",
        });
      }
      this.response({
        res,
        isSuccess: true,
        code: 200,
        message: "success",
      });
    });
  }
  //-------------unSubscribe-------------
  async unSubscribe(req, res) {
    await this.Subscribe.findOneAndDelete({
      userTo: req.body.userTo,
      userFrom: req.body.userFrom,
    }).exec((err, doc) => {
      if (err) {
        return this.response({
          res,
          code: 400,
          isSuccess: false,
          message: "can not be delete",
        });
      }
      this.response({
        res,
        isSuccess: true,
        code: 200,
        message: "deleted",
      });
    });
  }
})();
