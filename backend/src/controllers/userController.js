import { userService } from '../services';

export const userController = {

  test(req, res) {
    res.sendStatus(200);
  },

  async loginUser(req, res) {
    const user = await userService.loginUser(req.body);
    res.status(user.status).json(user);
  },

  async registerUser(req, res) {
    const user = await userService.createUser(req.body);
    res.status(user.status).json(user);
  },

  async getUsers(req, res) {
    const users = await userService.getUsers();
    res.status(users.status).json(users);
  },
  async deleteUser(req, res) {
    const users = await userService.deleteUser(req.params.id);
    res.status(users.status).json(users);
  }
}
