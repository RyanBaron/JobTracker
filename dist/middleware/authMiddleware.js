'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _expressJwt = require('express-jwt');

var _expressJwt2 = _interopRequireDefault(_expressJwt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TOKENTIME = 60 * 60 * 24 * 30; //our token is authorized for 30 days
var SECRET = "Ws Jsv2 th3 las02 23ex";

//authenticate
var authenticate = (0, _expressJwt2.default)({ secret: SECRET });

//generate a token
var generateAccessToken = function generateAccessToken(req, res, next) {
  req.token = req.token || {};
  req.token = _jsonwebtoken2.default.sign({
    id: req.user.id
  }, SECRET, {
    expiresIn: TOKENTIME //30 days
  });
  next(); //this is middleware, make sure to call next
};

//respond
var respond = function respond(req, res) {
  res.status(200).json({
    user: req.user.username,
    token: req.token
  });
};

//export so we can use this elsewhere
module.exports = {
  authenticate: authenticate,
  generateAccessToken: generateAccessToken,
  respond: respond
};
//# sourceMappingURL=authMiddleware.js.map