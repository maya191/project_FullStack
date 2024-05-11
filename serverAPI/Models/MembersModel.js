const mongoose = require('mongoose');
const { Schema } = mongoose;

const memberSchema = new Schema({
    name: String,
    email: String,
    city: String
}, { versionKey: false });

const Member = mongoose.model('member', memberSchema);

module.exports = Member;
