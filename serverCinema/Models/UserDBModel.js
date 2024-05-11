const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: Number,
    userName: { type: String, required: true },
    password: { type: String },
}, { versionKey: false });

const User = mongoose.model('User', userSchema, 'Users');

module.exports = User;
