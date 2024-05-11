const mongoose = require('mongoose');
const { Schema } = mongoose;

const movieSchema = new Schema({
    name: String,
    genres: [String],
    image: String,
    premiered: Date
}, { versionKey: false });

const Movie = mongoose.model('movie', movieSchema);

module.exports = Movie;
