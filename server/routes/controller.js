const autoBind = require("auto-bind");
const { validationResult } = require("express-validator");
//====================================

module.exports = class {
  constructor() {
    autoBind(this);
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
