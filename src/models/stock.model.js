const mongoose = require('mongoose');

const StockSchema = mongoose.Schema({
  symbol: { type: String, required: true },
  buyPrice: { type: Number, required: true },
  buyDate: { type: Date, required: true },
});

module.exports = mongoose.model('Stock', StockSchema);
