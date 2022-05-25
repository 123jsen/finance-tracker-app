const Token = require('./models/token.model.js');
const User = require('./models/user.model.js');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  const { name } = req.headers;

  if (token == null || name == null) {
    console.log('No token provided');
    res.status(400).send('No token provided');
    return;
  }

  // Remove expired tokens
  await Token.removeExpiredTokens();

  // Check if token is in DB
  const tokenRecord = await Token.findOne({ token }).populate('user');

  if (tokenRecord == null) {
    console.log('Token not found in DB');
    res.status(400).send('Incorrect Token');
    return;
  }

  if (tokenRecord.user.name != name) {
    console.log('Token not matching user');
    res.status(400).send('Incorrect Token');
    return;
  }

  // Remove excess tokens
  User.removeTokens(tokenRecord.user);

  // Update date of this token
  tokenRecord.createDate = new Date();
  tokenRecord.save();

  // Add User Information to Request
  req.user = tokenRecord.user;

  next();
};
