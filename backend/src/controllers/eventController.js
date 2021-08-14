import { eventService } from '../services';

export const eventController = {

  test(req, res) {
    res.sendStatus(200);
  },

  async createNewEvent(req, res) {
    const event = await eventService.createEvent(req.body);
    res.status(event.status).json(event);
  },

  async getEvents(req, res) {
    const events = await eventService.getEvents(req.body);
    res.status(events.status).json(events);
  },
  async getEventsByUserEmail(req, res) {
    const events = await eventService.getEventsByUserEmail(req.params.useremail);
    res.status(events.status).json(events);
  },
  async getEventsByProvider(req, res) {
    const events = await eventService.getEventsByProvider(req.params.provideremail);
    res.status(events.status).json(events);
  }
}
