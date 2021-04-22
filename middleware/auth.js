const e = require('express');
const { Result } = require('express-validator');
const jwt = require('jsonwebtoken');
const { findOne } = require('../models/product');
const Product = require('../models/product');
const register = require('../models/register');


module.exports.verifyUser  = function(req, res, next){
    try{
    const token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, 'secretkey');
    register.findOne({_id : data.userId})
    .then(function(userData){
        if(userData==null){
            return res.status(403).json({ error: "Access Denied!"})
        }
        req.user = userData;
        
        next();
    })
    .catch(function(e){
        res.status(401).json({error : e});
    })
    }

    catch(e){
        res.status(401).json({error:e,mesage:'didnt pass'})
    }
  
}


module.exports.verifyAdmin  = function(req, res, next){
    try{
    const token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, 'secretkey');
    Admin.findOne({_id : data.userId})
    .then(function(userData){
        req.data = userData;
        next();
    })
    .catch(function(ee){
        res.status(401).json({error : ee});
    })
    }

    catch(e){
        res.status(401).json({error : e})
    }
  
}


