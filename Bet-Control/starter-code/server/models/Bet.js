const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const BetSchema = new Schema({
    bettingHouse:{ type: Schema.Types.ObjectId, ref: 'BettingHouse' },
    sport:String,
    betDescription:String,
    moneyBet:Number,
    bettingFee:Number,
    totalGain:{ type: Number, default: null },
    parcialGain:{ type: Number, default: null },
});

    const Bet = mongoose.model('bet', BetSchema);
    module.exports = Bet;