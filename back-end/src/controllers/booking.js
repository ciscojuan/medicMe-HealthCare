const Booking = require('../models/booking');
const Medic = require('../models/medic');
const Paciente = require('../models/patient');
const Sede = require('../models/location');

const { default: mongoose } = require('mongoose');

// CREATE
exports.createBooking = async (req, res) => {

  const { paciente_id, medico_id, sede_id, appointment } = req.body;

  if (!mongoose.isValidObjectId(paciente_id)) return res.status(400).json({ error: 'Invalid paciente_id' });
  if (!mongoose.isValidObjectId(medico_id)) return res.status(400).json({ error: 'Invalid medico_id' });
  if (!mongoose.isValidObjectId(sede_id)) return res.status(400).json({ error: 'Invalid sede_id' });

  const paciente = await Paciente.findById(paciente_id)
  if (!paciente) return res.status(404).json({ message: "Invalid id for Patient." })
  const medico = await Medic.findById(medico_id)
  if (!medico) return res.status(404).json({ message: "Invalid id for Medic." })
  const sede = await Sede.findById(sede_id)
  if (!sede) return res.status(404).json({ message: "Invalid id for sede." })
  try {

    const newBooking = new Booking({
      paciente_id: paciente,
      medico_id: medico,
      sede_id: sede,
      appointment: appointment,
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

exports.getBooking = async (req, res) =>{
  const {id} = req.params

  if(!id) return res.status(404).json({message: "Invalid id", note})

    try{
      const booking = await Booking.findOne({_id: id});
      res.status(200).json({Booking: booking});
    }catch(err){
      res.status(500).json({Error:err})
    }
}

// UPDATE
exports.updateBooking = async (req, res) => {
  const {id} = req.params
  if (!id)  return res.status(404).json({ error: 'Invalid Id.' });
  
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
  const { id } = req.params
  const booking = Booking.findById(id)
  if (!booking) {
    return res.status(404).json({ error: 'InvalidBooking Id.' });
  }

  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);


    res.json({ message: 'Booking deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = exports;

