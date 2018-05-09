const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost/Bet-control-database');


const User = require('../models/User.js');
const BettingHouse = require('../models/BettingHouse.js');
const Bet = require('../models/Bet.js');


  const bettingHouses = [
    {
       name:"Sportium",
       bank:200
    },
   ]

   BettingHouse.create(bettingHouses, (err) => {
    
    if (err) { throw(err) }
    console.log(`created ${bettingHouses.length} bettingHouses`);
    
  });
  const house = BettingHouse._id;

   const users = [
    {
        username: "Jose",
        email: "jose@jose.com",
        password: "1234",
        bettingHouse: ['5af2c1fd22d09829631829a9'],
    },

  ]
   const bets = [
    {
    bettingHouse: '5af2c1fd22d09829631829a9',
    sport:"Futbol",
    betDescription:"Real Madrid vence al Sevilla",
    status:"Pending",
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

  
  Bet.create(bets, (err) => {
    if (err) { throw(err) }
    console.log(`created ${Bet.length} bets`);
  });
  
  