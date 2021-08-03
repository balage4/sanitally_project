import Prescription from "../models/Prescription";
import logger from "../logger";
import User from "../models/User";

export const prescriptrionService = {
  async createNewPrescription(data) {
    try {

      const userName = data.prescriptionFor.split(' ');


      const userFor = await User.find({
        and: [
          { lastName: userName[0] },
          { firstName: userName[1] }
        ]
      });
      const prescriptionData = await new Prescription({
        prescriptionFor: userFor[0],
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
  },
  async getPrescriptionsByUser(userEmail) {
    try {
      const pres = await Prescription.find({ prescriptionFor: userEmail });
      return { status: 200, pres };
    } catch (err) {
      logger.error(err);
      return { status: 500, error: 'Something went wrong.' };
    }
  }
}