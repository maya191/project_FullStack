const axios = require('axios');
const UserDBService = require('../Services/UserDBService')
const express = require('express');

const router = express.Router();
const membersURL = 'http://localhost:3000/Members'
// Add a new User
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


module.exports = router;
