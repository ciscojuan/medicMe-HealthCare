const Booking = require('../models/booking');
const User = require('../models/user');
const Sede = require('../models/location');

const { default: mongoose } = require('mongoose');

// CREATE
exports.createBooking = async (req, res) => {

  const { doctor_id, paciente_id, sede_id, specialty_id, appointment } = req.body;
  if (!mongoose.isValidObjectId(doctor_id)) return res.status(400).json({ error: 'Invalid doctor' });
  if (!mongoose.isValidObjectId(paciente_id)) return res.status(400).json({ error: 'Invalid paciente' });
  if (!mongoose.isValidObjectId(sede_id)) return res.status(400).json({ error: 'Invalid sede_id' });

  const doctor = await User.findById(doctor_id)
  if (!doctor) return res.status(404).json({ message: "Invalid id for User." })
  const sede = await Sede.findById(sede_id)
  if (!sede) return res.status(404).json({ message: "Invalid id for sede." })
  try {

    const newBooking = new Booking({
      doctor_id: doctor_id,
      paciente_id : paciente_id,
      sede_id: sede_id,
      appointment: appointment,
      specialty_id: specialty_id,
      createDate: new Date(),
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
    const bookings = await Booking.find({ paciente_id: req.params.id })
      .populate('doctor_id', { 'name': 1, 'lastname': 1, 'specialty': 1 })
      .populate('paciente_id', { 'name': 1, 'lastname': 1 })
      .populate('sede_id', { 'name': 1, 'direction': 1 })
      .populate('specialty_id', { 'name': 1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBooking = async (req, res) => {
  const { id } = req.params

  if (!id) return res.status(404).json({ message: "Invalid id", note })

  try {
    const booking = await Booking.findOne({ _id: id });
    res.status(200).json({ Booking: booking });
  } catch (err) {
    res.status(500).json({ Error: err })
  }
}

// UPDATE
exports.updateBooking = async (req, res) => {
  const { id } = req.params
  if (!id) return res.status(404).json({ error: 'Invalid Id.' });

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          user_id: req.body.user_id,
          sede_id: req.body.sede_id,
          specialty_id: req.body.specialty_id,
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
  const { id } = req.params
  const booking = Booking.findById(id)
  if (!booking) {
    return res.status(404).json({ error: 'InvalidBooking Id.' });
  }

  try {
    await Booking.findByIdAndDelete(req.params.id);


    res.json({ message: 'Booking deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = exports;

