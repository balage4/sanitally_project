import Prescription from "../models/Prescription";
import logger from "../logger";

export const prescriptrionService = {
  async createNewPrescription(data) {
    try {

      const prescriptionData = await new Prescription({
        prescriptionFor: data.prescriptionFor,
        prescriptionVaccine: data.prescriptionVaccine,
        prescriptionDosage: data.prescriptionDosage,
        prescriptionFrom: data.prescriptionFrom
      });

      const prescriptionResponse = await prescriptionData.save();

      return { status: 201, prescriptionResponse };

    } catch (err) {
      logger.error(err);
      return { status: 500, error: 'Something went wrong.' };
    }
  }
}