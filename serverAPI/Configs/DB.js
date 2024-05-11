const axios = require('axios');
const mongoose = require('mongoose');
const Member = require('../Models/MembersModel');
const Movie = require('../Models/MoviesModel');
const connectDB = () =>
{
    // Connect to MongoDB database
    mongoose
        .connect('mongodb://127.0.0.1:27017/subscriptionsDB')
        .then(() => console.log('Connected to subscriptionsDB'))
        .catch((error) => console.log(error));
};

const importMembersData = async () =>
{
    try {
        // Fetch data from API
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const usersData = response.data;

        // Extract required fields
        const membersData = usersData.map(user => ({
            name: user.name,
            email: user.email,
            city: user.address.city
        }));

        // Check if any members already exist in the database
        const existingMembers = await Member.find({}, 'name email city');

        // Filter out members that are not already in the database
        const newMembersData = membersData.filter(member =>
        {
            return !existingMembers.some(existingMember =>
                existingMember.name === member.name &&
                existingMember.email === member.email &&
                existingMember.city === member.city
            );
        });

        // Insert new data into MongoDB collection
        if (newMembersData.length > 0) {
            await Member.insertMany(newMembersData);
            console.log('Members data imported successfully');
        } else {
            console.log('No new members to import');
        }
    } catch (err) {
        console.error('Error importing members data:', err);
    }
};

const importMoviesData = async () =>
{
    try {
        // Fetch data from API
        const response = await axios.get('https://api.tvmaze.com/shows');
        const moviesData = response.data;

        // Extract required fields
        const formattedMoviesData = moviesData.map(movie => ({
            name: movie.name,
            genres: movie.genres,
            image: movie.image.medium, // Adjust according to API structure
            premiered: movie.premiered
        }));

        // Check if any movies already exist in the database
        const existingMovies = await Movie.find({}, 'name genres image premiered');

        // Filter out movies that are not already in the database
        const newMoviesData = formattedMoviesData.filter(movie =>
        {
            return !existingMovies.some(existingMovie =>
                existingMovie.name === movie.name &&
                existingMovie.genres.toString() === movie.genres.toString() &&
                existingMovie.image === movie.image &&
                existingMovie.premiered === movie.premiered
            );
        });

        // Insert new data into MongoDB collection
        if (newMoviesData.length > 0) {
            await Movie.insertMany(newMoviesData);
            console.log('Movies data imported successfully');
        } else {
            console.log('No new movies to import');
        }
    } catch (err) {
        console.error('Error importing movies data:', err);
    }
};

module.exports = { connectDB, importMoviesData, importMembersData };
