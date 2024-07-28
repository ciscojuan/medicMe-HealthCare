const mongoose = require('mongoose');
const { updateUser } = require('../controllers/user');
const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:[true, 'Email is require'],
        unique: [true, 'email already exists']
    },
    password:{
        type: String,
        required:[true, 'password is require']
    },
    createAt:{
        type:Date,
        default:Date.now
    },
    updateAt:{
        type:Date,
        default:Date.now
    }
})

const User = mongoose.model('User', userSchema)

module.exports= User;