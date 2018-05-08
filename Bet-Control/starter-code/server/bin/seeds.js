const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost/Bet-control-database');


const User = require('../models/User.js');
const BettingHouse = require('../models/BettingHouse.js');
const Bet = require('../models/Bet.js');

const users = [
    {
        username: "Jose",
        email: "jose@jose.com",
        password: "1234",
        bettingHouse:{ type: Schema.Types.ObjectId, ref: 'BettingHouse' },
    },

  ]
  const bettingHouses = [
    {
        acount: [
            {
              bettingHouse:["Bet365"],
              bank:[100],
            }
        ]
    },
   ]
   const bets = [
    {
    bettingHouse:{ type: Schema.Types.ObjectId, ref: 'BettingHouse' },
    sport:"Futbol",
    betDescription:"Real Madrid vence al Sevilla",
    moneyBet:10,
    bettingFee:2,
    totalGain:0,
    parcialGain:0,
    },

  ]
  
  User.create(users, (err) => {
    if (err) { throw(err) }
    console.log(`Created ${users.length} users`)
  });
  BettingHouse.create(bettingHouses, (err) => {
    if (err) { throw(err) }
    console.log(`created ${bettingHouses.length} bettingHouses`);
  });
  Bet.create(bets, (err) => {
    if (err) { throw(err) }
    console.log(`created ${Bet.length} bets`);
  });