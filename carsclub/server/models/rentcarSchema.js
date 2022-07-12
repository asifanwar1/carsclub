const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const rentcarSchema = new mongoose.Schema({
     brand: {
         type : String,
         required: true
     },
     model: {
         type: String,
         required: true
     },
     year: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    seats: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    rent: {
        type: String,
        required: true
    },
    availability: {
        type: String,
        default: "Available for rent"
    },
    bookedHours: {
        type: Number,
        default: 0
    },
    fileName: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    fileType: {
        type: String,
        required: true
    },
    fileSize: {
        type: String,
        required: true
    }
},{timestamps:true})

// hashing password

// adminSchema.pre('save', async function(next){
    
//     if(this.isModified('password')){
//         this.password = await bcrypt.hash(this.password, 12);
//         this.cPassword = await bcrypt.hash(this.cPassword, 12);
//     }
//     next();

// });


// //generating token
// adminSchema.methods.generateAuthToken = async function(){
//     try{
//         let token = jwt.sign({_id: this._id}, process.env.SECRET_KEY);
    
//         this.tokens = this.tokens.concat({token:token});
//         await this.save();
//         return token;

//     }catch(err){
//         console.log(err)
//     }
// }
rentcarSchema.index({ brand: "text", model: "text" });

const Rentcar = mongoose.model('RENTCAR', rentcarSchema);

module.exports = Rentcar;


