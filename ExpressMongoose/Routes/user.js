const bcrypt = require('bcrypt')
const express = require('express')
const {user} = require('../Models/userModel')
const router = express.Router()
const { check, validationResult } = require('express-validator');

router.get('/', async (req, res) =>{
    const users = await user.find();
    res.send(users);
 })
 
router.get('/list', async (req, res) =>{
   const users = await user.find();
   res.send(users);
})

router.get('/:id', async (req, res) =>{

    const userr = await user.findById(req.params.id);
    if(!userr)
     return res.status(404).send("No existe el user");

    res.send(userr);
 })
 
router.post('/',[ check('Name').isLength({min:3}),check('password').isLength({min:6})],
 async (req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    };
 
 let uniqueUser = user.findOne({email : req.body.email})
 if(!uniqueUser) return res.status(400).send('usuario ya existe');
 //crear el salteo
 const salt = await bcrypt.genSalt(10);
 //encriptamos el password
 const hashPassword = await  bcrypt.hash(req.body.password, salt);
    var usuario = new user({
        Name: req.body.Name,
        email : req.body.email,
        IsCustomer: req.body.IsCustomer,
        password:  hashPassword    
    });
    try
    {
        var result = await usuario.save();
        const jwToken = user.GenerateJWT()                               
        
        res.status(201).header('Authorization', jwToken).send(result);
    }catch{
        res.status(500).send("error");
    }
   
})

router.put('/:id',[
    check('Name').isLength({min:3}),     
],
 async (req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const userUpdate = await user.findByIdAndUpdate(req.params.id,{
        Name: req.body.name,
        email : req.body.email,
        IsCustomer: req.body.IsCustomer 
    }, {new : true})

    if(!userUpdate)
        return res.status(404).send("No existe el usuario");
   
    res.status(204).send(userUpdate);
})

router.delete('/:id',[
    check('Name').isLength({min:3})    
],
 async (req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const userUpdate = await user.findByIdAndDelete(req.params.id)

    if(!userUpdate)
        return res.status(404).send("No existe el usuario");
   
    res.status(204).send(userUpdate);
})

module.exports = router