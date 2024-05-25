require('dotenv').config({ path: './keys.env' });
const express = require('express');
const cors = require('cors');
const connectDB = require('./Configs/DB');

const app = express();
const PORT = 4000;

const UserFileController = require('./Controllers/UserFileController')
const PermissionController = require('./Controllers/PermissionController')
const UserDBController = require('./Controllers/UserDBController')
const AuthController = require('./Controllers/AuthController')
const CheckAuthController = require('./Controllers/CheckAuthController')
const newUserController = require('./Controllers/NewUserController')
connectDB();
app.use(cors());

app.use(express.json());

app.use('/login', AuthController)

app.use('/UsersFile', CheckAuthController, UserFileController);
app.use('/Permission', CheckAuthController, PermissionController);
app.use('/UsersDB', CheckAuthController, UserDBController);
//app.use('/newUser', newUserController)

app.listen(PORT, () =>
{
    console.log(`app is listening at http://localhost:${PORT}`);
});
