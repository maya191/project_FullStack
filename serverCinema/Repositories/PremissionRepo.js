const jFile = require('jsonfile');
const path = require('path');

const filePath = path.resolve(__dirname, '../jsonFiles/PremissionFile.json');

const getAllPremissionFile = async () =>
{
    return jFile.readFile(filePath);
}

const addNewPremissionFile = (obj) =>
{
    return jFile.writeFile(filePath, obj, { spaces: 2 });
}


module.exports = {
    getAllPremissionFile,
    addNewPremissionFile
};
