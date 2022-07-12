const express = require('express');
const router = express.Router();
const authenticate = require("../middelware/authenticate");


const User = require('../models/userSchema');
const Salecar = require('../models/salecarSchema');
const Cart = require('../models/cartSchema');
const Salecarincomes = require('../models/saleCarIncomeSchema');



module.exports = router.post('/updateDataBase', authenticate, async(req, res)=>{
    const getSoldCars = req.body.items;
    let soldCarPrice, soldCarId, soldCarQuantity, soldCarBrand, soldCarModel;
    
    getSoldCars.map(getSoldCars=>{
        soldCarPrice = getSoldCars.price;
        soldCarId = getSoldCars.product;
        soldCarQuantity = getSoldCars.quantity;
        soldCarBrand = getSoldCars.brand;
        soldCarModel = getSoldCars.model;
    })
    
    const findUser = await User.findOne({_id: req.userID});
    const findUserByID = findUser._id;
    const findCar = await Salecar.findOne({_id: soldCarId});
    const cartData = await Cart.findOne({userById: findUserByID});
    const cartId = cartData._id;
    const carById = findCar._id;
    const carRetailPrice = findCar.retailprice;
    const carQuantity = findCar.quantity;

    let remainingQuantity = carQuantity - soldCarQuantity;
    let retailAmount = carRetailPrice * soldCarQuantity;
    let calculatedIncome = soldCarPrice - retailAmount;

    try {
        
        const newincome = new Salecarincomes({
            userById : findUser,
            soldItems: [{
                productId : carById, 
                quantity : soldCarQuantity, 
                brand : soldCarBrand, 
                model : soldCarModel, 
                retailPricePerItem : carRetailPrice, 
                totalPrice : soldCarPrice,
                totalIncome : calculatedIncome
            }]
        });

        await newincome.save();

        await Salecar.updateOne({"_id": carById},{$set:{"quantity" : remainingQuantity}})
        await Cart.deleteOne({"_id": cartId});
        
    }
    catch(error) {
        res.status(500).send(error.message);
    }

}) 