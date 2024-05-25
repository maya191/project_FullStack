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

const getId = async (id) =>
{
    try {
        const user = await UserDB.findOne({ id });
        return user._id;
    } catch (error) {

        return { user: null, error };
    }


}
const updateUserDB = async (id, obj) =>
{
    const userId = await getId(id)
    return UserDB.findByIdAndUpdate(userId, obj)
}
const deleteUserDB = async (id) =>
{
    const userId = await getId(id)
    return UserDB.findByIdAndDelete(userId);
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