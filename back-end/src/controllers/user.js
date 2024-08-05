const User = require('../models/user');
const Credentials = require('../models/credentials');

exports.createUser = async (req, res) => {
    const { name, lastname, birthdate, phone, address, credentials, specialty } = req.body;
    if (!name || !lastname || !birthdate || !phone || !address || !credentials) return res.status(400).json({ message: "One or more fields are missing." })

    const credentialsExist = await Credentials.findById(credentials);
    if (!credentialsExist) return res.status(404).json({ message: "Invalid user id" })

    try {
        const newUser = new User({
            name: name,
            lastname: lastname,
            birthdate: birthdate,
            phone: phone,
            address: address,
            credentials: credentials,
            specialty: specialty
        });
        const saveUser = await newUser.save();
        res.status(201).json(saveUser)
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
}

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().populate('credentials', { 'email': 1, 'role': 1, _id: 0 });
        if (!users) return res.status(404).json({ message: "No documents found." })
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
}

exports.getUser = async (req, res) => {
    const { id } = req.params
    console.log(id)
    try {
        const user = await User.findById(id).populate('credentials', { 'email': 1, 'role': 1, _id: 0 });
        if (!user) return res.status(404).json({ message: "No document found.", id: id });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
}

exports.updateUser = async (req, res) => {
    const { name, lastname, birthdate, phone, address, specialty, credentials } = req.body;
    if (!name || !lastname || !birthdate || !phone || !address || !credentials || specialty) return res.status(400).json({ message: "One or more fields are missing." })
        console.log(`credentials retrieved from front: ${credentials}`)
    const credentialsExist = await Credentials.findById(credentials);
    if (!credentialsExist) return res.status(404).json({ message: "Invalid id for credentials" })

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                name: name,
                lastname: lastname,
                birthdate: birthdate,
                phone: phone,
                address: address,
                credentials: credentials,
                specialty: specialty,
                updateAt: new Date()
            },
        },
            { new: true }
        );

        res.status(200).json(updatedUser)
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }

}

exports.deletedUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({ error: 'Invalid id' });
        }

        res.json({ message: 'document deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = exports;