const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: String,
    name: String,
    password: String
});

module.exports = mongoose.model('User', UserSchema);