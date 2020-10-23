const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {check, validationResult} = require('express-validator/check');

//IMPORT MODELS
const User= require('../models/user');


//SIGNUP ROUTE
router.post("/signup", [
    check('phone').isLength({min: 10, max: 10}).not().isEmpty().trim().escape(),
    check('password').isLength({min: 4}).not().isEmpty().trim().escape(),
    check('fullname').isLength({min: 2}).not().isEmpty().trim().escape(),
    check('email').not().isEmpty().trim().escape(),
    check('state').not().isEmpty().trim().escape(),
    check('address').isLength({max: 250}).not().isEmpty().trim().escape()
], (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    let name = req.body.fullname;
    let phone = req.body.phone;
    let email=req.body.email
    let password = req.body.password;
    let state=req.body.state;
    let address=req.body.address;
   

    User.find({email: email}).exec().then(doc => {
        if (doc.length > 0) {
            return res.status(409).json({
                error: {
                    status: "Failed",
                    message: "Already registered please login or reset your password"
                }
            });
        } else {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const user = new User({
                        fullname: name,
                        phone: phone,
                        email:email,
                        password: hash,
                        state:state,
                        address:address
                       
                    });
                    user.save().then(doc => {
                        let _id = doc._id;
                        const token = jwt.sign(
                            {
                                name: doc.name,
                                phone: doc.phone,
                                email:doc.email,
                                id: _id
                            },
                            process.env.JWT_KEY,
                            {
                                expiresIn: process.env.jwtExpiresIn
                            }
                        );
                        return res.status(200).json({
                            status: "Success",
                            message: "Successfully registered",
                            id: _id,
                            name:name,
                            number:phone,
                            email:email,
                            state:state,
                            address:address,
                            tokenId:token
                        });
                    }).catch(function (err) {
                        return res.status(500).json({
                            error: err
                        });
                    })
                }
            })
        }

    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
});


//LOGIN ROUTE
router.post("/login",(req,res,next)=>{
    User.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length<1){
            return res.status(401).json({
                message:"Auth Failed"
            });
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(err){
                return res.status(401).json({
                    message:'Auth failed'
                });
            }
            if(result){
               const token= jwt.sign(
                   {
                    email:user[0].email,
                    fullname:user[0].fullname,
                    userId:user[0]._id
                },
                process.env.JWT_KEY,
                {
                    expiresIn: process.env.jwtExpiresIn
                }
                );
                return res.status(200).json({
                    message:'Auth successful',
                    email:user[0].email,
                    fullname:user[0].fullname,
                    userId:user[0]._id,
                    token:token
                });
            }
            res.status(401).json({
                message:'Auth failed'
        });
    });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    })
})


module.exports=router;