const mongoose = require('mongoose');
const { Schema } = mongoose;

const subscriptionSchema = new Schema({
    memberId: Number,
    movies: [{
        movieId: Schema.Types.ObjectId,
        date: Date
    }]
}, { versionKey: false });

const Subscription = mongoose.model('subscription', subscriptionSchema);

module.exports = Subscription;
