require("dotenv").config()
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const layouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const cors = require("cors");

mongoose.Promise = Promise;
mongoose
  .connect(process.env.DBURL, {})
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

const whitelist = ["http://localhost:4200"];

var corsOptions = {
  origin: function (origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true
};

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(
  session({
    secret: "betcontrol-app",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 // 1 day
    })
  })
);
require("./passport")(app);

app.use((req, res, next) => {
  console.log(req.session.passport)
  res.locals.user = req.user;
  //console.log("EN RES LOCALS", req.user)
  next();
})
// Express View engine setup

app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));

// default value for title local
app.locals.title = "Express - Generated with IronGenerator";

const BettingHouse = require('./models/BettingHouse');
const Bet = require('./models/Bet')
const authRoutes = require('./routes/authentication');
const index = require('./routes/index');
const extendedBettingHouse = require('./routes/extBettingHouse')

app.use('/', index);
app.use('/api/auth', authRoutes);
app.use('/api/bettingHouse/income', extendedBettingHouse);
app.use('/api/bettingHouse', require('./routes/crud')(BettingHouse));
app.use('/api/bet', require('./routes/bets'));

// // catch 404 and forward to error handler
// app.use((req, res, next) => {
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handler
// app.use((err, req, res, next) => {
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;