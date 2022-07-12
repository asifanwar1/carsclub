const express = require('express');
const router = express.Router();
const authenticate = require("../middelware/authenticate");



const User = require('../models/userSchema');
const Rentcar = require('../models/rentcarSchema');
const Rentcart = require('../models/rentcartSchema');
const Rentcarincomes = require('../models/rentCarIncomeSchema');


module.exports = router.post('/updateRentDataBase', authenticate, async(req, res)=>{
    const getRentedCars = req.body.items;
    let rentedCarPrice, rentedCarId, rentedCarHours, rentedCarBrand, rentedCarModel;
    
    getRentedCars.map(getRentedCars=>{
        rentedCarPrice = getRentedCars.totalbill;
        rentedCarId = getRentedCars.rentcarid;
        rentedCarHours = getRentedCars.requiredhours;
        rentedCarBrand = getRentedCars.brand;
        rentedCarModel = getRentedCars.model;
    })
    
    const findUser = await User.findOne({_id: req.userID});
    const findUserByID = findUser._id;
    const findCar = await Rentcar.findOne({_id: rentedCarId});
    const cartData = await Rentcart.findOne({userById: findUserByID});
    const cartId = cartData._id;
    const carById = findCar._id; 
    const rentCarBuyedPrice = findCar.price;

    try {
        
        const newincome = new Rentcarincomes({
            userById : findUser,
            soldItems: [{
                productId : carById, 
                bookedHours : rentedCarHours, 
                brand : rentedCarBrand, 
                model : rentedCarModel, 
                retailPricePerItem : rentCarBuyedPrice, 
                totalIncome : rentedCarPrice
            }]
        });

        await newincome.save();

        
        await Rentcart.deleteOne({"_id": cartId});
        
    }
    catch(error) {
        res.status(500).send(error.message);
    }

})