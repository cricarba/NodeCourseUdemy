const mongoose = require('mongoose');
mongoose.connect('mongodb://FutMatch:FutMatch@cluster0-shard-00-00-fhdw3.mongodb.net:27017,cluster0-shard-00-01-fhdw3.mongodb.net:27017,cluster0-shard-00-02-fhdw3.mongodb.net:27017/CARSDB?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', {useNewUrlParser: true})
    .then(()=> console.log('Conectado correctamente a MongoDB'))
    .catch(()=> console.log('Error al conectarse a MongoDB'))

const carSchema = new mongoose.Schema({
    company: String,
    model: String,
    price: {
            type: Number,
            required: function(){
                    return this.sold;
                }
            },
    year: {type:Number,
        min:2000,
        max:203,
        get: y => Math.round(y)
    },
    sold: Boolean,
    extras: [String],
    date: {type: Date, default: Date.now}
})

const Car = mongoose.model('car', carSchema)


async function createCar(){
    const car = new Car({
        company: 'Audi',
        model: 'S1',
        price: 6000,
        year: 2020,
        sold: false,
        extras: ['laser light']
    })

    const result = await car.save()
    console.log(result)
}



async function getCountCar(){
    const cars = await Car 
        .find({company: 'Audi'})
        .count()

    console.log(cars)
}


async function getCars(){
    const cars = await Car.find()
    console.log(cars)
}

async function deleteCar(id){
    const result = await Car.deleteOne({_id: id})
    console.log(result)
}


async function updateFirstCar(id){
    const result = await Car.update(
        {_id: id},
        {
            $set:{
                company: 'Seat',
                model: 'Ibiza'
            }
        }
    )
    console.log(result)

}

async function updateCar(id){
    const car = await Car.findById(id)
    if(!car) return

    car.company = 'Mercedes'
    car.model = 'Clase A'

    const result = await car.save()
    console.log(result)
}

async function updateCar(id){
    const car = await Car.findById(id)
    if(!car) return

    car.company = 'Mercedes'
    car.model = 'Clase A'

    const result = await car.save()
    console.log(result)
}

async function getFilterPriceAndOrCars(){
    const cars = await Car
        .find()
        .and([{company: 'Audi'},{model:'X3'}])
        .or([{company: 'BMW'},{model:'X2'}])
    console.log(cars)
}


/*
createCar()
getCountCar()
getCars()

deleteCar('5d65517567d6f6d093db5921')



//updateFirstCar('5d668384f0f182db6052fc05')



//updateCar('5d65509f91dbabd080b7671a')



//getPaginationCars()

 


//getFilterPriceAndOrCars()


//getFilterPriceInNinCars()

async function getFilterPriceInNinCars(){
    const cars = await Car
        .find({extras: {$in: 'laser light'}})
    console.log(cars)
}

//getFilterPriceCars()

async function getFilterPriceCars(){
    const cars = await Car
        .find({price: {$gte: 1000, $lt: 5000}})

    console.log(cars)
}


//getMoreFilterCar()

async function getMoreFilterCar(){
    const cars = await Car
        .find({company: 'BMW', sold: false})
        .sort({price: 1})
        .limit(2)
        .select({company: 1, model: 1, price: 1})

    console.log(cars)    
}


//getCompanyAndSoldFilterCars()

async function getCompanyAndSoldFilterCars(){
    const cars = await Car.find({company: 'BMW', sold: false})
    console.log(cars)
}


*/
