const express = require('express');
const router = express.Router();

const User = require('../models/user.model.js');

router.delete('/tokens', (req, res) => {
  User.clearLogin(req.user);

  res.sendStatus(204);
});

router.delete('/account', async (req, res) => {
  User.clearLogin(req.user);
  // Also need to clear stock data
  const user = User.deleteOne({ user: req.user }).exec();

  res.sendStatus(204);
});

module.exports = router;
