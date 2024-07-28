const mongoose = require('mongoose');
const Location = require('../models/location');

exports.createLocation = async (req, res) => {
    const { name, direction } = req.body;

    try{
        const newLocation = new Location({
            name, direction
        });
        const savedLocation = await newLocation.save();
        res.status(201).json(savedLocation);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

exports.getLocations = async (req, res) => {
    try{
        const locations = await Location.find();
        res.status(200).json(locations);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

exports.getLocation = async (req, res) => {
    const { id } = req.params;

    try{
        const location = await Location.findById(id);
        res.status(200).json(location);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

exports.updateLocation = async (req, res) => {
    const { id } = req.params;
    const { name, direction } = req.body;

    const location = await Location.findById(id);
    if(!location) return res.status(404).json({message: "Location not found"});
  
    try{
        const updatedLocation = await Location.findByIdAndUpdate(id, {name, direction}, {new: true});
        res.status(200).json(updatedLocation);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

exports.deleteLocation = async (req, res) => {
    const { id } = req.params;
    const location = await Location.findById(id);
    if(!location) return res.status(404).json({message: "Location not found"});
    try{
        await Location.findByIdAndDelete(id);
        res.status(200).json({message: "Location deleted successfully"});
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

module.exports = exports;