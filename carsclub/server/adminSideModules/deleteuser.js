const express = require('express');
const router = express.Router();
const adminAuthentication = require("../middelware/adminAuthentication");

const User = require('../models/userSchema');

module.exports = router.post('/deleteUserfromdashboard', adminAuthentication, async (req, res)=>{
    const getId = req.body.userIdFromDashBoard
    const x = getId
    const findUser = await User.findOneAndDelete({_id: x})
    
    // const findUser = await User.findOneAndDelete({getId})
})