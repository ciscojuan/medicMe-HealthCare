const Specialty = require('../models/specialty');

exports.getSpecialties = async (req, res) => {
    try {
        const specialties = await Specialty.find();
        res.status(200).json(specialties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteSpecialty = async (req, res) => {
    try {
        const { id } = req.params;
        const specialty = await Specialty.findByIdAndDelete(id);
        res.status(204).json(specialty);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = exports;