const UsersFileRepo = require('../Repositories/UsersFileRepo')

const getAllUsersFile = () =>
{
    return UsersFileRepo.getAllUsersFile();

}
const addNewUserFile = async (obj) =>
{
    const data = await getAllUsersFile();
    data.push(obj);
    console.log(data);
    await UsersFileRepo.addNewUserFile(data);
    return obj; // Return the added user object
}

const deleteUserById = async (userId) =>
{
    let data = await getAllUsersFile();
    const index = data.findIndex(user => parseInt(user.id) === parseInt(userId));
    if (index !== -1) {
        data.splice(index, 1); // Remove user from the array
        await UsersFileRepo.addNewUserFile(data); // Write updated data to file
        return { message: 'User deleted successfully' };
    } else {
        throw new Error('User not found');
    }

}

const updateUser = async (obj) =>
{
    let data = await getAllUsersFile();
    const index = data.findIndex(user => parseInt(user.id) === parseInt(obj.id));
    if (index !== -1) {
        data[index] = obj
        await UsersFileRepo.addNewUserFile(data); // Write updated data to file
        return { message: 'User updated successfully' };
    } else {
        throw new Error('User not found');
    }
}

module.exports = {
    getAllUsersFile,
    addNewUserFile,
    deleteUserById,
    updateUser
}