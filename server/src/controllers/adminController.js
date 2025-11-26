import User from "../models/User.js";
import Doctor from "../models/Doctor.js";
import Hospital from "../models/Hospital.js";
import Medicine from "../models/Medicine.js";
import Patient from "../models/Patient.js";
import { hashedPassword } from "../lib/util/commonFun.js";
import {
  send2xxSuccessResponse,
  send4xxClientErrorResponse,
} from "req-res-handlers";

export const postHospitals = async (req, res) => {
  try {
    const hospital = await Hospital.create(req.body);
    return send2xxSuccessResponse(
      res,
      200,
      "hospital record created successfully",
      hospital
    );
  } catch (err) {
    return send4xxClientErrorResponse(
      res,
      400,
      "Error creating hospital record",
      { error: err.message }
    );
  }
};

export const getHospitals = async (req, res) => {
  try {
    const { id, name,email } = req.query;
    
    let hospital;
    if (id) {
      hospital = await Hospital.findById(id);
    } else if (name) {
      hospital = await Hospital.findOne({ name: name });
    } else if (email) {
      hospital = await Hospital.findOne({ email: email });
    } else {
      hospital = await Hospital.find();
    }

    return send2xxSuccessResponse(
      res,
      200,
      "hospitals fetched successfully",
      hospital
    );
  } catch (err) {
    return send4xxClientErrorResponse(res, 400, "Error fetching hospitals", {
      error: err.message,
    });
  }
};

export const postDoctors = async (req, res) => {
  try {
    const { name, email, password, specialization, phone, hospital } = req.body;

    const hashed = await hashedPassword(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role: "doctor",
    });

    const doctor = await Doctor.create({
      user: user._id,
      specialization,
      phone,
      hospital,
    });

    return send2xxSuccessResponse(
      res,
      200,
      "doctors record created succesfully",
      { user, doctor }
    );
  } catch (err) {
    return send4xxClientErrorResponse(
      res,
      400,
      "Error creating doctor record",
      { error: err.message }
    );
  }
};

export const getDoctors = async (req, res) => {
  try {
    const { name, email, id } = req.query;

    let doctor;
    if (id) {
      doctor = await Doctor.findById(id);
    } else if (name) {
      doctor = await Doctor.findOne({ name: name });
    } else if (email) {
      doctor = await Doctor.findOne({ email: email });
    } else {
      doctor = await Doctor.find();
    }

    return send2xxSuccessResponse(
      res,
      200,
      "doctors record fetched successfully",
       doctor 
    );
  } catch (err) {
    return send4xxClientErrorResponse(
      res,
      400,
      "Error while fetching doctor record",
      { error: err.message }
    );
  }
};

export const postMedicines = async (req, res) => {
  try {
    const medicine = await Medicine.create(req.body);
    return send2xxSuccessResponse(
      res,
      200,
      "medicine record created successfully",
      medicine
    );
  } catch (err) {
    return send4xxClientErrorResponse(
      res,
      400,
      "Error creating medicine record",
      { error: err.message }
    );
  }
};

export const getMedicines = async (req, res) => {
  try {
    const { name, genericName, type, company } = req.query;

    const query = {};

    // Using Regex for "Like" search (Case-insensitive)
    if (name) {
      query.name = { $regex: name, $options: "i" };
    }
    if (genericName) {
      query.genericName = { $regex: genericName, $options: "i" };
    }
    if (type) {
      query.type = { $regex: type, $options: "i" };
    }
    if (company) {
      query.company = { $regex: company, $options: "i" };
    }

    const medicines = await Medicine.find(query).lean();

    return send2xxSuccessResponse(
      res,
      200,
      "Medicines fetched successfully",
      medicines
    );
  } catch (err) {
    console.error("Get Medicines Error:", err);
    
    return send4xxClientErrorResponse(
      res, 
      500, 
      "Error fetching medicines", 
      { error: err.message }
    );
  }
};

export const postPatients = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    return send2xxSuccessResponse(
      res,
      200,
      "patient record created successfully",
      patient
    );
  } catch (err) {
    return send4xxClientErrorResponse(
      res,
      400,
      "Error creating patient record",
      { error: err.message }
    );
  }
};

export const getPatients = async (req, res) => {
  const patients = await Patient.find().populate("doctor").populate("hospital");
  return send2xxSuccessResponse(
    res,
    200,
    "patients fetched successfully",
    patients
  );
};

export const getAdminStats = async (req, res) => {
  const hospitals = await Hospital.countDocuments();
  const doctors = await Doctor.countDocuments();
  const medicines = await Medicine.countDocuments();
  const patients = await Patient.countDocuments();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todaysPatients = await Patient.countDocuments({
    registrationDate: { $gte: today },
  });

  if (!hospitals && !doctors && !medicines && !patients && !todaysPatients) {
    return send4xxClientErrorResponse(res, 400, "No stats available", {
      message: "No stats available",
    });
  }

  return send2xxSuccessResponse(res, 200, "Admin stats fetched successfully", {
    hospitals,
    doctors,
    medicines,
    patients,
    todaysPatients,
  });
};

export const getPatientsWeek = async (req, res) => {
  const results = [];

  for (let i = 6; i >= 0; i--) {
    const start = new Date();
    start.setDate(start.getDate() - i);
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setHours(23, 59, 59, 999);

    const count = await Patient.countDocuments({
      registrationDate: { $gte: start, $lte: end },
    });

    results.push({
      date: start.toLocaleDateString("en-IN", { weekday: "short" }),
      count,
    });
  }

  return send2xxSuccessResponse(
    res,
    200,
    "Patients week data fetched successfully",
    results
  );
};

export const getDoctorHospitalChart = async (req, res) => {
  const doctors = await Doctor.countDocuments();
  const hospitals = await Hospital.countDocuments();
  return send2xxSuccessResponse(
    res,
    200,
    "Doctor-Hospital chart data fetched successfully",
    { doctors, hospitals }
  );
};

export const getMedicinesTypesChart = async (req, res) => {
  const tablet = await Medicine.countDocuments({ type: "Tablet" });
  const syrup = await Medicine.countDocuments({ type: "Syrup" });
  const injection = await Medicine.countDocuments({ type: "Injection" });

  return send2xxSuccessResponse(
    res,
    200,
    "Medicines types chart data fetched successfully",
    { tablet, syrup, injection }
  );
};
