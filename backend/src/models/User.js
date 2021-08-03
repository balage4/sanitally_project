import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minLength: 8
  },
  role: {
    type: String,
    default: 'user'
  },
  providerTitle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  }
});

export default mongoose.model('User', userSchema);