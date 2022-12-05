const { validationResult } = require("express-validator");
const controller = require("../controller");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { dev_phase } = require("../../../next.config");
//====================================

module.exports = new (class extends controller {
  async register(req, res) {
    let user = await this.User.findOne({ email: req.body.email });
    if (user) {
      return this.response({
        res,
        code: 400,
        message: " این ایمیل قبلا ثبت شده است ",
        isSuccess: false,
      });
    }
    user = new this.User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      avatarPath: req.body.avatarPath,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    this.response({
      res,
      code: 200,
      isSuccess: true,
      message: "ثبت نام با موفقیت انجام شد",
    });
  }

  async login(req, res) {
    let user = await this.User.findOne({ email: req.body.email });
    if (!user) {
      return this.response({
        res,
        code: 400,
        isSuccess: false,
        message: "ایمیل یا پسورد اشتباه است ",
      });
    }

    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) {
      return this.response({
        res,
        code: 400,
        isSuccess: false,
        message: " ایمیل یا رمز عبور صحیح نیست",
      });
    }

    const token = jwt.sign({ _id: user._id }, dev_phase.jwt_key);

    this.response({
      res,
      code: 200,
      isSuccess: true,
      message: "خوش آمدید",
      data: token,
    });
  }
})();
