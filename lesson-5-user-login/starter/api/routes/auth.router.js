const express = require("express");
const router = express.Router();
const model = require("../models");
const bcrypt = require('bcryptjs');
const EmailValidator = require('email-validator');


//TODO write hash function

//TODO write compare function

//TODO write register endpoint

//TODO write login endpoint

router.get('/', async (req, res) => {
    res.send('auth')
});

module.exports = router;