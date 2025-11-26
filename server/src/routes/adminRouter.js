import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  getAdminStats,
  getDoctorHospitalChart,
  getHospitals,
  getMedicinesTypesChart,
  getPatients,
  getPatientsWeek,
  postDoctors,
  getDoctors,
  postHospitals,
  postMedicines,
  postPatients,
  getMedicines
} from "../controllers/adminController.js";

const adminRouter = express.Router();

// only admin can access these routes
const admin = protect(["admin"]);

adminRouter.post("/hospitals", admin, postHospitals);
adminRouter.get("/hospitals", admin, getHospitals);

adminRouter.post("/doctors", admin, postDoctors);
adminRouter.get("/doctors", admin, getDoctors);

adminRouter.post("/medicines", admin, postMedicines);
adminRouter.get("/medicines", admin, getMedicines);


adminRouter.post("/patients", admin, postPatients);
adminRouter.get("/patients", admin, getPatients);
adminRouter.get("/stats", admin, getAdminStats);

adminRouter.get("/chart/patients-week", admin, getPatientsWeek);

adminRouter.get("/chart/doctor-hospital", admin, getDoctorHospitalChart);

adminRouter.get("/chart/medicines-types", admin, getMedicinesTypesChart);

export default adminRouter;
