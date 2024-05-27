const mongoose = require('mongoose');
const Schema = mongoose.Schema();

const User = new mongoose.Schema({
    id : Number,
    name: String,
    password: String
},{collection : "dbtest"});

module.exports = User;