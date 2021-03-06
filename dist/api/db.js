'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//connect to the database
exports.default = function (callback) {
  _mongoose2.default.Promise = global.Promise; //silence mongoose warning (were not using promises, were using callbacks)
  var db = _mongoose2.default.connect(_config2.default.mongoUrl);
  //console.log(db);
  callback(db);
};
//# sourceMappingURL=db.js.map