'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _job = require('./job');

var _job2 = _interopRequireDefault(_job);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var CompanySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  url: String,
  city: String,
  state: String,
  jobs: [{
    type: Schema.Types.ObjectId,
    ref: "Job"
    //required: true
  }],
  geometry: {
    type: {
      type: String, default: 'Point'
    },
    coordinates: [Number]
  }
});

module.exports = _mongoose2.default.model('Company', CompanySchema);
//# sourceMappingURL=company.js.map