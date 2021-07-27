import { eventService } from '../services';

export const eventController = {

  test(req, res) {
    res.sendStatus(200);
  },

  async createNewEvent(req, res) {
    const event = await eventService.createEvent(req.body);
    res.status(event.status).json({ event });
  }
}
