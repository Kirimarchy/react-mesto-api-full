const jwt = require('jsonwebtoken');

const AuthError = require('../errors/auth-err');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'd285e3dceed844f902650f40');
  } catch (err) {
    next(new AuthError('Необходима авторизация'));
  }

  req.user = payload;

  next();
};
