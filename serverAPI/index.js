const express = require('express');
const cors = require('cors');
const { connectDB,
    importMembersData,
    importMoviesData } = require('./Configs/DB');

const app = express();
const PORT = 3000;

const SubController = require('./Controllers/SubscriptionController')
const MoviesController = require('./Controllers/MovieController')
const MembersController = require('./Controllers/MemberController')
connectDB();
importMembersData();
importMoviesData();

app.use(cors());

app.use(express.json());

app.use('/Subscriptions', SubController);
app.use('/Movies', MoviesController);
app.use('/Members', MembersController);

app.listen(PORT, () =>
{
    console.log(`app is listening at http://localhost:${PORT}`);
});
