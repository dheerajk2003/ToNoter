const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const {Notes} = require('../Schema');

router.get("/",(req, res) => {
    res.send("wuwu");
});

module.exports = router;