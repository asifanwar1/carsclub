const express = require('express');
const router = express.Router();

const Rentcar = require('../models/rentcarSchema');

module.exports = router.get('/exploreRentCarData', async (req, res) =>{
    const rentCarData = await Rentcar.find();
    try{
        
        res.status(200).send(rentCarData);

    }catch(error) {
        res.status(400).send(error.message);
    }

    
});