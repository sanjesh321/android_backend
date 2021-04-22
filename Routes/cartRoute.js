const express = require("express")
const router = express.Router();
const multer = require('../middleware/upload');
const Product = require("../models/product");
const upload = require("../middleware/upload");
const Cart = require("../models/cart");
const auth = require('../middleware/auth')


//adding to cart
router.post('/Cart/:productid', auth.verifyUser, function (req,res){
    const p_id = req.params.productid;
    
    const u_id = req.user._id;
    const quantity = req.body.quantity;
    Product.findOne({_id : p_id})
    .then(function(data){
        
        if(data != null)
        {
            const price = parseInt(data.pprice) * quantity
            const myCart = new Cart({p_id : p_id, u_id : u_id, pquantity:quantity, pprice: price})
            myCart.save().then(function(result){
                res.status(201).json({message : "Added to Cart!"})
            })
            .catch(function(e){
                console.log(e)
                res.status(500).json({error : e})
            })
        }
        else
        {
            return res.status(202).json({success:false,message:"No data"})
        }
      
   })
    .catch(function(e){
        console.log(e)
        res.status(500).json({error : e})
    })

    
})  

//displaying cart items
router.get('/getCart',auth.verifyUser,function(req,res){
    Cart.find({'u_id':req.user._id}).populate("p_id").then(function(data){
        console.log(data)
        return res.status(200).json({'success':true,data:data})
    })
    .catch((err)=>{
        return res.status(402).json({"success":false,"message":err})
    })
})

//Deleting Cart
router.delete('/cart/delete/:id', function (req, res) {
        const id = req.params.id;
        Cart.deleteOne({ _id: id })
            .then(function (result) {
                res.status(200).json({ message: "Product Deleted" })
            })
            .catch(function (e) {
                res.sendStatus(500).json({ error: e })
            })
    })
router.get('/Checkout', function (req, res) {
        Cart.find()
            .then(function (data) {
                res.status(200).json(data)
            })
            .catch(function (e) {
                res.status(500).json({ error: e })
            })
    })

//update cart
router.put('/cart/update/:id',auth.verifyUser,function(req,res){
    const id = req.params.id;
    const quantity = req.body.quantity
    Cart.updateOne({_id: id},{$set:{
        quantity:quantity
    }}).then(function(result){
        res.status(200).json({success:true,message:"updated"})
    })
})

    module.exports = router;