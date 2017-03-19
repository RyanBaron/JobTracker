import mongoose from 'mongoose';
import config from './config';

//connect to the database
export default callback => {
  let db = mongoose.connect(config.mongoUrl);
  //console.log(db);
  callback(db);
}
