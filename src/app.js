const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

//setup dbUri in .env
const dbUri = process.env.MONGODB_KEY;
mongoose.connect(dbUri);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));

db.once('open', function () {
  console.log('app.js: Start Server');

  app.use(express.static('public'));
});

const server = app.listen(process.env.PORT || 3000);
