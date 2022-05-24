const Token = require('./models/token.model.js');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  const { name } = req.headers;

  const tokenRecord = await Token.findOne({ token }).populate('user');

  // Verify Token
  if (tokenRecord == null) {
    console.log('No token provided');
    res.sendStatus(400);
    return;
  }

  if (tokenRecord.user.name != name) {
    console.log('Token not matching user');
    res.sendStatus(400);
    return;
  }

  next();
};
