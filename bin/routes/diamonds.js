const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var jsonexport = require('jsonexport');
const fs = require("fs");//npm install fs
var exceltojson = require("xlsx-to-json-lc");



const Diamond = require('../models/diamond');



router.get('/exportfromdb',(req, res, next) =>{
    Diamond.find()
    .exec()
    .then(doc =>{ 
        coolnew = doc;
        
        console.log(coolnew);
        res.status(200).json(doc);
        //unhandeled promise error below this
        //expected excel file is datain.xls which i got by running the below code seperately
        jsonexport(coolnew, {rowDelimiter: '\t'}, function(err, csv){
            if(err) return console.log(err);
            console.log(csv);
            fs.writeFileSync('data.xls', csv, 'binary');
            })
        
       
    })
    .catch(err =>{
        console.log(error);
        res.status(500).json(
            errror = err
        );
    });
    
    
});



router.post('/importtodb',(req, res, next) =>{
    exceltojson({
        input: "dataout.xlsx",
        output: "out.json"
        
    },function(err, result) {
        if(err) {
          console.error(err);
        } else {
          console.log(result);
          //result will contain the overted json data
        }
        //excel to json not working properly for nested values
        // datas.json is the required format and out.json is the format we are getting with this module 
        Diamond.collection.insert(result,function(err,docs){
            if (err){
                return console.error(err),
                res.status(400).json({
                    message: "error in uploading excel"
                })
            }else{
                console.log("multiple dociments inserted to collection");
                res.status(200).json({
                    message: "multiple documents inserted to collection",
                    body : result
                })
         }
        });
    });
});   


module.exports = router;