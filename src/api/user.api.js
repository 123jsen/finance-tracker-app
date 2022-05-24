const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

// middleware for parsing json
router.use(express.json());

const User = require('../models/user.model.js');

// salt parameter for bcrypt
const saltRounds = 10;

// Create a new user
router.post('/', async (req, res) => {
  console.log(req.body);

  const name = req.body.name;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      res.sendStatus(400);
      console.log(err);
      return;
    }

    User.create({
      name,
      password: hash,
    });

    console.log(`User ${name} created`);
    res.sendStatus(201);
  });
});

module.exports = router;
