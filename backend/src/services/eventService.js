/* eslint-disable no-underscore-dangle */
import Event from "../models/Event";
import { validateEventData } from '../utils';
import logger from "../logger";
import User from "../models/User";
import Service from "../models/Service";

export const eventService = {

  async createEvent(data) {
    const { eventProvider } = data;
    const fullName = eventProvider.split(' ');

    const eventProviderObject = await User.findOne(({ $and: [{ lastName: fullName[0] }, { firstName: fullName[1] }] }));
    const serviceObject = await Service.findOne({ serviceName: data.eventService });
    const userObject = await User.findOne({ "email": data.userEmail });

    try {
      const { error } = validateEventData(data);
      if (error) {
        return { status: 400, error: error.details[0].message }
      }
      const event = await new Event({
        userId: userObject._id,
        eventDate: data.eventDate,
        eventService: serviceObject._id,
        eventProvider: eventProviderObject._id
      });
      await event.save();

      return {
        status: 201,
        message: 'Event created'
      }

    } catch (err) {
      logger.error(err);
      return { status: 500, error: 'Something went wrong' };
    }
  },

  async getEvents() {
    try {
      const events = await Event.find();

      return { status: 200, events };
    } catch (err) {
      logger.error(err);
      return { status: 500, error: 'Something went wrong' };
    }
  },
  async getEventsByUserEmail(userEmail) {

    try {
      const userObject = await User.findOne({ email: userEmail });

      const events = await Event.find({ "userId": userObject._id });
      return { status: 200, events };
    } catch (err) {
      logger.error(err);
      return { status: 500, error: 'Something went wrong' };
    }
  },
  async getEventsByProvider(userEmail) {
    try {
      const userObject = await User.findOne({ email: userEmail });
      console.log(userObject);
      const events = await Event.find({ "eventProvider": userObject._id });
      return { status: 200, events };
    } catch (err) {
      logger.error(err);
      return { status: 500, error: 'Something went wrong' };
    }
  }
}
