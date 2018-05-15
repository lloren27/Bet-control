const express = require('express');
const router = express.Router();
const Bet = require('../models/Bet');
const BettingHouse = require('../models/BettingHouse');
const User = require('../models/User');
const crud = require('./crud');
const _ = require("lodash");
const fields = Object.keys(_.omit(Bet.schema.paths, ["__v", "_id"]));


//listar las apuestas pendientes;
router.get('/:id', (req, res) => {
  console.log(req.params.id)
  const user = req.params.id
    Bet.find({
      userId: user,status:"Pending"
    })
    .then(bets => {
      //Traigo las apuestas que tienen ese betting house
      console.log(bets)
      return res.status(200).json(bets);
    })
  });
// detalles de cada apuesta 
router.get("/detail/:id", (req, res, next) => {
  console.log("Recoge_este",req.params.id)
  Bet.findById(req.params.id)
    .then(bet => res.json(bet))
    .catch(e => next(e));
});
  //Create
  router.post("/newbet", (req, res, next) => {
    const bet = _.pick(req.body, fields);
    Bet.create(bet)
      .then(bet => {
        //res.json(bet)
        Bet.findById(bet._id)
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
    
                return res.json(`Tu apuesta se ha realizado, el saldo de tu cuenta es ${newbank}`);
              })
            })
        })
      })
      //.catch(e => next(e));
  });
// Updatebank  
// router.post("/newbet/:id", (req, res, next) => {
//   const betId = req.params.id;
  
 // })

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
          const totalGain = bet.moneyBet * bet.bettingFee
          const newbank = bettinghouse.bank + (totalGain)
          //console.log(newbank)
          const bank = newbank;
          const update = {
            bank: newbank
          };
          //console.log("UPDATE", update)
          BettingHouse.findByIdAndUpdate(bettingHouseId, update).then(bettinghouse => {
            bettinghouse.bank = newbank;
            console.log("WIN", bettinghouse)
            Bet.findByIdAndUpdate(betId, update1).then(bet => {
              bet.status = update1.status
              console.log("WINSTATUS", bet)

              return res.json(`Has ganado la apuesta , ingresas ${totalGain}€ `)
            })
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
      //console.log(newbank)
      const update = {
        bank: parseInt(newbank)
      };
      const update2 ={
        parcialGain: parseInt(cashOut)
      }
      Bet.findByIdAndUpdate(betId, update1).then(bet => {
        bet.status = update1.status
        // bet.parcialGain = upadate2.parcialGain
        console.log("CASH OUT STATUS", bet)
        BettingHouse.findByIdAndUpdate(bettingHouseId, update).then(bettinghouse => {
          bettinghouse.bank = update.bank;
          console.log("CASH OUT", bettinghouse)
          Bet.findByIdAndUpdate(betId, update2).then(bet => {
            bet.parcialGain = update2.parcialGain
          return res.json(`Has retirado tu apuesta antes de tiempo y has ingresado ${cashOut}`)
        })
      })
      })
    })

})
// Certificate Failed
router.post("/certificatedFailed/:id", (req, res, next) => {
  const betId = req.params.id;
  const update = {
    status: "Lost"
  }
  Bet.findByIdAndUpdate(betId, update).then(bet => {
    console.log(bet, update)
    bet.status = update.status
    console.log("LOSE", bet)

    return res.json(`Has fallado la apuesta`)
  }).catch(e => console.log(e))

})
//Contador de APUESTAS GANADAS;
router.get('/win/:id', (req, res) => {
  console.log(req.params.id)
  const user = req.params.id
    Bet.find({
      userId: user,status:"Win"
    })
    .then(bets => {
      console.log(bets)
      return res.status(200).json(bets);
    })
  });
//Contador de APUESTAS PERDIDAS;
router.get('/lost/:id', (req, res) => {
  console.log(req.params.id)
  const user = req.params.id
    Bet.find({
      userId: user,status:"Lost"
    })
    .then(bets => {
      console.log(bets)
      return res.status(200).json(bets);
    })
  });
  //Contador de APUESTAS CASHOUT;
router.get('/cashout/:id', (req, res) => {
  console.log(req.params.id)
  const user = req.params.id
    Bet.find({
      userId: user,status:"Cash Out"
    })
    .then(bets => {
      console.log(bets)
      return res.status(200).json(bets);
    })
  });
  router.get('/total/:id', (req, res) => {
    console.log(req.params.id)
    const user = req.params.id
      Bet.find({
        userId: user
      })
      .then(bets => {
        console.log(bets)
        return res.status(200).json(bets);
      })
    });

module.exports = router;


///Si es lose no actualiza nada, solo cambia la prop del si se ha resuelto o no la apuesta. True / False
///Si le da a ganar le mandamos las instrucciones aqui