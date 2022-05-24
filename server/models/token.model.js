const mongoose = require('mongoose');

const TokenSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  token: { type: String, required: true },
  createDate: { type: Date, required: true },
});

TokenSchema.static('generateStr', function () {
  // https://stackoverflow.com/questions/8532406/create-a-random-token-in-javascript-based-on-user-details

  const rand = function () {
    return Math.random().toString(36).slice(2); // remove `0.`
  };

  return rand() + rand();
});

module.exports = mongoose.model('Token', TokenSchema);
