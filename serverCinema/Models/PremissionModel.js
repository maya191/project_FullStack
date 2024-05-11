const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
    userId: Number,
    permissions: [String]
}, { versionKey: false });

const Permission = mongoose.model('Permission', permissionSchema);

module.exports = Permission;
