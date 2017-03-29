'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import config       from '../config';
//import middleware   from '../middleware';
//import initializeDb from '../db';
//import job          from '../controller/company';
//import account      from '../controller/account';

var router = (0, _express2.default)();
//console.log('here in the angular');
//connect to the db
//initializeDb(db => {

// application -------------------------------------------------------------
router.use('*', function (req, res) {
  console.log('DIR NAME', __dirname);
  //console.log(router);
  res.sendFile('index.html', { root: _path2.default.join(__dirname, '../public') });
  //res.sendFile(__dirname + '../', '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

//we are connected to the database

//internal middleware
//router.use(middleware({config, db}));

//api routes vw (/v1)
//router.use('/company', job({config, db}));
//router.use('/account', account({config, db}));

//});

exports.default = router;
//# sourceMappingURL=angular.js.map