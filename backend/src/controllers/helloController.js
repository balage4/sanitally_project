import { helloService } from '../services/helloService';

export const helloController = {
  async get(req, res) {
    const data = await helloService.getHelloWorld();

    res.status(200).json(data);
  },
};
