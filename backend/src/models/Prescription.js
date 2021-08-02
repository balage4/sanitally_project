import mongoose from 'mongoose';

const prescriptionSchema = new mongoose.Schema({
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
  },
  prescriptionFrom: {
    type: String,
    required: true
  }
});

export default mongoose.model('Prescription', prescriptionSchema);