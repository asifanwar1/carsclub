const express = require('express');
const router = express.Router();
const adminAuthentication = require("../middelware/adminAuthentication");

const Salecar = require('../models/salecarSchema');


module.exports = router.get('/getAvailableSaleCars', adminAuthentication, async (req, res) =>{
    const allSaleCars = await Salecar.find();

    try{
        
        res.status(200).send(allSaleCars);

    }catch(error) {
        res.status(400).send(error.message);
    }

    
});