const express = require('express');
const PermissionService = require('../Services/PermissionService');
const router = express.Router();

router.get('/', async (req, res) =>
{
    try {
        const users = await PermissionService.getAllPremission();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//add new
router.post('/', async (req, res) =>
{
    try {
        const obj = req.body;
        const newPer = await PermissionService.addNewPremission(obj);
        res.status(201).json(newPer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.put('/:id', async (req, res) =>
{
    try {
        const obj = req.body;
        const newUserPermissions = await PermissionService.updateUserPermissions(obj);
        res.status(200).send('User Permissions Updated!')
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
})
router.delete('/:id', async (req, res) =>
{
    try {
        const { id } = req.params;
        const result = PermissionService.deletePermissionById(id);
        res.send(result)
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;