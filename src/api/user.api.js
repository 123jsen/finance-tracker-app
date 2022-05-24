const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

// middleware for parsing json
router.use(express.json());

const User = require('../models/user.model.js');

// salt parameter for bcrypt
const saltRounds = 10;

// Create a new user
router.post('/', (req, res) => {
  console.log(req.body);

  const name = req.body.name;
  const password = req.body.password;

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
router.get('/:username/:password', async (req, res) => {
  const name = req.params.username;
  const password = req.params.password;

  const user = await User.findOne({ name });

  if (user == null) {
    res.sendStatus(404);
    console.log(`User ${name} not found in DB`);
    return;
  }

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

    res.send(`Correct login for user ${name}`);
  });
});

module.exports = router;
