import logger from '../logger';
import { userService } from '../services';

export const userController = {

  test(req, res) {
    res.sendStatus(200);
  },

  async loginUser(req, res) {
    try {
      const user = await userService.loginUser(req.body);
      res.status(user.status).json({ user });
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  },

  async registerUser(req, res) {
    try {
      const user = await userService.createUser(req.body);
      res.status(user.status).json({ user });
    } catch (err) {
      logger.error(err);
      res.status(500).json({ error: 'Something went wrong' })
    }
  }
}
