import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  prescriptionFor: {
    type: String,
    required: true
  },
  prescriptionVaccine: {
    type: String,
    required: true
  },
  prescriptionDosage: {
    type: String,
    required: true
  }
});

export default mongoose.model('Prescription', userSchema);