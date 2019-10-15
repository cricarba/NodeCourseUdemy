const mongoose = require('mongoose')
const express = require('express')
const app = express()

const car = require('./Routes/cars')
const moto = require('./Routes/moto')
const user = require('./Routes/user')
//const date = require('./middelwareDate')

app.use(express.json())
app.use('/api/cars/', car)
app.use('/api/moto/', moto)
app.use('/api/user/', user)


//app.use(date)
//middelware que se ejecuta cuando se hace peticiones a esa URL
/*app.use('/api/cars/list',function (req, res, next){
    console.log('REQ ', req.method);
    next();
})*/
const port = process.env.PORT || 3003
///MIDDELWARE - SE EJECUTA ANTES DE CADA PETICION

// nom install nodemon -- actaulizacion del server
app.listen(port, ()=> console.log('API UP!'))
mongoose.connect('mongodb://FutMatch:FutMatch@cluster0-shard-00-00-fhdw3.mongodb.net:27017,cluster0-shard-00-01-fhdw3.mongodb.net:27017,cluster0-shard-00-02-fhdw3.mongodb.net:27017/CARSDB?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', {useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true })
    .then(()=> console.log('Conectado correctamente a MongoDB'))
    .catch(()=> console.log('Error al conectarse a MongoDB'))
