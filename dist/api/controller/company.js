'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _company = require('../models/company');

var _company2 = _interopRequireDefault(_company);

var _job = require('../models/job');

var _job2 = _interopRequireDefault(_job);

var _authMiddleware = require('../middleware/authMiddleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var api = (0, _express.Router)();

  //CRUD - Creaate Read Update Delete

  //'/v1/company/add' - create
  api.post('/add', _authMiddleware.authenticate, function (req, res) {
    var newCompany = new _company2.default();

    newCompany.name = req.body.name;
    newCompany.url = req.body.url;
    newCompany.city = req.body.city;
    newCompany.state = req.body.state;
    newCompany.geometry.coordinates.lat = req.body.geometry.coordinates.lat;
    newCompany.geometry.coordinates.long = req.body.geometry.coordinates.long;

    newCompany.save(function (err) {
      if (err) {
        res.send(err);
      }
      //notify the client that the company was saved successfully
      res.json({ message: 'Company saved successfully' });
    });
  });

  //'v1/company' - Read
  api.get('/', function (req, res) {
    //empty {} = return all
    _company2.default.find({}, function (err, companies) {
      if (err) {
        res.send(err);
      }
      //send back all companies
      res.json(companies);
    });
  });

  //'v1/company/:id' - Read id
  api.get('/:id', function (req, res) {
    _company2.default.findById(req.params.id, function (err, company) {
      if (err) {
        res.send(err);
      }
      //send back the found comapny
      res.json(company);
    });
  });

  //'v1/company/:id' - Update
  api.put('/:id', _authMiddleware.authenticate, function (req, res) {
    _company2.default.findById(req.params.id, function (err, company) {
      if (err) {
        res.status(500).send(err);
        return;
      }

      company.name = req.body.name;
      company.url = req.body.url;
      company.city = req.body.city;
      company.state = req.body.state;
      company.geometry.coordinates.lat = req.body.geometry.coordinates.lat;
      company.geometry.coordinates.long = req.body.geometry.coordinates.long;

      company.save(function (err) {
        if (err) {
          res.send(err);
        }
        //send back a job updated success message
        res.json({ message: "Company info updated!" });
      });
    });
  });

  //'v1/company/:id' - Delete
  api.delete("/:id", _authMiddleware.authenticate, function (req, res) {
    _company2.default.findById(req.params.id, function (err, company) {
      if (err) {
        res.status(500).send(err);
        return;
      }
      if (company === null) {
        res.status(404).send("Company Not found");
        return;
      }
      _company2.default.remove({
        _id: req.params.id
      }, function (err, company) {
        if (err) {
          res.status(500).send(err);
          return;
        }
        //remove company jobs if we are removing a company
        _job2.default.remove({
          company: req.params.id
        }, function (err, job) {
          if (err) {
            res.send(err);
          }
          //send back a job deleted success message
          res.json({ message: "Company successfully removed!" });
        });
      });
    });
  });

  //'/v1/company/job/add/:id' - create
  api.post('/job/add/:id', _authMiddleware.authenticate, function (req, res) {
    _company2.default.findById(req.params.id, function (err, company) {
      if (err) {
        res.send(err);
      }

      var newJob = new _job2.default();
      //set the new job properties
      newJob.title = req.body.title;
      newJob.url = req.body.url;
      newJob.type = req.body.type;
      newJob.pay = req.body.pay;
      newJob.status = req.body.status;
      newJob.company = company._id;
      //save the new job
      newJob.save(function (err) {
        if (err) {
          res.send(err);
        }
        company.jobs.push(newJob);
        company.save(function (err) {
          if (err) {
            res.send(err);
          }
          //notify the client that the company was saved successfully
          res.json({ message: 'Company job saved' });
        });
      });
    });
  });

  //get jobs for a specific company id
  //'/v1/company/jobs/:id'
  api.get('/jobs/:id', function (req, res) {
    _job2.default.find({ company: req.params.id }, function (err, jobs) {
      if (err) {
        res.send(err);
      }
      res.json(jobs);
    });
  });

  return api;
};

//use this to lock down any route by putting 'authenticate' between the route path and (req, res)
//# sourceMappingURL=company.js.map