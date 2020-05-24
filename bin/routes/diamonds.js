const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var json2xls = require('json2xls');
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
        //checking
        //var rawFile = fs.coolnew//dir of your json file as param
        //var raw = JSON.parse(coolnew)
        //console.log(raw);
        //res.status(200).json(raw);
        var xlsx = json2xls(coolnew//,{
            //fields : {_id:'string',title:'string',body:'string',code:'string',author:'string'}
       // }
        );
        fs.writeFileSync('datain.xlsx', xlsx, 'binary');
        res.download('datain.xlsx');
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