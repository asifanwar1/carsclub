const express = require('express');
const router = express.Router();

const Salecar = require('../models/salecarSchema');

module.exports = router.get('/exploreSaleCarData', async (req, res) =>{
    const saleCarData = await Salecar.find();
    try{
        
        res.status(200).send(saleCarData);

    }catch(error) {
        res.status(400).send(error.message);
    }

    
});