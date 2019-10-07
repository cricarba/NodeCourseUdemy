const express = require('express')
//const app = express()
const router = express.Router()
const { check, validationResult } = require('express-validator');


router.get('/list', (req, res) =>{
    res.send(['a1','a2','a3'])
})

router.post('/2',[
    check('Company').isEmail(),
    check('Model').isLength(3)
],
 (req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    var coche = {
        company: req.body.Company,
        model : req.body.Model,
        Id: 1
    }
    res.status(201).send(coche);
})


router.put('/:id',[
    check('Company').isEmail(),
    check('Model').isLength(3),
    check('id').isNumeric()
],
 (req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    var coche = {
        company: req.body.Company,
        model : req.body.Model,
        Id: req.body.id
    }
    res.status(201).send(coche);
})

module.exports = router