const express = require('express')
const car = require('../Models/carModel')
const auth = require('./middelware/jwt')
const admin = require('./middelware/admin')

const {user} = require('../Models/userModel')

const router = express.Router()
const { check, validationResult } = require('express-validator');
/*Ejecuta los middelware []*/ 
router.get('/',[auth,admin], async (req, res) =>{
    const cars = await car.find();
    res.send(cars);
 })
 
router.get('/list', async (req, res) =>{
   const cars = await car.find();
   res.send(cars);
})

router.get('/:id', async (req, res) =>{

    const carr = await car.findById(req.params.id);
    if(!carr)
     return res.status(404).send("No existe el auto");

    res.send(carr);
 })

 /*auth = el middelware que valida el jwt*/
router.post('/',auth, async (req,res)=>{
    try
    {
       
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    };
   const usuario = user.findById(req.body.userId);
   if(!usuario)
   return res.status(400).send('No existe el usuario');

    var coche = new car({
        company: req.body.company,
        model : req.body.model,
        year: req.body.year,
        sold: req.body.sold,
        price: req.body.price, 
        user : usuario
    });
    var result = await coche.save();

        res.status(201).send(result);
    }catch(error){
        res.status(500).send(error.message);
    }
   
})

router.put('/:id',[
    check('company').isLength({min:3}),
    check('model').isLength({min:3})    
],
 async (req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const carUpdate = await car.findByIdAndUpdate(req.params.id,{
        company: req.body.company,
        model : req.body.model,
        year: req.body.year,
        sold: req.body.sold,
        price: req.body.price
    }, {new : true})

    if(!carUpdate)
        return res.status(404).send("No existe el auto");
   
    res.status(204).send(carUpdate);
})

router.delete('/:id',[
    check('company').isLength({min:3}),
    check('model').isLength({min:3})    
],
 async (req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const carUpdate = await car.findByIdAndDelete(req.params.id)

    if(!carUpdate)
        return res.status(404).send("No existe el auto");
   
    res.status(204).send(carUpdate);
})

module.exports = router