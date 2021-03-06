import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';

const TOKENTIME = 60*60*24*30; //our token is authorized for 30 days
const SECRET = "Ws Jsv2 th3 las02 23ex";

//authenticate
let authenticate = expressJwt({secret: SECRET});

//generate a token
let generateAccessToken = (req, res, next) => {
  req.token = req.token || {};
  req.token = jwt.sign({
    id: req.user.id,
  }, SECRET,{
    expiresIn: TOKENTIME //30 days
  });
  next(); //this is middleware, make sure to call next
}

//respond
let respond = (req, res) => {
  res.status(200).json({
    user: req.user.username,
    token: req.token
  });
}

//export so we can use this elsewhere
module.exports = {
  authenticate,
  generateAccessToken,
  respond
}
