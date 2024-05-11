const UserDBService = require('../Services/UserDBService')
const express = require('express');

const router = express.Router();
const membersURL = 'http://localhost:3000/Members'

//Get All Users
router.get('/', async (req, res) =>
{
    try {
        const filters = req.query;
        const Users = await UserDBService.getAllUsers(filters);
        res.send(Users);
    } catch (error) {
        res.send(error);
    }
});

// Get User by ID
router.get('/:id', async (req, res) =>
{
    try {
        const { id } = req.params;
        const User = await UserDBService.getUserById(id);
        res.send(User);
    } catch (error) {
        res.send(error);
    }
});

// Update a User
router.put('/:id', async (req, res) =>
{
    try {
        const { id } = req.params;
        const obj = req.body;
        const result = await UserDBService.updateUser(id, obj);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
});

//delete User
router.delete('/:id', async (req, res) =>
{
    try {
        const { id } = req.params;
        const result = await UserDBService.deleteUser(id);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;



