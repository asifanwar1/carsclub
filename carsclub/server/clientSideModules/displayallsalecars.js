const express = require('express');
const router = express.Router();
const authenticate = require("../middelware/authenticate");

const User = require('../models/userSchema');
const Salecar = require('../models/salecarSchema');

module.exports = router.get('/getSaleCarData', authenticate, async (req, res) =>{
    const findUser = await User.findOne({_id: req.userID});
    const saleCarData = await Salecar.find();
    try{
        
        res.status(200).send([{saleCarData, findUser}]);

    }catch(error) {
        res.status(400).send(error.message);
    }

    
});