module.exports = (req, res, next) => {
  console.log();
  console.log('Time:', new Date());
  console.log('Method:', req.method);
  console.log('URL:', req.originalUrl);
  next();
};
