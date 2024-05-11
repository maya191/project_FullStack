const UserDB = require('../Models/UserDBModel')
const getAllUserDBs = (filters) =>
{
    return UserDB.find(filters);
}

const getUserDBById = (id) =>
{
    return UserDB.findById(id)
}

const addNewUserDB = (obj, index) =>
{
    const newUser = new UserDB({ id: index, ...obj });
    return newUser.save();
}

const updateUserDB = (id, obj) =>
{
    return UserDB.findByIdAndUpdate(id, obj)
}
const deleteUserDB = (id) =>
{
    return UserDB.findByIdAndDelete(id);
}
const findUser = async (userName, password) =>
{
    try {
        const user = await UserDB.findOne({ userName, password });
        return { user, error: null };
    } catch (error) {

        return { user: null, error };
    }
};






module.exports = {
    getAllUserDBs,
    getUserDBById,
    addNewUserDB,
    updateUserDB,
    deleteUserDB,
    findUser
}