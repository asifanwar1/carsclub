const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const salecarSchema = new mongoose.Schema({
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
    enginecc: {
        type: String,
        required: true
    },
    maxpower: {
        type: String,
        required: true
    },
    airbags: {
        type: String,
        required: true
    },
    rearcamera: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    retailprice: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
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
salecarSchema.index({ brand: "text", model: "text" });

const Salecar = mongoose.model('SALECAR', salecarSchema);

module.exports = Salecar;


