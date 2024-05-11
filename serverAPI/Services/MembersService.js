const MemeberRepo = require('../Repositories/MembersRepo')

const getAllMemebers = (filters) =>
{
    return MemeberRepo.getAllMembers(filters);
};

const getMemeberById = (id) =>
{
    return MemeberRepo.getMemberById(id)
}
const addNewMemeber = (obj) =>
{
    return MemeberRepo.addNewMember(obj)
}

const updateMemeber = (id, obj) =>
{
    return MemeberRepo.updateMember(id, obj)
}

const deleteMemeber = (id) =>
{
    return MemeberRepo.deleteMember(id)
}

module.exports = {
    getAllMemebers,
    getMemeberById,
    updateMemeber,
    deleteMemeber,
    addNewMemeber
}