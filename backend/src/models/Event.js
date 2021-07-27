import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  eventDate: {
    type: Date,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  }
});

export default mongoose.model('Event', eventSchema);