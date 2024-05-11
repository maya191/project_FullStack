const SubscriptionRepo = require('../Repositories/SubscriptionsRepo')

const getAllSubscriptions = (filters) =>
{
    return SubscriptionRepo.getAllSubscriptions(filters);
};

const getSubscriptionById = (id) =>
{
    return SubscriptionRepo.getSubscriptionById(id)
}
const addNewSubscription = (obj) =>
{
    return SubscriptionRepo.addNewSubscription(obj)
}

const updateSubscription = (id, obj) =>
{
    return SubscriptionRepo.updateSubscription(id, obj)
}

const deleteSubscription = (id) =>
{
    return SubscriptionRepo.deleteSubscription(id)
}

module.exports = {
    getAllSubscriptions,
    getSubscriptionById,
    updateSubscription,
    deleteSubscription,
    addNewSubscription
}