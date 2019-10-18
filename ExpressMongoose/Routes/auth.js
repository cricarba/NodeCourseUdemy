const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const express = require('express')
const {user} = require('../Models/userModel')
const router = express.Router()
const { check, validationResult } = require('express-validator');

router.post('/',[ check('emal').isLength({min:3}),
                check('password').isLength({min:6})],
 async (req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    };
    try
    {
        //buscar usuario
        let uniqueUser = user.findOne({email : req.body.email})
        if(!uniqueUser) return res.status(400).send('usuario No existe');
         const jwToken = jwt.sign({_id: uniqueUser._id, name : uniqueUser.name}, 'IdToken')                                 
        
        res.status(201).send(jwToken);
    }catch{
        res.status(500).send("error");
    }
   
})

module.exports = router