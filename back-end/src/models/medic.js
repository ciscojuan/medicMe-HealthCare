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
        ref: 'User',
        require: true
    },
    createAt: {
        type: Timestamp,
        require: true
    },
    updateAt: {
        type: Timestamp,
        require: true
    }

})

const Medic = mongoose.model("Medic", medicSchema);

module.exports = Medic