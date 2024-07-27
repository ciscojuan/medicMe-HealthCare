const { Timestamp } = require('bson');
const mongoose = require('mongoose');
const bookingSchema = mongoose.Schema({
    paciente_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        require: true
    },
    medico_id:{
        type: mongoose.Types.ObjectId,
        ref: 'Medic',
        require:true
    },
    sede_id:{
        type: mongoose.Types.ObjectId,
        ref: 'Location',
        require: true
    },
    appointment:{
        type: Date,
        require:true
    },
    createDate:{
        type: Timestamp,
        require: true
    },
    updateAt: {
        type:Timestamp,
        require:true
    }
})

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;