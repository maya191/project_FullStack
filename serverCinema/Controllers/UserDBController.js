const UserDBService = require('../Services/UserDBService')
const express = require('express');
const axios = require('axios');

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
//add new user
router.post('/', async (req, res) =>
{
    try {
        const obj = req.body;
        const response = await axios.get(membersURL, { params: { name: obj.userName } });
        if (response.data && response.data.length > 0) {
            const result = await UserDBService.addNewUser(obj);
            if (!Object.keys(result).length) {
                res.status(409).send("user already exists")
            }
            else res.status(201).send(result);
        }
        else {
            res.status(404).send("user not found")
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// Update a User
router.put('/:id', async (req, res) =>
{
    try {
        const { id } = req.params;
        const obj = req.body;
        const result = await UserDBService.updateUser(id, obj);
        console.log(result);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
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



