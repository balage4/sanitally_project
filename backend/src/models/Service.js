import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: true,
  },
  serviceNote: {
    type: String,
    required: true
  },
  providers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

export default mongoose.model('Service', userSchema);
