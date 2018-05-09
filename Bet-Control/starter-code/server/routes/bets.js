const express = require('express');
const router = express.Router();
const Bet = require('../models/Bet');
const BettingHouse = require('../models/BettingHouse');
const loggedIn = require('../utils/isAuthenticated');
const crud = require('./crud');

//listar las apuestas;

router.get('/bybettinghouse/:id', (req, res) => {
  Bet.find({
    bettinghouse_id: req.params.id
  }).then(bets => {
    return res.json(bets);
  })
})
// Updatebank  
router.post("/newbet/:id", (req, res, next) => {
  const betId = req.params.id;
  Bet.findById(betId)
    .then(bet => {
      const bettingHouseId = bet.bettingHouse
      BettingHouse.findById(bettingHouseId)
        .then(bettinghouse => {
          const newbank = bettinghouse.bank - (bet.moneyBet)
          const bank = newbank;
          const update = {
            bank: newbank
          };
          BettingHouse.findByIdAndUpdate(bettingHouseId, update).then(bettinghouse => {
            bettinghouse.bank = newbank;
            console.log("NEW", bettinghouse)
          })
        })
    })
})

// Certificate Winnerbet
router.post("/certificatedBetWin/:id", (req, res, next) => {
  const betId = req.params.id;
  const update1 = {
    status: "Win"
  }
  Bet.findById(betId)
    .then(bet => {
      const bettingHouseId = bet.bettingHouse
      BettingHouse.findById(bettingHouseId)
        .then(bettinghouse => {

          //console.log("2", bettinghouse)
          const newbank = bettinghouse.bank + (bet.moneyBet * bet.bettingFee)
          //console.log(newbank)
          const bank = newbank;
          const update = {
            bank: newbank
          };
          //console.log("UPDATE", update)
          BettingHouse.findByIdAndUpdate(bettingHouseId, update).then(bettinghouse => {
            bettinghouse.bank = newbank;
            console.log("WIN", bettinghouse)
          })
          Bet.findByIdAndUpdate(betId, update1).then(bet => {
            bet.status = update1.status
            console.log("WINSTATUS", bet)
          })

        })
    })
})
// Certificate CashOut
router.post("/certificatedCashOut/:id", (req, res, next) => {
  const betId = req.params.id;
  const cashOut = req.body.cashOut
  const update1 = {
    status: "Cash Out"
  }
  Bet.findById(betId)
    .populate("bettingHouse")
    .then(bet => {
      const bettingHouseId = bet.bettingHouse
      const newbank = (parseInt(bet.bettingHouse.bank) + parseInt(cashOut))
      console.log(newbank)
      const update = {
        bank: parseInt(newbank)
      };
      console.log(update)
      BettingHouse.findByIdAndUpdate(bettingHouseId, update).then(bettinghouse => {
        bettinghouse.bank = update.bank;
       // console.log("CASH OUT", bettinghouse)
      })
      Bet.findByIdAndUpdate(betId, update1).then(bet => {
        bet.status = update1.status
       console.log("CASH OUT STATUS", bet)
      })
    })

})
// Certificate Failed
router.post("/certificatedFailed/:id", (req, res, next) => {
  const betId = req.params.id;
  const update = {
    status: "Loose"
  }
  Bet.findByIdAndUpdate(betId, update).then(bet => {
    console.log(bet, update)
    bet.status = update.status
    console.log("LOSE", bet)
  }).catch(e => console.log(e))

})

module.exports = router;


///Si es lose no actualiza nada, solo cambia la prop del si se ha resuelto o no la apuesta. True / False
///Si le da a ganar le mandamos las instrucciones aqui