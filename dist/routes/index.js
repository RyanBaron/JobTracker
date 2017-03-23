'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _middleware = require('../middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

var _company = require('../controller/company');

var _company2 = _interopRequireDefault(_company);

var _account = require('../controller/account');

var _account2 = _interopRequireDefault(_account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express2.default)();

//connect to the db
(0, _db2.default)(function (db) {
  //we are connected to the database

  //internal middleware
  router.use((0, _middleware2.default)({ config: _config2.default, db: db }));

  //api routes vw (/v1)
  router.use('/company', (0, _company2.default)({ config: _config2.default, db: db }));
  router.use('/account', (0, _account2.default)({ config: _config2.default, db: db }));
});

exports.default = router;
//# sourceMappingURL=index.js.map