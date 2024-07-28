const mongoose = require('mongoose');
const locationSchema = mongoose.Schema({
    name: {
        type: String
    },
    direction:{
        type: String,
         required:[true, "Description is required."]
    }
})

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;