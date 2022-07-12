const express = require('express');
const router = express.Router();
const authenticate = require("../middelware/authenticate");

const User = require('../models/userSchema');
const Rentcar = require('../models/rentcarSchema');

module.exports = router.get('/getRentCarData', authenticate, async (req, res) =>{
    const rentCarData = await Rentcar.find();
    try{
        
        res.status(200).send(rentCarData);

    }catch(error) {
        res.status(400).send(error.message);
    }

    
});