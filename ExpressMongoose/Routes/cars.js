const express = require('express')
const car = require('../Models/carModel')
const router = express.Router()
const { check, validationResult } = require('express-validator');

router.get('/', async (req, res) =>{
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
 

router.post('/', async (req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    };

    var coche = new car({
        company: req.body.company,
        model : req.body.model,
        year: req.body.year,
        sold: req.body.sold,
        price: req.body.price
    });
    try
    {
        var result = await coche.save();

        res.status(201).send(result);
    }catch{
        res.status(500).send("error");
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

router.DELETE('/:id',[
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