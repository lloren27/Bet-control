const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const BeetingHouseSchema = new Schema({
    
    name: {
        type: String,
        enum: ['Bet365', 'Betfair','Sportium','MarcaApuestas','Wanabet','WilliamHill','Bwin','888sports'],
        default:'Bet365'
        },
    bank:Number
    
});
    module.exports = mongoose.model('BettingHouse', BeetingHouseSchema);
    