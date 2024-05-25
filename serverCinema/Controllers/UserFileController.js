// Controllers/UserFileController.js
const express = require('express');
const UsersFileService = require('../Services/UserFileService');
const router = express.Router();

// Get all users
router.get('/', async (req, res) =>
{
    try {
        const users = await UsersFileService.getAllUsersFile();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Add a new user
router.post('/', async (req, res) =>
{
    try {
        const obj = req.body;
        const newUser = await UsersFileService.addNewUserFile(obj);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.put('/:id', async (req, res) =>
{
    try {
        const obj = req.body;
        const newUser = await UsersFileService.updateUser(obj);
        res.status(200).send('User file Updated!')
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.delete('/:id', async (req, res) =>
{
    try {
        const { id } = req.params;
        const result = UsersFileService.deleteUserById(id);
        res.send(result)
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
