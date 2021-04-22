const express = require("express")
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require("../middleware/upload");
 const Product = require("../models/product")
 
router.post('/product/insert',
upload.single('pimage'),
function(req,res){

    const pname = req.body.pname;
    const pprice = req.body.pprice;
    const pdesc = req.body.pdesc;
    let imgPath = req.file.filename;
    const pcategory=req.body.pcategory;

    const pdata = new Product({pname:pname,pprice:pprice,pdesc:pdesc,pcategory:pcategory,pimage:imgPath})
    pdata.save()
    .then(function(data){
        res.status(201).json({message: "Product inserted", success:true,data})
    })
    .catch(function(e){
        res.status(500).json({message:e})
    })
})

router.post('/update/pimage/:id', upload.single('pimage'), auth.verifyUser, (req, res) => {
    let imgPath = req.file.filename;
    register.findOneAndUpdate({ "_id": req.params.id }, { $set: { "pimage": imgPath } })
     .then((data) =>{
     res.status(200).json({ "success": true, "message": "Product Picture changed!!", "data": data });
                 })

    .catch((err) => {
     res.status(202).json({ "success": false, "message": err });
    })
})

router.get('/product/showall',function(req,res){
    Product.find().then(function(result){
        res.status(200).json({ success: true, data: result})
        console.log(result)
    })
})
router.get('/productview/:id',function(req,res){
    const pid = req.params.id;
    Product.findOne({_id : pid})
    .then(function(result){
        res.status(200).json({success: true, data: result})
    })
})

router.get('/product/:product',function(req,res){
    const category = req.params.product
    Product.find({pcategory:category})
    .then(function(result){
        res.status(200).json({ success: true, data: result})
    })
})

//delete product
router.delete('product/delete/:id',function(req,res){
    const id = req.params.id;
    Product.deleteOne({_id : id})
        .then(function(data){
            res.status(200).json({message:"deleted", success:true, data:data})
        })
        .catch(function(e){
            res.status(500).json({message:e})
        })
})

//Update Product
router.put('product/update/:id',function(req,res){
    const pname = req.body.pname;
    const pprice = req.body.pprice;
    const pdesc = req.body.pdesc;
    const pcategory= req.body.pcategory;
    Product.updateOne({_id : id},{pname:pname},{pprice:pprice},{pdesc:pdesc},{pcategory:pcategory})
    .then(function(data){
        res.status(200).json({message:"updated", success:true, data:data})
    })
    .catch(function(e){
        res.status(500).json({message:e})
    })
})


 module.exports = router;