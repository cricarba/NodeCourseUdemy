const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    Name : { type: String,
        required : true
    },
    IsCustomer : { type : Boolean},
    email :String, 
    password : { type : String,
     required : true
    },
    isAdmin : Boolean
})

userSchema.methods.GenerateJWT = function (){
    return jwt.sign({_id: this._id, name : this.Name, isAdmin:this.isAdmin}, 'SecretWordToken')     
}
const user = mongoose.model('user',userSchema);
module.exports.user = user;
module.exports.userSchema = userSchema; 
