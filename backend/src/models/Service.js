import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: true,
    ref: 'User'
  },
  serviceNote: {
    type: String,
    required: true
  },
  providers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service'
    }
  ]
});

export default mongoose.model('Service', userSchema);
