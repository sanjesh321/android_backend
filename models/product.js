const mongoose = require("mongoose")

const Product = mongoose.model("Product",{
    pname : {type : String},
    pprice : {type : Number},
    pdesc : {type : String},
    pimage : {type : String},
    pcategory:{type:String,
    enum:["Case","tyres","helmet","riding gears","gloves","lubricaint"]}
})

module.exports = Product