const jFile = require('jsonfile');
const path = require('path');

const filePath = path.resolve(__dirname, '../jsonFiles/UsersFile.json');

const getAllUsersFile = async () =>
{
    return jFile.readFile(filePath);
}

const addNewUserFile = (obj) =>
{
    return jFile.writeFile(filePath, obj, { spaces: 2 });
}



module.exports = {
    getAllUsersFile,
    addNewUserFile
};
