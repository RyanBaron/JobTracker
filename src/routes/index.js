import express      from 'express';
import config       from '../config';
import middleware   from '../middleware';
import initializeDb from '../db';
import job          from '../controller/job';

let router = express();

//connect to the db
initializeDb(db => {
  //we are connected to the database

  //internal middleware
  router.use(middleware({config, db}));

  //api routes vw (/v1)
  router.use('/job', job({config, db}));

});

export default router;
