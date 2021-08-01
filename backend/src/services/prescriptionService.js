import Prescription from "../models/Prescription";
import logger from "../logger";

export const prescriptrionService = {
  async createNewPrescription(data) {
    try {
      const prescriptionData = await new Prescription({
        prescriptionFor: data.prescription.prescriptionFor,
        prescriptionVaccine: data.prescription.prescriptionVaccine,
        prescriptionDosage: data.prescription.prescriptionDosage,
        prescriptionFrom: data.email
      });
      await prescriptionData.save();
      return { status: 201, message: 'Prescription saved' }
    } catch (err) {
      logger.error(err);
      return { status: 500, error: 'Something went wrong' };
    }
  }
}