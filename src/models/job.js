import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let JobSchema = new Schema({
  title:    {
    type:     String,
    required: true
  },
  url:      String,
  type:     String,
  pay:      String,
  status:   String,
  company:  {type: Schema.Types.ObjectId, ref: 'Company'}
});

module.exports = mongoose.model('Job', JobSchema);
