 
const mongoose = require('mongoose')
 

const carSchema = new mongoose.Schema({
    company: { type: String,
               minlength: 3},
    model: { type: String,
        minlength: 3},
    price: {
            type: Number,
            required: function(){
                    return this.sold;
                }
            },
    year: {type:Number,
        min:2000,
        max:2020,
        get: y => Math.round(y)
    },
    sold: Boolean,
    extras: [String],
    date: {type: Date, default: Date.now}
})

const Car = mongoose.model('Car', carSchema);
module.exports = Car;