const mongoose = require('mongoose');

// Token Time Limit is 7 days
const TIME_LIMIT = 7 * 24 * 60 * 60 * 1000;

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

TokenSchema.static('removeExpiredTokens', async function () {
  const tokens = await this.find({});
  const currentTime = Date.now();

  const expiredTokens = [];
  tokens.forEach((token) => {
    if (currentTime - token.createDate.getTime() > TIME_LIMIT) {
      expiredTokens.push(this.deleteOne({ _id: token._id }));
    }
  });

  if (expiredTokens.length > 0)
    console.log(`Removing ${expiredTokens.length} expired tokens`);
  await Promise.all(expiredTokens);
});

module.exports = mongoose.model('Token', TokenSchema);
