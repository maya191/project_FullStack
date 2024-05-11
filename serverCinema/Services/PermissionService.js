const PremissionRepo = require('../Repositories/PremissionRepo')

const getAllPremission = () =>
{
    try {
        return PremissionRepo.getAllPremissionFile();
    }
    catch (error) {
        throw error;
    }
}
const addNewPremission = async (obj) =>
{
    try {
        const data = await getAllPremission();
        data.push(obj);
        await PremissionRepo.addNewPremissionFile(data);
        return obj; // Return the added Premission object
    } catch (error) {
        throw error;
    }
}
const deletePermissionById = async (userId) =>
{
    try {
        let data = await getAllPremission();
        const index = data.findIndex(per => parseInt(per.userId) === parseInt(userId));
        if (index !== -1) {
            data.splice(index, 1); // Remove user from the array
            await PremissionRepo.addNewPremissionFile(data); // Write updated data to file
            return { message: 'Permission deleted successfully' };
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllPremission,
    addNewPremission,
    deletePermissionById
}