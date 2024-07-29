const mongoose = require('mongoose');
const Patient = require('../models/patient');
const User = require('../models/user');

exports.createPatient = async (req, res) => {
    const { name, lastname, birthdate, phone, address, user } = req.body;
    const userExist = await User.findById(user);
    if (!userExist) return res.status(404).json({ message: "Invalid user id" })
    if (!name || !lastname || !birthdate || !phone || !address || !user) return res.status(400).json({ message: "One or more fields are missing." })
    try {
        const newPatient = new Patient({
            name: name,
            lastname: lastname,
            birthdate: birthdate,
            phone: phone,
            address: address,
            user: user
        });
        const savePatient = await newPatient.save();
        res.status(201).json(savePatient)
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
}

exports.getPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        if (!patients) return res.status(404).json({ message: "No documents found." })
        res.status(200).json(patients)
    } catch (err) {
        res.status(500).json({ Error: err })
    }
}

exports.getPatient = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id)
        if (!patient) return res.status(404).json({ message: "No patient found." });
        res.status(200).json(patient);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
}

exports.updatePatient = async (req, res) => {
    const { name, lastname, birthdate, phone, address, user } = req.body;
    if (!name || !lastname || !birthdate || !phone || !address || user) return res.status(400).json({ message: "One or more fields are missing." })
    const userExist = await User.findById(user);
    if (!userExist) return res.status(404).json({ message: "Invalid user id" })
    try {
        const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, {
            $set: {
                name: name,
                lastname: lastname,
                birthdate: birthdate,
                phone: phone,
                address: address,
                user: user,
                updateAt: new Date()
            },
        },
            { new: true }
        );

    } catch (err) {
        res.status(500).json({ Error: err })
    }
}

exports.deletdPatient = async (req, res) => {
    try {
        const deletedPatient = await Patient.findByIdAndDelete(req.params.id);

        if (!deletedPatient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        res.json({ message: 'Patient deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = exports;