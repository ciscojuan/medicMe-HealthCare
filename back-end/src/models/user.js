const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    email:{
        type:String,
        require:[true, 'Email is require'],
        unique: [true, 'email already exists']
    },
    password:{
        type: String,
        require:[true, 'password is require']
    }
})

const User = mongoose.model('User', userSchema)

module.exports= User;