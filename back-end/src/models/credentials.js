
const mongoose = require('mongoose');

const credentialsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: [true, 'Email already exist.']
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['patient', 'Doctor'],
        default: 'patient'
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Credentials = mongoose.model('Credentials', credentialsSchema);

module.exports = Credentials;