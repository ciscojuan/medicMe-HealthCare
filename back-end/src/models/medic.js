const mongoose = require('mongoose');
const medicSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Name is require']
    },
    lastname: {
        type: String,
        require: [true, 'Lastname is require']
    },
    birthdate: {
        type: Date,
    },
    phone: {
        type: String,
    },
    address: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        ref: 'User',
        require: true
    },
    specialty: {
        type: String,
        required: [true, 'Specialty is required']
    },
    createAt: {
        type: Date,
        default: Date.now(),
        require: true
    },
    updateAt: {
        type: Date,
        default: Date.now(),
        require: true
    }

})

const Medic = mongoose.model("Medic", medicSchema);

module.exports = Medic