const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

const User = require('../models/user.model.js');
const Token = require('../models/token.model.js');

// salt parameter for bcrypt
const saltRounds = 10;

// Create a new user
router.post('/create', (req, res) => {
  const { name, password } = req.body;

  if (!name) {
    res.status(400).send('Username Cannot be Empty');
    console.log(`User ${name} not found in DB`);
    return;
  }

  if (!password) {
    res.status(400).send('Password Cannot be Empty');
    console.log(`User ${name} not found in DB`);
    return;
  }

  bcrypt.hash(password, saltRounds, async (err, hash) => {
    if (err) {
      res.sendStatus(500);
      console.log(err);
      return;
    }

    try {
      const user = await User.create({
        name,
        password: hash,
      });

      console.log(`User ${name} created`);

      const token = Token.generateStr();

      Token.create({
        user,
        token,
        createDate: new Date(),
      });

      res.status(201).send({ name, token });
    } catch (err) {
      // Handle error e.g. duplicate error
      console.log(err);
      if (err.code == 11000) {
        res.status(400).send('Username already taken');
      } else {
        res.sendStatus(400);
      }
    }
  });
});

// check if user credentials are correct
router.post('/login', async (req, res) => {
  const { name, password } = req.body;

  const user = await User.findOne({ name });

  if (user == null) {
    res.status(404).send('Incorrect Login Credentials');
    console.log(`User ${name} not found in DB`);
    return;
  }

  // Encrypt the password
  bcrypt.compare(password, user.password, function (err, result) {
    if (err) {
      res.sendStatus(500);
      console.log(err);
      return;
    }

    if (!result) {
      res.status(404).send('Incorrect Login Credentials');
      console.log(`Incorrect password for user ${name}`);
      return;
    }

    // Credentials Correct, create token for the user
    const token = Token.generateStr();

    Token.create({
      user,
      token,
      createDate: new Date(),
    });

    res.send({ name, token });
  });
});

module.exports = router;
