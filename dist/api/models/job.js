'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var JobSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  url: String,
  type: String,
  pay: String,
  status: String,
  company: { type: Schema.Types.ObjectId, ref: 'Company' }
});

module.exports = _mongoose2.default.model('Job', JobSchema);
//# sourceMappingURL=job.js.map