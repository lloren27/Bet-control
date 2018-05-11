require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");

const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const cors = require('cors');


mongoose.Promise = Promise;
mongoose
  .connect(process.env.DBURL, { useMongoClient: true })
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

// Middleware Setup
var whitelist = [
  'http://localhost:4200',
];
var corsOptions = {
  origin: function(origin, callback){
      var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
      callback(null, originIsWhitelisted);
  },
  credentials: true
};
app.use(cors(corsOptions));

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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
  res.locals.user = req.user;
  next()
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


app.use(function(req, res) {
  res.sendfile(__dirname + '/public/index.html');
});


module.exports = app;
