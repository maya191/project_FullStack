const express = require('express');

const SubscriptionService = require('../Services/SubscriptionsService')
const router = express.Router();

//Get All Subscriptions
router.get('/', async (req, res) =>
{
    try {
        const filters = req.query;
        const Subscriptions = await SubscriptionService.getAllSubscriptions(filters);
        res.send(Subscriptions);
    } catch (error) {
        res.send(error);
    }
});

// Get Subscription by ID
router.get('/:id', async (req, res) =>
{
    try {
        const { id } = req.params;
        const Subscription = await SubscriptionService.getSubscriptionById(id);
        res.send(Subscription);
    } catch (error) {
        res.send(error);
    }
});

// Add a new Subscription
router.post('/', async (req, res) =>
{
    try {
        const obj = req.body;
        const result = await SubscriptionService.addNewSubscription(obj);
        res.status(201).send(result);
    } catch (error) {
        res.send(error);
    }
});

// Update a Subscription
router.put('/:id', async (req, res) =>
{
    try {
        const { id } = req.params;
        const obj = req.body;
        const result = await SubscriptionService.updateSubscription(id, obj);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
});

//delete Subscription
router.delete('/:id', async (req, res) =>
{
    try {
        const { id } = req.params;
        const result = await SubscriptionService.deleteSubscription(id);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;



