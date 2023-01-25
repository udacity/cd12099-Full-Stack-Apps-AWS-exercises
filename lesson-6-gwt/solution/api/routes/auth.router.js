const express = require("express");
const router = express.Router();
const model = require("../models");
const bcrypt = require('bcryptjs');
const EmailValidator = require('email-validator');
const config = require('../security/config');
const  jwt = require('jsonwebtoken');


async function generatePassword(plainTextPassword) {
    const rounds = 10;
    const salt = await bcrypt.genSalt(rounds);
    const hash = await bcrypt.hash(plainTextPassword, salt);

    return hash;
}

async function comparePasswords(plainTextPassword, hash) {
    return await bcrypt.compare(plainTextPassword, hash);
}

function generateJWT(user) {
    //Use jwt to create a new JWT Payload containing
    return jwt.sign(user.toJSON(), config.jwt);
}

router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;


   console.log("user", email);
   console.log("password", password);

    // check email is valid
    if (!email || !EmailValidator.validate(email)) {
        return res.status(400).send({ auth: false, message: 'Email is required or malformed' });
    }

    // check email password valid
    if (!password) {
        return res.status(400).send({ auth: false, message: 'Password is required' });
    }

    const user = await model.user.findByPk(email);
    // check that user exists
    if(!user) {
        return res.status(401).send({ auth: false, message: 'Unauthorized' });
    }

    // check that the password matches
    const authValid = await comparePasswords(password, user.password)

    if(!authValid) {
        return res.status(401).send({ auth: false, message: 'Unauthorized' });
    }

    // Generate JWT
    const jwt = generateJWT(user);

    res.status(200).send({ auth: true, token: jwt});
});

//register a new user
router.post('/', async (req, res) => {
    const email = req.body.email;
    const plainTextPassword = req.body.password;

    console.log("user", email);
    console.log("password", plainTextPassword);

    // check email is valid
    if (!email || !EmailValidator.validate(email)) {
        return res.status(400).send({ auth: false, message: 'Email is required or malformed' });
    }

    // check email password valid
    if (!plainTextPassword) {
        return res.status(400).send({ auth: false, message: 'Password is required' });
    }

    // find the user
    const user = await model.user.findByPk(email);

    if(user) {
        return res.status(422).send({ auth: false, message: 'User may already exist' });
    }

    const password_hash = await generatePassword(plainTextPassword);

    const newUser = await new model.user({
        id: email,
        password: password_hash
    });

    let savedUser;
    try {
        savedUser = await newUser.save();
    } catch (e) {
        throw e;
    }

    res.status(201).send({savedUser});
});

router.get('/verify', async (req, res) => {
    if (!req.headers || !req.headers.authorization){
        return res.status(401).send({ message: 'No authorization headers.' });
    }
    
    const token_bearer = req.headers.authorization.split(' ');

    if(token_bearer.length != 2){
        return res.status(401).send({ message: 'Malformed token.' });
    }
   
    var token = token_bearer[1];

	var payload
	try {
	    //The payload is the user object
		payload = jwt.verify(token, config.jwt);

	} catch (e) {
		if (e instanceof jwt.JsonWebTokenError) {
			return res.status(401).send({ message: 'Error 401'}).end();
		}
		return res.status(400).send({ message: 'Error 400'}).end();
	}
    res.status(200).send({ message: 'You are Auth in !!!'});
});

router.get('/', async (req, res) => {
    res.send('auth')
});

module.exports = router;