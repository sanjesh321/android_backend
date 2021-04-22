const express = require('express');
const bcryptjs = require('bcryptjs')
const { userInfo } = require('os');
const router = express.Router()
const register = require('../models/register')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const upload = require("../middleware/upload");
const { check, validationResult } = require('express-validator');
const { Console } = require('console');
router.post('/register/user', function (req, res) {
console.log(req.body)


    const fn = req.body.Firstname;
    const ln = req.body.Lastname;
    const User = req.body.Username;
    const pw = req.body.password;
    const email = req.body.Email;
   
    bcryptjs.hash(pw, 10, function (err, hash) {
        const data = new register({
            Firstname: fn,
            Lastname: ln,
            Username: User,
            password: hash,
            Email: email,
            
        });
        data.save().then(function (data) {
            res.status(201).json({ message: "Account Created!", data, success: true })
        }).catch(function (err) {
            res.status(500).json({ message: err, success: false })
        });
    })

})


//Upload image     
router.post('/update/profPicture', upload.single('profilepic'), auth.verifyUser, (req, res) => {
    let imgPath = req.file.filename;
    register.findOneAndUpdate({ "_id": req.user._id }, { $set: { "profilepic": imgPath } }).then((result) => {
        register.findOne({ "_id": result._id })
            .then((data) => {
                return res.status(200).json({ "success": true, "message": "Profile Picture changed!!", "data": data });
            })

    }).catch((err) => {
        return res.status(202).json({ "success": false, "message": err });
    })
});

//login system
router.post('/login/User', function (req, res) {
    const email = req.body.Email;
    const pw = req.body.password;
    console.log(email)
    register.findOne({ Email: email })
        .then(function (userData) {
            if (userData === null) {

                return res.status(202).json({ message: "Invalid Credentials!" })
            }
            bcryptjs.compare(pw, userData.password, function (err, result) {
                if (result == false) {
                    return res.status(202).json({ message: "Invalid password!" })
                }
                const token = jwt.sign({ userId: userData._id }, 'secretkey');
                res.status(200).json({ data: userData, token: token, message: "Auth Sucess", success: true })
            })
        }).catch(function (e) {
            res.status(500).json({ error: e })
        })
})

router.put('/Updateuser', auth.verifyUser, function (req, res) {
    const id = req.user._id;
    const fn = req.body.fn;
    const ln = req.body.ln;
    const username = req.body.un;
   
    const email = req.body.em;
    register.updateOne({ _id: id }, { Firstname: fn,Lastname:ln,Username:username })
        .then(function (data) {
            res.status(200).json({ message: "updated sucessfully", success: true, data })
        })
        .catch(function (e) {
            res.status(500).json({message:e, success:false})
        })
})
module.exports = router

