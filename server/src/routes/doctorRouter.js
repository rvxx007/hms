import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { getAllMedicines, getPriscriptionsByPatientId, getTodays, postPrescribeMedicine } from "../controllers/doctorController.js";
const doctorRouter = express.Router();
const doctor = protect(["doctor"]);

doctorRouter.get("/today", doctor, getTodays);
doctorRouter.get("/medicines", doctor, getAllMedicines);
doctorRouter.post("/prescribe/:patientId",doctor , postPrescribeMedicine);
doctorRouter.get("/prescriptions/:patientId", doctor, getPriscriptionsByPatientId);


export default doctorRouter;
