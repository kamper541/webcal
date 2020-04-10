const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const food = new mongoose.Schema({
    uid: {
        type: mongoose.ObjectId , required:false
    },
    name: {
        type: String,
        required: true
    },
    calorie: {
        type: String,
        required: true,
    },
    updated: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Food', food);

