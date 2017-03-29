import http       from 'http';
import express    from 'express';
import bodyParser from 'body-parser';
import mongoose   from 'mongoose';
import passport   from 'passport';
const LocalStrategy = require('passport-local').Strategy; //delare our local strategry variable

import config     from './config';
import routes     from './api/routes';
import angularRoutes from './app/routes';

let app = express();
app.server = http.createServer(app);

//middleware
//parse application/json
app.use(bodyParser.json({
  limit: config.bodyLimit
}));

//passport config
app.use(passport.initialize());
let Account = require('./api/models/account');
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  Account.authenticate()
));
//seralize/desarize user
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

//console.log('ANGULER ORUTES', angularRoutes);
//angular routes


//api routes v1
app.use('/jobtracker/api/v1', routes);

//angular routes
app.use('/', angularRoutes);
/*
app.use('/', function(req, res) {
  console.log('in the /app route');
  //console.log(res);
  res.sendFile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});
*/
//app.use('/app', angularRoutes);

//console.log(app);

app.server.listen(config.port);
//console.log("Started on port: " + app.server.address().port); 
console.log("started on port: " + config.port);
export default app;
