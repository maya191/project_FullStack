const userRepo = require('../Repositories/UserDBRepo');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY

const findUserInSystem = async (username, password) =>
{
    const res = await userRepo.findUser(username, password);
    if (res.user) {
        const userID = res.user.id;
        const token = jwt.sign(
            { id: userID },
            SECRET_KEY);
        return token;
    }
    else return null;
}
module.exports = {
    findUserInSystem
}