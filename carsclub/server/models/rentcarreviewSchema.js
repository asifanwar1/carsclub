const mongoose = require('mongoose');


const rentcarreviewSchema = new mongoose.Schema({
    carById: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Rentcar',
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




const Rentcarreviews = mongoose.model('RENTCARREVIEW', rentcarreviewSchema);

module.exports = Rentcarreviews;


