const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const BeetingHouseSchema = new Schema({
    acount: [
        {
          bettingHouse: String,
          bank: Number,
        }
    ]
});
    module.exports = mongoose.model('BettingHouse', BeetingHouseSchema);
    