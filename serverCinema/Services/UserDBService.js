const UserDBRepo = require('../Repositories/UserDBRepo')

const getAllUsers = (filters) =>
{
    return UserDBRepo.getAllUserDBs(filters);
};

const getUserById = (id) =>
{
    return UserDBRepo.getUserDBById(id)
}
const addNewUser = async (obj) =>
{
    const data = await getAllUsers();
    const index = data.findIndex(u => u.userName === obj.userName)
    if (index == -1) return UserDBRepo.addNewUserDB(obj, data.length)
    else return ({})
}

const updateUser = (id, obj) =>
{
    return UserDBRepo.updateUserDB(id, obj)
}

const deleteUser = (id) =>
{
    return UserDBRepo.deleteUserDB(id)
}

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    addNewUser
}