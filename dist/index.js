'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _routes = require('./api/routes');

var _routes2 = _interopRequireDefault(_routes);

var _routes3 = require('./app/routes');

var _routes4 = _interopRequireDefault(_routes3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LocalStrategy = require('passport-local').Strategy; //delare our local strategry variable

var app = (0, _express2.default)();
app.server = _http2.default.createServer(app);

//middleware
//parse application/json
app.use(_bodyParser2.default.json({
  limit: _config2.default.bodyLimit
}));

//passport config
app.use(_passport2.default.initialize());
var Account = require('./api/models/account');
_passport2.default.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, Account.authenticate()));
//seralize/desarize user
_passport2.default.serializeUser(Account.serializeUser());
_passport2.default.deserializeUser(Account.deserializeUser());

//console.log('ANGULER ORUTES', angularRoutes);
//angular routes


//api routes v1
app.use('/jobtracker/api/v1', _routes2.default);

//angular routes
app.use('/', _routes4.default);
/*
app.use('/', function(req, res) {
  console.log('in the /app route');
  //console.log(res);
  res.sendFile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});
*/
//app.use('/app', angularRoutes);

//console.log(app);

app.server.listen(_config2.default.port);
console.log("Started on port: " + app.server.address().port);
//console.log("started on port: " + config.port);
exports.default = app;
//# sourceMappingURL=index.js.map