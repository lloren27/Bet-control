const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const BetSchema = new Schema({
    bettingHouse:{ type: Schema.Types.ObjectId, ref: 'BettingHouse' },
    userId:{ type:Schema.Types.ObjectId, ref: 'User'},
    sport:String,
    betDescription:String,
    status:{type: String,
    default:'Pending'
    },
    moneyBet:Number,
    bettingFee:Number,
    totalGain:{ type: Number, default: null },
    parcialGain:{ type: Number, default: null },
},
{
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

    const Bet = mongoose.model('bet', BetSchema);
    module.exports = Bet;

    