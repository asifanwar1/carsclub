const express = require('express');
const router = express.Router();
const authenticate = require("../middelware/authenticate");


const User = require('../models/userSchema');
const Salecar = require('../models/salecarSchema');
const Salecarreviews = require('../models/carreviewSchema');


let getReviewCarId;

module.exports = router.post('/sendReviewCarId', authenticate, async (req, res) =>{
    getReviewCarId = req.body.selectedCarId
}),


module.exports = router.get('/getSaleCarReviews', authenticate, async (req, res) =>{
    const findUser = await User.findOne({_id: req.userID});
    const findCar = await Salecar.findOne({_id: getReviewCarId.id});

    const data = {findCar,findUser}
    
    try{
        
        res.status(200).send(data);

    }catch(error) {
        res.status(400).send(error.message);
    }

    
}), 


module.exports = router.get('/getallreviewsforselectedcar', authenticate, async (req, res) =>{

    const findAllReviews = await Salecarreviews.findOne({carById: getReviewCarId.id});
    
    try{
        
        res.status(200).send(findAllReviews);

    }catch(error) {
        res.status(400).send(error.message);
    }
});


module.exports = router.post('/postcarreviews', authenticate, async (req, res)=>{

    const {id, name, email, message, selectedCarId} = req.body;
    const findCar = await Salecar.findOne({_id: selectedCarId.id});
    const findCarId = findCar._id;
    const findCarReview = await Salecarreviews.findOne({carById: findCarId})
   

    try {
        
        if(findCarReview){
            const carReviewId = findCarReview.carById
            if(carReviewId.equals(findCarId)){
                    findCarReview.allReviews.push({
                    userById : id, 
                    name : name, 
                    email : email, 
                    comments : message,
               });
            }
            await findCarReview.save();
            res.status(201).send({ message: "review submited successfully"});
        }
        else{
            const newReview = new Salecarreviews({
                carById : findCar,
                allReviews: [{
                userById : id, 
                name : name, 
                email : email, 
                comments : message, 
                }]
            });

            await newReview.save();
            res.status(201).json({ message: "review submited successfully"});
        }
    }
    catch(error) {
        res.status(500).send(error.message);
    }
})