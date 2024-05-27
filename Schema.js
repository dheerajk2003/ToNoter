const mongoose = require('mongoose');
const Schema = mongoose.Schema();

const User = new mongoose.Schema({
    name: String,
    password: String
},{collection : "dbtest"});

module.exports = User;