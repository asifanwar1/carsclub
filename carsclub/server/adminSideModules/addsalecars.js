const express = require('express');
const router = express.Router();
const adminAuthentication = require("../middelware/adminAuthentication");

const Salecar = require('../models/salecarSchema');

const multer = require("multer");

const upload = multer({ dest: 'uploads/' });

module.exports = router.post('/addcars', adminAuthentication, upload.single("myfile"),  async(req, res, next)=>{
    
    try {
            const data = new Salecar({
                brand : req.body.brand,
                model : req.body.model,
                year : req.body.year,
                color : req.body.color,
                enginecc : req.body.enginecc,
                maxpower : req.body.maxpower,
                airbags : req.body.airbags,
                rearcamera : req.body.rearcamera,
                price : req.body.price,
                retailprice : req.body.retailprice,
                quantity : req.body.quantity,
                fileName : req.file.originalname,
                filePath : req.file.path,
                fileType : req.file.mimetype,
                fileSize : req.file.size, 
            });
            await data.save();
            res.status(201).send("Data uploaded successfully")
    } catch (error) {
        res.status(400).send(error.message);
    }
   
} )