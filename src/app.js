// Packages from npm
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Imports from other files
const stockRouter = require('./stocks.js');
const log = require('./log.js');

const app = express();

//setup dbUri in .env
const dbUri = process.env.MONGODB_KEY;
mongoose.connect(dbUri);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));

db.once('open', function () {
  console.log('app.js: Start Server');
  // Middleware for logging requests
  app.use(log);

  // Serve public folder
  app.use(express.static('public'));

  // Other Express APIs
  app.use('/stock', stockRouter);
});

const server = app.listen(process.env.PORT || 3000);
