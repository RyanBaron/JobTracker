import http       from 'http';
import express    from 'express';
import bodyParser from 'body-parser';
import mongoose   from 'mongoose'; 
import passport   from 'passport';
const LocalStrategy = require('passport-local').Strategy; //delare our local strategry variable

import config     from './config';
import routes     from './routes';

let app = express();
app.server = http.createServer(app);

//middleware
//parse application/json
app.use(bodyParser.json({
  limit: config.bodyLimit
}));

//passport config
app.use(passport.initialize());
let Account = require('./models/account');
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  Account.authenticate()
));
//seralize/desarize user
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

//api routes v1
app.use('/jobtracker/api/v1', routes);

app.server.listen(config.port);
console.log("Started on port: " + app.server.address().port);

export default app;
