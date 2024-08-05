const bcrypt = require('bcryptjs');

const Credential = require('../models/credentials');
const User = require('../models/user');


// Create a new user
exports.createUser = async (req, res) => {
  console.log(`Server: ${req.body}`);
  const { email, password, role } = req.body
  if (!email || !password) return res.status(400).send({ error: 'Email and password are required' });
  console.log(req.body);
  const seed = 10;
  try {
    const credentials = new Credential({
      email: email,
      password: await bcrypt.hash(password, seed),
      role: role
    });
    await credentials.save();

    res.status(201).send({message:"credentials Created.", credentials});
  } catch (err) {
    res.status(500).send({ error: err });
  }
};
exports.getUserFromCredentials = async (req, res) => {
  try {
    const user = await User.findOne({credentials:req.params.id}).populate('credentials');
    if (!user) return res.status(404).send();
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
}
// Get all users
exports.getUsers = async (req, res) => {
  try {
    const credentials = await Credential.find();
    res.status(200).send(credentials);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get a specific user
exports.getUser = async (req, res) => {
  try {
    const credentials = await Credential.findById(req.params.id);
    if (!credentials) return res.status(404).send();
    res.send(credentials);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const credentials = await User.findByIdAndUpdate(req.params.id, {
      email: req.body.email,
      password: req.body.password,
      updateAt: Date.now(),
    }, {
      new: true,
    });
    if (!credentials) return res.status(404).send();
    res.status(200).send(credentials);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const credentials = await Credential.findByIdAndDelete(req.params.id);
    if (!credentials) return res.status(404).send();
    res.status(200).send(credentials);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = exports;
