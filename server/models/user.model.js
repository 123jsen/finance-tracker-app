const mongoose = require('mongoose');
const Token = require('./token.model.js');

// Maximum 5 logins per person
const TOKEN_LIMIT = 5;

const UserSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  startMoney: { type: Number, default: 0 },
  pastHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Stock' }],
});

UserSchema.static('removeTokens', async function (user) {
  // Latest token is tokens[0]
  const tokens = await Token.find({ user }).sort({ createDate: -1 });

  const excessTokens = tokens.slice(5);
  if (excessTokens.length > 0) {
    console.log(`Removing ${excessTokens.length} excess tokens`);
    excessTokens.forEach((token) => {
      Token.deleteOne({ _id: token._id }).exec();
    });
  }
});

module.exports = mongoose.model('User', UserSchema);
