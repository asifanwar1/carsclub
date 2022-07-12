const express = require('express');
const router = express.Router();
const authenticate = require("../middelware/authenticate");


const User = require('../models/userSchema');
const Salecar = require('../models/salecarSchema');
const Cart = require('../models/cartSchema');

module.exports = router.post('/addtocart', authenticate, async(req, res)=>{
    const getItemId = req.body.itemId;
    const findUser = await User.findOne({_id: req.userID});
    const findUserById = findUser._id;
    const findItem = await Salecar.findOne({_id: getItemId});
    const itemPrice = findItem.price;
    const itemById = findItem._id;
    const itemBrand = findItem.brand;
    const itemModel = findItem.model;
    
    try {
        
        let loginUser = await Cart.findOne({userById: findUserById});
        
        if(loginUser){
            let loginUserId = loginUser.userById;
            let itemIdInCart;
            let quantityOfitemsInCart;
        
            loginUser.cartItems.map((cartItems)=>{
                itemIdInCart = cartItems.product;
                quantityOfitemsInCart = cartItems.quantity;
            })
        
        if(loginUserId){
            
            if(itemById.equals(itemIdInCart)){
                    
                loginUser.cartItems.map((cartItems)=>{
                    cartItems.quantity = quantityOfitemsInCart + 1
                    cartItems.price = cartItems.price * cartItems.quantity;
                })
        
            }
            else{
                
                loginUser.cartItems.push({product:itemById, quantity:1, price:itemPrice, brand:itemBrand, model:itemModel});
            }
            loginUser = await loginUser.save();
            return res.status(201).send(loginUser);
        }
    }
        else{
            
            const newCart = new Cart({
                userById : findUser,
                cartItems: [{
                    product : itemById, 
                    quantity : 1,
                    price : itemPrice,
                    brand : itemBrand,
                    model : itemModel
                }]
            });

            await newCart.save();

            return res.status(201).send(newCart);
        }

    } catch (error) {
        console.log(error)
        res.status(500).send("something went wrong");
    }

   
} )
