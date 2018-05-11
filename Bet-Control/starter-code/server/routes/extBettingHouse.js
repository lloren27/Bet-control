const express = require("express");
const loggedIn = require('../utils/isAuthenticated');
const _ = require("lodash");
const Bet = require('../models/Bet');
const BettingHouse = require('../models/BettingHouse');
const loggedIn = require('../utils/isAuthenticated');
const crud = require('./crud');


router.put("/:id", (req, res, next) => {
    console.log(req.body)
    const updates = _.pick(req.body, fields);
    console.log(updates)
    Model.findByIdAndUpdate(req.params.id, updates, { new: true })
      .then(object => res.json(object))
      .catch(e => next(e));
  });