const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

const User = require('../models/user.model.js');
const Token = require('../models/token.model.js');

// salt parameter for bcrypt
const saltRounds = 10;

// Create a new user
router.post('/create', (req, res) => {
  console.log(req.body);

  const { name, password } = req.body;

  bcrypt.hash(password, saltRounds, async (err, hash) => {
    if (err) {
      res.sendStatus(500);
      console.log(err);
      return;
    }

    try {
      await User.create({
        name,
        password: hash,
      });

      console.log(`User ${name} created`);
      res.sendStatus(201);
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
    res.sendStatus(404);
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
      res.sendStatus(404);
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
