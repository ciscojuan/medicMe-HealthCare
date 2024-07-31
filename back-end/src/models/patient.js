const { Timestamp } = require('bson');
const mongoose = require('mongoose');
const patientSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Name is required.']
    },
    lastname:{
        type:String,
        required: [true, 'Lastname is required.']
    },
    birthdate:{
        type: Date,
    },
    phone:{
        type:String,
    },
    address:{
        type: String
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        ref: 'User',
        required:true
    },
    createAt:{
        type: Date,
        default: Date.now(),
        required: true
    },
    updateAt:{
        type: Date,
        default: Date.now(),
        required: true
    }

})

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;