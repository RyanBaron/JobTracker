import mongoose from 'mongoose';
import config from './config';

//connect to the database
export default callback => {
  mongoose.Promise = global.Promise; //silence mongoose warning (were not using promises, were using callbacks)
  let db = mongoose.connect(config.mongoUrl);
  //console.log(db);
  callback(db);
}
