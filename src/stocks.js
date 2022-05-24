const yahooFinance = require('yahoo-finance2').default;
const express = require('express');
const router = express.Router();

const Stock = require('./models/stock.model.js');

// This queries stock prices for a given ticker symbol
router.get('/:symbol', async (req, res) => {
  const symbol = req.params.symbol;

  const quote = await yahooFinance.quote(symbol);
  if (quote == null) res.send(404);

  res.send(quote);
});

module.exports = router;
