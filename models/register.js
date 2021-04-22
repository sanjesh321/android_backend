const mongoose = require('mongoose')

const register = mongoose.model('Accounts',{
    profilepic:{
        default:"no-image.jpg",
        type:String
    },
    Firstname: {
        type: String,
        required: true
    },
    Lastname: {
        type: String,
        required: true
    },
    Username: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
    Email:{
        type:String,
        required: true,
        unique:true
    }

})
module.exports=register;