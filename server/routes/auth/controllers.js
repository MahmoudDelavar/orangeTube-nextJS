const { validationResult } = require("express-validator");
const controller = require("../controller");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { dev_phase } = require("../../../next.config");
const multer = require("multer");
const debug = require("debug")("app:main");

//====================================

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/userAvatar");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname + "loaded");
    if (ext !== ".jpg" || ".png") {
      return cb(res.status(400).send("only jpg or png allowed "), false);
    }
    cb(null, true);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: "5mb" },
}).single("file");
//-----------------------------------------------------

module.exports = new (class extends controller {
  //------------------------------Register------------------------------
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
      avatarPath: req.body.avatarPath || "/uploads/userAvatar/user.png",
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    const token = jwt.sign({ _id: user._id }, dev_phase.jwt_key);
    this.response({
      res,
      code: 200,
      isSuccess: true,
      message: "ثبت نام با موفقیت انجام شد",
      data: { user, token },
    });
  }
  //------------------------------Login------------------------------
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
      data: { user, token },
    });
  }

  //-------------------------Load User Avatar-------------------------
  async loadAvatar(req, res) {
    upload(req, res, (err) => {
      if (err) {
        return this.response({
          res,
          code: 400,
          data: null,
          isSuccess: false,
          message: ` save failde:${err}`,
        });
      }
      return this.response({
        res,
        code: 201,
        message: "loaded avatar",
        data: {
          filePath: res.req.file.path,
          fileName: res.req.file.filename,
        },
      });
    });
  }
})();
