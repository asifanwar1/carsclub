const express = require('express');
const router = express.Router();
const adminAuthentication = require("../middelware/adminAuthentication");

const Salecar = require('../models/salecarSchema');



module.exports = router.post('/deleteSaleCarFromDashboard', adminAuthentication, async (req, res)=>{
    const getId = req.body.carIdFromDashBoard
    const x = getId
    const findCar = await Salecar.findOneAndDelete({_id: x})
    
})