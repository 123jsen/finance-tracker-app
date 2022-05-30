const express = require('express');
const router = express.Router();

const User = require('../models/user.model.js');

router.delete('/tokens', (req, res) => {
  User.clearLogin(req.user);

  res.sendStatus(204);
});

router.delete('/account', async (req, res) => {
  // No await because they are in another collection
  User.deleteAllStocks(req.user);
  User.clearLogin(req.user);

  const user = await User.findOne({ _id: req.user._id});
  if (user == null) {
    res.sendStatus(404);
    return;
  }

  user.delete();

  res.sendStatus(204);
});

module.exports = router;
