const express = require('express');
const router = express.Router();
const adminAuthentication = require("../middelware/adminAuthentication");

const User = require('../models/userSchema');

module.exports = router.post('/deleteMessagefromdashboard', adminAuthentication, async (req, res)=>{
    const getId = req.body.messageIdFromDashBoard
    const idOfUser = getId
    

    try {
        const findUser = await User.findOne({"messages._id": idOfUser});
        
        const findMessage = await User.updateOne({_id: findUser._id}, {$set: {messages: []}})
        
    } catch (error) {
        console.log(error)
    }
    

})