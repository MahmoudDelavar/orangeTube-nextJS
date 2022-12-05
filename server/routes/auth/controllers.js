const { validationResult } = require("express-validator");
const controller = require("../controller");

//====================================

module.exports = new (class extends controller {
  async register(req, res) {
    this.response({
      res,
      code: 400,
      data: { name: "test" },
      message: "ok",
      isSuccess: true,
    });
  }
  async login(req, res) {
    res.send("in LOGIN routs");
  }
})();
