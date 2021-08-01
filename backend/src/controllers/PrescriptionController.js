import { prescriptrionService } from "../services/prescriptionService";

export const prescriptionController = {
  async createNewPrescription(req, res) {
    const prescription = await prescriptrionService.createNewPrescription(req.body);
    res.status(prescription.status).json(prescription);
  }
}