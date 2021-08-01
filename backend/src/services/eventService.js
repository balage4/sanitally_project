import Event from "../models/Event";
import { validateEventData } from '../utils';
import logger from "../logger";

export const eventService = {

  async createEvent(data) {
    try {
      const { error } = validateEventData(data);
      if (error) {
        return { status: 400, error: error.details[0].message }
      }
      const event = await new Event({
        userEmail: data.userEmail,
        eventDate: data.eventDate,
        eventService: data.eventService,
        eventProvider: data.eventProvider
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
  }
}
