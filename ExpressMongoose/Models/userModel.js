const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    Name : { type: String,
        required : true
    },
    IsCustomer : { type : Boolean},
    email :String, 
    password : { type : String,
     required : true
    }
})

const user = mongoose.model('user',userSchema);
module.exports.user = user;
module.exports.userSchema = userSchema; 
