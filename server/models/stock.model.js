const mongoose = require('mongoose');

const StockSchema = mongoose.Schema({
  symbol: { type: String, required: true },
  buyPrice: { type: Number, required: true },
  sellPrice: {type: Number },
  buyDate: { type: Date, required: true },
  sellDate: { type: Date }
});

module.exports = mongoose.model('Stock', StockSchema);
