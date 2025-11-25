import { send2xxSuccessResponse, send4xxClientErrorResponse } from "req-res-handlers";

export const getTodays = async (req, res) => {
  try {
    const doc = await Doctor.findOne({ user: req.user.id });
    if (!doc) return send4xxClientErrorResponse(res,404,"Doctor not found",{ message: "Doctor not found" });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const patients = await Patient.find({
      doctor: doc._id,
      registrationDate: { $gte: today }
    }).sort({ createdAt: -1 });

    return send2xxSuccessResponse(res,200,"todays doctor",patients);
  } catch (err) {
    return send4xxClientErrorResponse(res, 400,"Error fetching today's patients", { error: err.message });
  }
}


export const getAllMedicines = async (req, res) => {
  const medicines = await Medicine.find().sort({ name: 1 });
  return send2xxSuccessResponse(res,200,"Medicines fetched",medicines);
}

export const postPrescribeMedicine = async (req, res) => {
  try {
    const doc = await Doctor.findOne({ user: req.user.id });

    const prescription = await Prescription.create({
      doctor: doc._id,
      patient: req.params.patientId,
      medicines: req.body.medicines
    });

    return send2xxSuccessResponse(res,200,"Medicine prescribed",prescription);
  } catch (err) {
    return send4xxClientErrorResponse(res, 400,"Error prescribing medicine", { error: err.message });
  }
}

export const getPriscriptionsByPatientId = async (req, res) => {
  const list = await Prescription.find({ patient: req.params.patientId })
    .populate("doctor")
    .populate("medicines.medicine")
    .sort({ createdAt: -1 });

  return send2xxSuccessResponse(res,200,"Prescriptions fetched",list);
}