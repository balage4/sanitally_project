import { servService } from '../services';

export const serviceController = {
  async createService(req, res) {
    const newService = await servService.createService(req.body);
    res.status(newService.status).json(newService);
  },
  async getServices(req, res) {
    const services = await servService.getServices();
    res.status(services.status).json(services);
  },
  async getServiceById(req, res) {
    const service = await servService.getServiceById(req.params.id);
    res.status(service.status).json(service);
  },
  async updateService(req, res) {
    const updatedService = await servService.updateService(req.body);
    res.status(updatedService.status).json(updatedService);
  },
  async deleteService(req, res) {
    const deletedService = await servService.deleteService(req.params.id);
    res.status(deletedService.status).json(deletedService);
  }

}
