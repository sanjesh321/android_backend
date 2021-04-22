const mongoose = require("mongoose")
const Product = require("./product")
const register = require("./register")
const {ObjectId} = require('bson')

const Cart = mongoose.model("Cart",{
    p_id : {type : ObjectId, ref:Product},
    u_id:{type:ObjectId},
    pprice : {type : Number},
    pquantity:{type: Number}
})
module.exports = Cart