const mongoose = require('mongoose');


const rentCarIncomeSchema = new mongoose.Schema({
    userById: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    soldItems: [
        {
            productId: {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'Salecar',
                required : true
            },
            bookedHours: {
                type : Number,
                required : true
            },
            brand: {
                type : String,
                required : true
            },
            model: {
                type : String,
                required : true
            },
            retailPricePerItem: {
                type : Number,
                required : true
            },
            totalIncome: {
                type : Number,
                required : true
            },
        }
    ]

},{timestamps:true})




const Rentcarincomes = mongoose.model('RENTCARINCOME', rentCarIncomeSchema);

module.exports = Rentcarincomes;


