const mongoose = require('mongoose');
const moment = require('moment');
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
        validate: {
            validator: function(value) {
                return moment(value, 'DD-MM-YYYY', true).isValid();
            },
            message: props => `${props.value} is not a valid birthdate format (DD-MM-YYYY)`
        },
        get: function(value) {
            return moment(value).format('DD-MM-YYYY');
        }
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