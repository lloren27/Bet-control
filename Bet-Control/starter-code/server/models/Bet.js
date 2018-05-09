const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const BetSchema = new Schema({
    bettingHouse:{ type: Schema.Types.ObjectId, ref: 'BettingHouse' },
    sport:String,
    betDescription:String,
    status:{type: String,
    default:'Pending'
    },
    moneyBet:Number,
    bettingFee:Number,
    totalGain:{ type: Number, default: null },
    parcialGain:{ type: Number, default: null },
});

    const Bet = mongoose.model('bet', BetSchema);
    module.exports = Bet;

    //Arrerglar modelo quitar enum dejar String y default Pending
    //Meter el status en ñlas rutas
    //Devolver lops JSON con la actualizacion (status 200.... etc...)