const mongoose = require('mongoose');
const bookingSchema = mongoose.Schema({
    doctor_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    specialty_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Speciality",
        require: true
    },
    paciente_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
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

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;