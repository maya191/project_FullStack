const Member = require('../Models/MembersModel')

const getAllMembers = (filters) =>
{
    return Member.find(filters);
}

const getMemberById = (id) =>
{
    return Member.findById(id)
}

const addNewMember = (obj) =>
{
    const pro = new Member(obj);
    return pro.save();
}

const updateMember = (id, obj) =>
{
    return Member.findByIdAndUpdate(id, obj)
}
const deleteMember = (id) =>
{
    return Member.findByIdAndDelete(id);
}


module.exports = {
    getAllMembers,
    getMemberById,
    addNewMember,
    updateMember,
    deleteMember
}