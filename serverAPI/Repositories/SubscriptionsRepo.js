const Subscription = require('../Models/Subscriptions')

const getAllSubscriptions = (filters) =>
{
    return Subscription.find(filters);
}

const getSubscriptionById = (id) =>
{
    return Subscription.findById(id)
}

const addNewSubscription = (obj) =>
{
    const pro = new Subscription(obj);
    return pro.save();
}

const updateSubscription = (id, obj) =>
{
    return Subscription.findByIdAndUpdate(id, obj)
}
const deleteSubscription = (id) =>
{
    return Subscription.findByIdAndDelete(id);
}


module.exports = {
    getAllSubscriptions,
    getSubscriptionById,
    addNewSubscription,
    updateSubscription,
    deleteSubscription
}