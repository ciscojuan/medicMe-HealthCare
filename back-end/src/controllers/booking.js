const Booking = require('../models/booking.model');
const User = require('../models/user.model');
const Doctor = require('../models/doctor.model');
const Paciente = require('../models/patient.model');
const Sede = require('../models/sede.model');

const Booking = require('../models/booking');
const { default: mongoose } = require('mongoose');

// CREATE
exports.createBooking = async (req, res) => {

    const { paciente_id, medico_id, sede_id, appointment } = req.body;

    if(!mongoose.isValidObjectId(paciente_id)) res.status(400).json({error: 'Invalid paciente_id'});
    if(!mongoose.isValidObjectId(medico_id)) res.status(400).json({error: 'Invalid medico_id'});
    if(!mongoose.isValidObjectId(sede_id)) res.status(400).json({error: 'Invalid sede_id'});
    
  try {
    const newBooking = new Booking({
      paciente_id: req.body.paciente_id,
      medico_id: req.body.medico_id,
      sede_id: req.body.sede_id,
      appointment: req.body.appointment,
      createDate: new Date(),
      updateAt: new Date()
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateBooking = async (req, res) => {
    if (!updatedBooking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          paciente_id: req.body.paciente_id,
          medico_id: req.body.medico_id,
          sede_id: req.body.sede_id,
          appointment: req.body.appointment,
          updateAt: new Date()
        }
      },
      { new: true }
    );

    res.json(updatedBooking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deleteBooking = async (req, res) => {
    if (!deletedBooking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);


    res.json({ message: 'Booking deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = exports;

