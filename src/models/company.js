import mongoose from 'mongoose';
import Job from './job';

let Schema = mongoose.Schema;

let CompanySchema = new Schema({
  name:     {
    type: String,
    required: true
  },
  url:      String,
  city:     String,
  state:    String,
  jobs:     [{
    type: Schema.Types.ObjectId,
    ref:  "Job"
    //required: true
  }],
  geometry: {
    type: {
      type: String, default: 'Point'
    },
    coordinates: [Number]
  }
});

module.exports = mongoose.model('Company', CompanySchema);
