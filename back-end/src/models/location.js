const mongoose = require('mongoose');
const locationSchema = mongoose.Schema({
    name: {
        type: String
    }
})

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;