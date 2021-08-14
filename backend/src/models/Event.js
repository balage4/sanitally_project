import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  eventDate: {
    type: Date,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  eventService: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  },
  eventProvider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

export default mongoose.model('Event', eventSchema);