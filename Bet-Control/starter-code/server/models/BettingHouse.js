const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const BeetingHouseSchema = new Schema({
    acount: [
        {
          bettingHouse:Array,
          bank: Array,
        }
    ]

});

    const BettingHouse = mongoose.model('BettingHouse', BettingSchema);
    module.exports = BettingHouse;
    