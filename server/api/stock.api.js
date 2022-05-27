const yahooFinance = require('yahoo-finance2').default;
const express = require('express');
const router = express.Router();

const Stock = require('../models/stock.model.js');

// Queries all stock history of the user
router.get('/', async (req, res) => {
  const { user } = req;

  // Replace keys with DB entries
  try {
    await user.populate('pastHistory');

    res.send(user.pastHistory);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

// This queries stock prices for a given ticker symbol
router.get('/:symbol', async (req, res) => {
  const { symbol } = req.params;

  const quote = await yahooFinance.quote(symbol);
  if (quote == null) res.sendStatus(404);

  res.send(quote);
});

// Create a stock entry
router.post('/:symbol', async (req, res) => {
  const { symbol } = req.params;
  const { buyPrice, buyDate } = req.body;
  const { user } = req;
  
  // First check if symbol is correct
  const quote = await yahooFinance.quote(symbol);
  if (quote == null) {
    console.log('Stock is not found');
    res.status(404).send('Stock is not found');
    return;
  }

  try {
    const stock = await Stock.create({ symbol, buyPrice, buyDate });

    // Update User
    user.pastHistory.push(stock.id);
    user.save();

    res.status(200).send(`Added record for ${symbol}`);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

// Delete a stock entry
router.delete('/', async (req, res) => {});

module.exports = router;
