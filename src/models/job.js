import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let JobSchema = new Schema({
  title:    String,
  website:  String,
  type:     String,
  city:     String,
  pay:      String,
  status:   String
});

module.exports = mongoose.model('Job', JobSchema);
