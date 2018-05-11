const express = require("express");
const loggedIn = require('../utils/isAuthenticated');
const router = express.Router();
const Bet = require('../models/Bet');
const BettingHouse = require('../models/BettingHouse');
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

module.exports = router;
