const express = require('express')
const router = express.Router()



//un solo parametro
router.get('/id/:id', (req, res) =>{
    res.status(404).send(req.params.id)
})
//varios parametros
router.get('/:id/:model', (req, res) =>{
    res.send(req.params.model)    

})
//Filtros sobre los parametros para validarlos - express-validator
router.get('/', (req,res)=>{
    var coche = {
        company: req.body.Company,
        model : req.body.Model,
        Id: 1
    }
    res.status(201).send(coche);
})

module.exports = router