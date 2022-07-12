const express = require('express');
const router = express.Router();
const authenticate = require("../middelware/authenticate");


const User = require('../models/userSchema');
const Cart = require('../models/cartSchema');


module.exports = router.post('/deleteitemfromcart', async (req, res)=>{
    const getId = req.body.cartitemid
    const x = getId
    
    const findUser = await User.findOneAndDelete({getId})
})
