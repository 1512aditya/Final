const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const jwtSecret = "MynameIsAdityaMaisuriya"

router.post("/createuser",
[
         body('email').isEmail(),
         body('name').isLength({ min: 3 }),
         body('password','not correct pasword').isLength({ min: 5 }),
 ],
async(req, res)=>{
    const errors = validationResult(req);
     if (!errors.isEmpty()) {
         return res.status(400).json({errors: errors.array() });
     }

     const salt = await bcrypt.genSalt(10)
     let securePass = await bcrypt.hash(req.body.password, salt);

    try{
        await User.create({
            name:req.body.name,
            password: securePass, 
            email: req.body.email
        })
        res.json({success: true})
    }
    catch (error){
        console.log(error)
        res.json({success: false})

    }
})

router.post("/loginuser",
[
    body('email').isEmail(),
    body('password','not correct pasword').isLength({ min: 5 }),
], async(req, res)=>{
    const errors = validationResult(req);
     if (!errors.isEmpty()) {
         return res.status(400).json({errors: errors.array() });
     }
    let email = req.body.email;
    try{

     let userData =  await User.findOne({email})
     if(!userData){
        return res.status(400).json({errors:"login with proper ID" });
     }

     const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
     if (!pwdCompare){
        return res.status(400).json({errors:"login with proper ID" });
     }
     const data={
         user:{
             id:userData.id
         }
     }
     const authToken = jwt.sign(data,jwtSecret)

     return res.json({success:true, authToken:authToken})
    }
    catch (error){
        console.log(error)
        res.json({success: false});
    }
})
module.exports = router
