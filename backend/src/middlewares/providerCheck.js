export function providerCheck(req, res, next) {

  if (req.token.role !== 'provider') {

    return res.status(401).json('You are not a provider!');
  }
  return next();
}