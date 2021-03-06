const express = require("express");
const router = express.Router();
const Bet = require('../models/Bet');
const BettingHouse = require('../models/BettingHouse');
const User = require('../models/User');
const crud = require('./crud');

router.put("/:id", (req, res, next) => {
    const newincome = req.body.newincome, bettinghouseId = req.params.id;
    BettingHouse.findById(bettinghouseId)
    .then(bettinghouse => {
      const newbank = bettinghouse.bank + (newincome)
      const updates = { bank : newbank };
    BettingHouse.findByIdAndUpdate(bettinghouseId, updates, { new: true })
    .then(bettinghouse => {
        return res.json(`Has realizado un ingreso de ${newincome}`)
    }).catch(e => next(e));
  });
})
router.post("/new", (req, res, next) => {
  const newBettingHouse = new BettingHouse({
    name: req.body.name,
    user: req.user.id,
    bank: req.body.bank,
  });
  const user = req.user.id
  console.log (req.user.id)
  console.log (newBettingHouse)
  newBettingHouse.save(function(err,bettinghouse) {
    if (err) {
      console.log(err);
      return res.status(500).json({message: "Ha habido un error"});
    } else {
      User.findById(req.user.id).then((user)=> {
        user.bettingHouse.push(bettinghouse._id);
        user.save();
        res.status(200).json(user)
      })
    }
  });
});
module.exports = router;


