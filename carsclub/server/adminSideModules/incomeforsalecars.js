const express = require('express');
const router = express.Router();
const adminAuthentication = require("../middelware/adminAuthentication");

const Salecarincomes = require('../models/saleCarIncomeSchema');

//get car income in dashboard
module.exports = router.get('/getsalecarincome', adminAuthentication, async (req, res) =>{
    const allIncomes = await Salecarincomes.find();

    // console.log(allIncomes);
    try{
        
        res.status(200).send(allIncomes);

    }catch(error) {
        res.status(400).send(error.message);
    }

    
});