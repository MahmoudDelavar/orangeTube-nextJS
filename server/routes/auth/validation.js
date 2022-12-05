const expressValidator = require("express-validator");
const { login } = require("./controllers");
//====================================

const check = expressValidator.check;

module.exports = new (class {
  register() {
    return [
      check("email").isEmail().withMessage("فرمت ایمیل صحیح نیست"),
      check("userName")
        .isLength({ min: 3 })
        .withMessage("نام کاربری حداقل شامل 3 کاراکتر باشد "),
      check("password")
        .isLength({ min: 6 })
        .withMessage("پسوررد حدقل 6 کارارمتر باشد"),
    ];
  }
  login() {
    return [
      check("email").isEmail().withMessage("فرمت ایمیل صحیح نیست"),
      check("password")
        .isLength({ min: 6 })
        .withMessage("پسوررد حدقل 6 کارارمتر باشد"),
    ];
  }
})();
