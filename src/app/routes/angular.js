import express      from 'express';
import path from 'path';
//import config       from '../config';
//import middleware   from '../middleware';
//import initializeDb from '../db';
//import job          from '../controller/company';
//import account      from '../controller/account';

let router = express();
//console.log('here in the angular');
//connect to the db
//initializeDb(db => {

  // application -------------------------------------------------------------
  router.use('*', function(req, res) {
    console.log('DIR NAME', __dirname);
    //console.log(router);
    res.sendFile('index.html', { root: path.join(__dirname, '../public') });
    //res.sendFile(__dirname + '../', '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });

  //we are connected to the database

  //internal middleware
  //router.use(middleware({config, db}));

  //api routes vw (/v1)
  //router.use('/company', job({config, db}));
  //router.use('/account', account({config, db}));

//});

export default router;
