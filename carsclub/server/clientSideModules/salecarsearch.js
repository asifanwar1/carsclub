const express = require('express');
const router = express.Router();

const Salecar = require('../models/salecarSchema');

let getSearch;
  
    module.exports =  router.post('/searchSaleCar', async (req, res)=>{
        const getText = req.body.searchText
        const x = getText
        console.log(x)
        const searchCategory = await Salecar.find({$text: {$search: x}});

        getSearch = searchCategory
    
        return res.status(201).send(searchCategory);
    
    }),

    module.exports =  router.get('/salecarsearchCategory', async (req, res) =>{
    
        try{
        
            res.status(200).send(getSearch);

        }catch(error) {
            res.status(400).send(error.message);
        }

    
    });