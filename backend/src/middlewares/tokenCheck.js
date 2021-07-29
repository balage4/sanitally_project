import jwt from 'jsonwebtoken';

// eslint-disable-next-line consistent-return
export function tokenCheck(req, res, next) {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) return res.status(401).json('Access denied!');

  const authToken = bearerToken.split(' ')[1];

  try {
    const auth = jwt.verify(authToken, process.env.TOKEN_SECRET);
    req.token = auth;
    next();
  } catch (err) {
    res.status(401).json('Invalid token!');
  }
}