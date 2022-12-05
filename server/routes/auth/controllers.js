const { validationResult } = require("express-validator");
const controller = require("../controller");

//====================================

module.exports = new (class extends controller {
  async register(req, res) {
    res.json({ message: "regiter Successful" });
  }
  async login(req, res) {
    res.send("in LOGIN routs");
  }
})();
