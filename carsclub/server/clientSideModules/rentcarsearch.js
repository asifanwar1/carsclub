const express = require('express');
const router = express.Router();

const Rentcar = require('../models/rentcarSchema');

let getRentSearch;
  
    module.exports =  router.post('/searchRentCar', async (req, res)=>{
        const getText = req.body.searchText
        const x = getText
        console.log(x)
        const searchCategory = await Rentcar.find({$text: {$search: x}});
    
        getRentSearch = searchCategory
        
        return res.status(201).send(searchCategory);
        
    }),

    module.exports =  router.get('/rentcarsearchCategory', async (req, res) =>{
    
        try{
            
            res.status(200).send(getRentSearch);
    
        }catch(error) {
            res.status(400).send(error.message);
        }
    
        
    });
    