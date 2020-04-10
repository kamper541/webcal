const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true },
    password: {type: String, required: true },
    fname: {type: String, required: true},
    lname: {type: String, required: true},
    food: [String]
});
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);