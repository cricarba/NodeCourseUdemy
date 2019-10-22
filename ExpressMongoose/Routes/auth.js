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

        const validPassword = await bcrypt.compare(req.body.password, uniqueUser.password);
        if(!validPassword)   return res.status(400).send('usuario o contraseña incorrectos');
        //generar token
         const jwToken = user.GenerateJWT();                           
        
        res.status(201).send(jwToken);
    }catch{
        res.status(500).send("error");
    }
   
})

module.exports = router