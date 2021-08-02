import { prescriptrionService } from "../services/prescriptionService";

export const prescriptionController = {
  async createNewPrescription(req, res) {
    const prescription = await prescriptrionService.createNewPrescription(req.body);
    res.status(prescription.status).json(prescription);
  },
  async getPrescriptionsByUser(req, res) {
    const prescriptions = await prescriptrionService.getPrescriptionsByUser(req.params.email);
    res.status(prescriptions.status).json(prescriptions);
  }
}