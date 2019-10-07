const express = require('express')
const app = express()

const car = require('./cars')
const moto = require('./moto')
//const date = require('./middelwareDate')

app.use(express.json())
app.use('/api/cars/', car)
app.use('/api/moto/', moto)

//app.use(date)
//middelware que se ejecuta cuando se hace peticiones a esa URL
/*app.use('/api/cars/list',function (req, res, next){
    console.log('REQ ', req.method);
    next();
})*/
const port = process.env.PORT || 3003
///MIDDELWARE - SE EJECUTA ANTES DE CADA PETICION



app.get('/', function(req, res){
    res.send('hello world')
})






// nom install nodemon -- actaulizacion del server
app.listen(port, ()=> console.log('API UP!'))