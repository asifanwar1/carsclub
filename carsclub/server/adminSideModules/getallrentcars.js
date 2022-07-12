const express = require('express');
const router = express.Router();
const adminAuthentication = require("../middelware/adminAuthentication");

const Rentcar = require('../models/rentcarSchema');

module.exports = router.get('/getAvailableRentCars', adminAuthentication, async (req, res) =>{
    const allRentCars = await Rentcar.find();

    try{
        
        res.status(200).send(allRentCars);

    }catch(error) {
        res.status(400).send(error.message);
    }

    
});