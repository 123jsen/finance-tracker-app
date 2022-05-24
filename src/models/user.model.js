const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  startMoney: { type: Number, default: 0 },
  pastHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Stock' }],
});

module.exports = mongoose.model('User', UserSchema);
