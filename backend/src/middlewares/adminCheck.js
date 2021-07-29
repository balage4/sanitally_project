export function adminCheck(req, res, next) {

    if (req.token.role !== 'admin') {

      return res.status(401).json('You are not admin.');
    }
    return next();
  }