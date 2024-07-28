const express = require('express');
const User = require('../models/user');

// Create a new user
  exports.createUser = async (req, res) => {

    const {email, password} = req.body
    if (!email || !password) return res.status(400).send({ error: 'Email and password are required' });
    console.log(req.body);
    try {
      const user = new User({
          email: email,
          password: password,
      });
      await user.save();

      res.status(201).send(user);
    } catch (err) {
      res.status(400).send({error:err});
    }
  };

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get a specific user
exports.getUser =async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send();
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
        email: req.body.email,
        password: req.body.password,
        updateAt: Date.now(),
    }, {
      new: true,
    });
    if (!user) return res.status(404).send();
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send();
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = exports;
