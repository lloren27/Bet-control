
const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const layouts      = require('express-ejs-layouts');
const mongoose     = require('mongoose');
const session      = require('express-session');
const MongoStore   = require('connect-mongo')(session);
const passport     = require('passport');
const configure    = require('./config/passport.js');
const cors = require("cors");

mongoose.connect('mongodb://localhost/Bet-control-database');

const app = express();
const whitelist = ["http://localhost:4200"];

var corsOptions = {
  origin: function(origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true
};

app.use(session({
  secret: "betcontrol-app",
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

configure(passport);

app.use(passport.initialize());
app.use(cors(corsOptions));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.locals.title = 'Express - Generated with IronGenerator';


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(layouts);

app.use((req, res, next) => {
  res.locals.user = req.user;
  console.log("EN EL MIDDLEWARE", res.locals.user)
  next();
})

const BettingHouse = require('./models/BettingHouse');
const Bet = require('./models/Bet')
const authRoutes = require('./routes/authentication');
const index = require('./routes/index');
const extendedBettingHouse = require('./routes/extBettingHouse')

app.use('/', index);
app.use('/api/auth', authRoutes);
app.use('/api/bettingHouse/income',extendedBettingHouse);
app.use('/api/bettingHouse', require('./routes/crud')(BettingHouse));
app.use('/api/bet', require('./routes/bets'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
