const express = require('express');

const MemberService = require('../Services/MembersService')
const router = express.Router();

//Get All Members
router.get('/', async (req, res) =>
{
    try {
        const filters = req.query;
        const Members = await MemberService.getAllMemebers(filters);
        res.status(200).send(Members);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

// Get Member by ID
router.get('/:id', async (req, res) =>
{
    try {
        const { id } = req.params;
        const Member = await MemberService.getMemeberById(id);
        res.send(Member);
    } catch (error) {
        res.send(error);
    }
});

// Add a new Member
router.post('/', async (req, res) =>
{
    try {
        const obj = req.body;
        const result = await MemberService.addNewMemeber(obj);
        res.status(201).send(result);
    } catch (error) {
        res.send(error);
    }
});

// Update a Member
router.put('/:id', async (req, res) =>
{
    try {
        const { id } = req.params;
        const obj = req.body;
        const result = await MemberService.updateMemeber(id, obj);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
});

//delete Member
router.delete('/:id', async (req, res) =>
{
    try {
        const { id } = req.params;
        const result = await MemberService.deleteMemeber(id);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;



