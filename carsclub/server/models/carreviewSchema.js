const mongoose = require('mongoose');


const carreviewSchema = new mongoose.Schema({
    carById: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Salecar',
        required : true
    },
    allReviews: [
        {
            userById: {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'User',
                required : true
            },
            name: {
                type : String,
                required : true
            },
            email: {
                type : String,
                required : true
            },
            comments: {
                type : String,
                required : true
            }
        }
    ]

},{timestamps:true})




const Salecarreviews = mongoose.model('SALECARREVIEW', carreviewSchema);

module.exports = Salecarreviews;


