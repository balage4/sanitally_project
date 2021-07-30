import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  eventDate: {
    type: Date,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  eventService: {
    type: String
  },
  eventProvider: {
    type: String
  }
});

export default mongoose.model('Event', eventSchema);