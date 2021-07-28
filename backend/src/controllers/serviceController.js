import { servService } from '../services';

export const serviceController = {
  async createService(req, res) {
    const newService = await servService.createService(req.body);
    res.status(newService.status).json(newService);
  }
}
