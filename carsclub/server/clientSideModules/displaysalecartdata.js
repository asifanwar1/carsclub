const express = require('express');
const router = express.Router();
const authenticate = require("../middelware/authenticate");


const User = require('../models/userSchema');
const Cart = require('../models/cartSchema');


module.exports = router.get('/getCartData', authenticate, async (req, res) =>{
    const findUser = await User.findOne({_id: req.userID});
    const findUserById = findUser._id;

    const cartData = await Cart.findOne({userById: findUserById});
    try{
        
        res.status(200).send(cartData);

    }catch(error) {
        res.status(400).send(error.message);
    }

    
});