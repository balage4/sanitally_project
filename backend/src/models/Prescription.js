import mongoose from 'mongoose';

const prescriptionSchema = new mongoose.Schema({
  prescriptionFor: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  prescriptionVaccine: {
    type: String,
    required: true
  },
  prescriptionDosage: {
    type: String,
    required: true
  },
  prescriptionFrom: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

export default mongoose.model('Prescription', prescriptionSchema);