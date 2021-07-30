import Service from "../models/Service";
import { validateServiceData } from "../utils";
import logger from "../logger";

export const servService = {
  async createService(data) {
    try {

      const { error } = validateServiceData(data);
      if (error) {
        return { status: 400, error: error.details[0].message };
      }

      const serviceExist = await Service.findOne({ serviceName: data.serviceName }).exec();
      if (serviceExist) {
        return { status: 400, error: 'Service is already saved' };
      }
      const serv = await new Service({
        serviceName: data.serviceName,
        serviceNote: data.serviceNote
      });
      await serv.save();
      return {
        status: 201,
        message: 'Service saved'
      };

    } catch (err) {
      logger.error(err);
      return { status: 500, error: 'Something went wrong' };
    }
  },
  async getServices() {
    try {
      const services = await Service.find({}).exec();
      return { status: 200, services };
    } catch (err) {
      logger.error(err);
      return { status: 500, error: 'Something went wrong' };
    }
  },
  async getServiceById(id) {
    try {
      const serviceData = await Service.findById(id).exec();
      return { status: 200, serviceData };
    } catch (err) {
      logger.error(err);
      return { status: 500, error: 'Something went wrong' };
    }
  },
  async updateService(data) {
    try {
      await Service.findByIdAndUpdate(`{${data.id}},{${data.updateData}`);
      return { status: 200, message: 'Successful update!' };
    } catch (err) {
      logger.error(err);
      return { status: 500, error: 'Something went wrong' };
    }
  },
  async deleteService(id) {
    try {
      await Service.findByIdAndRemove(id);
      return { status: 202 };
    } catch (err) {
      logger.error(err);
      return { status: 500, error: 'Something went wrong' };
    }
  }
}