const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: Number,
    firstName: String,
    lastName: String,
    createdDate: Date,
    sessionTimeOut: Number
}, { versionKey: false });

const User = mongoose.model('UserFile', userSchema);

module.exports = User;
