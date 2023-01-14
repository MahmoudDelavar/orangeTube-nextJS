const jwt = require("jsonwebtoken");
const { jwt_key } = require("../.../../../next.config");
const User = require("../models/user");
//=================================================
async function isLoggined(req, res, next) {
  const token = req.body.token;
  if (!token) {
    res.json({
      res,
      code: 401,
      isSuccess: false,
      message: "access denied",
    });
    try {
      const decoded = jwt.verify(token, jwt_key);
      const user = await User.findById(decoded._id);
      req.user = user;
      next();
    } catch (ex) {
      res.json({ res, code: 400, message: "invalid token" });
    }
  }
}

module.exports = isLoggined;
