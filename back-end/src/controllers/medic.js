const Medic = require('../models/medic');
const User = require('../models/user');

// CREATE
exports.createMedic = async (req, res) => {
  const {name, lastname,birthdate,phone,address,user } = req.body
  const userExists = await User.findById(user);
  if (!userExists) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }
  try{
    const newMedic = new Medic({
      name,
      lastname,
      birthdate,
      phone,
      address,
      user,
    });

    const savedMedic = await newMedic.save();
    res.status(201).json(savedMedic);
  }catch(err){
    res.status(500).json({ error: err });
  }
 
};

// READ
exports.getMedics = async (req, res) => {
  try {
    const medics = await Medic.find();
    res.json(medics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMedic = async (req, res) => {
  try {
    const medic = await Medic.findById(req.params.id);
    if (!medic) {
      return res.status(404).json({ error: 'Medic not found' });
    }
    res.json(medic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updatedMedic = async (req, res) => {
  const { name, lastname, birthdate, phone, address, user } = req.body;
  const userExists = await User.findById(user);
  if (!userExists) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }
  try {
    const updatedMedic = await Medic.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: name,
          lastname: lastname,
          birthdate: birthdate,
          phone: phone,
          address: address,
          user: user,
          updateAt: new Date(),
        },
      },
      { new: true }
    );

    if (!updatedMedic) {
      return res.status(404).json({ error: 'Medic not found' });
    }

    res.json(updatedMedic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deletdMedic = async (req, res) => {
  try {
    const deletedMedic = await Medic.findByIdAndDelete(req.params.id);

    if (!deletedMedic) {
      return res.status(404).json({ error: 'Medic not found' });
    }

    res.json({ message: 'Medic deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = exports;
