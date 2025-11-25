import { useEffect, useState, type JSX } from "react";
import api from "../../lib/api/axios";

import styles from "./RegisterPatient.module.css";

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";

import PersonAddIcon from "@mui/icons-material/PersonAdd";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { headers } from "../../lib/util/commonFun";

import {
  ADMIN_DOCTORS_ENDPOINT,
  ADMIN_HOSPITALS_ENDPOINT,
  ADMIN_PATIENTS_ENDPOINT,
} from "../../lib/constants/apiRoute";

// ---------------------------
// TYPES
// ---------------------------

interface Hospital {
  _id: string;
  name: string;
}

interface Doctor {
  _id: string;
  user: { name: string };
}

interface PatientForm {
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  phone: string;
  address: string;
  hospital: string;
  doctor: string;
  complaint: string;
}

// ---------------------------
// VALIDATION
// ---------------------------

const schema: yup.ObjectSchema<PatientForm> = yup.object({
  name: yup.string().required("Patient name is required"),
  age: yup.number().typeError("Age must be a number").required("Age is required"),
  gender: yup.mixed<"Male" | "Female" | "Other">().required("Gender is required"),
  phone: yup.string().required("Phone is required"),
  address: yup.string().required("Address is required"),
  hospital: yup.string().required("Select a hospital"),
  doctor: yup.string().required("Select a doctor"),
  complaint: yup.string().required("Complaint is required"),
});

// ---------------------------
// Component
// ---------------------------

export default function RegisterPatient(): JSX.Element {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [formLoading, setFormLoading] = useState(false);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<PatientForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      age: 0,
      gender: "" as "Male" | "Female" | "Other",
      phone: "",
      address: "",
      hospital: "",
      doctor: "",
      complaint: "",
    },
  });

  const selectedHospital = watch("hospital");

  // Load hospitals
  const loadHospitals = async () => {
    try {
      const res = await api.get(ADMIN_HOSPITALS_ENDPOINT, headers);
      if (res.data.success) setHospitals(res.data.data);
    } catch {
      setServerError("Failed to load hospitals");
    }
  };

  // Load doctors for selected hospital
  const loadDoctors = async (hospitalId: string) => {
    if (!hospitalId) return;
    setLoadingDoctors(true);

    try {
      const res = await api.get(
        `${ADMIN_DOCTORS_ENDPOINT}?hospital=${hospitalId}`,
        headers
      );

      if (res.data.success) setDoctors(res.data.data);
    } catch {
      setServerError("Failed to load doctors");
    } finally {
      setLoadingDoctors(false);
    }
  };

  useEffect(() => {
    loadHospitals();
  }, []);

  useEffect(() => {
    if (selectedHospital) loadDoctors(selectedHospital);
  }, [selectedHospital]);

  const submit = async (data: PatientForm) => {
    setFormLoading(true);
    setServerError("");

    try {
      await api.post(ADMIN_PATIENTS_ENDPOINT, data, headers);
      reset();
    } catch {
      setServerError("Failed to register patient");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <Box className={styles.container}>
      {/* Header */}
      <Typography variant="h4" className={styles.headerWrapper}>
        <PersonAddIcon sx={{ fontSize: 38 }} />
        Register Patient (Today's OPD)
      </Typography>

      {/* Form Card */}
      <Card className={styles.card}>
        <CardHeader title="Patient Registration" />
        <Divider />

        <CardContent>
          {serverError && <Alert severity="error">{serverError}</Alert>}

          <form onSubmit={handleSubmit(submit)} className={styles.formGrid}>
            <TextField
              label="Patient Name"
              fullWidth
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <TextField
              label="Age"
              type="number"
              fullWidth
              {...register("age")}
              error={!!errors.age}
              helperText={errors.age?.message}
            />

            {/* Gender */}
            <FormControl fullWidth error={!!errors.gender}>
              <InputLabel>Gender</InputLabel>
              <Select label="Gender" defaultValue="" {...register("gender")}>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>

              <Typography className={styles.errorText}>
                {errors.gender?.message}
              </Typography>
            </FormControl>

            <TextField
              label="Phone"
              fullWidth
              {...register("phone")}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />

            {/* Address */}
            <TextField
              label="Address"
              fullWidth
              multiline
              rows={2}
              className={styles.fullWidth}
              {...register("address")}
              error={!!errors.address}
              helperText={errors.address?.message}
            />

            {/* Hospital */}
            <FormControl fullWidth error={!!errors.hospital}>
              <InputLabel>Select Hospital</InputLabel>
              <Select label="Select Hospital" defaultValue="" {...register("hospital")}>
                {hospitals.map((h) => (
                  <MenuItem value={h._id} key={h._id}>
                    {h.name}
                  </MenuItem>
                ))}
              </Select>

              <Typography className={styles.errorText}>
                {errors.hospital?.message}
              </Typography>
            </FormControl>

            {/* Doctor */}
            <FormControl fullWidth error={!!errors.doctor}>
              <InputLabel>Select Doctor</InputLabel>
              <Select
                label="Select Doctor"
                defaultValue=""
                {...register("doctor")}
                disabled={loadingDoctors}
              >
                {doctors.map((d) => (
                  <MenuItem value={d._id} key={d._id}>
                    {d.user.name}
                  </MenuItem>
                ))}
              </Select>

              {loadingDoctors && (
                <CircularProgress size={20} className={styles.smallLoader} />
              )}

              <Typography className={styles.errorText}>
                {errors.doctor?.message}
              </Typography>
            </FormControl>

            {/* Complaint */}
            <TextField
              label="Complaint / Symptoms"
              multiline
              rows={3}
              fullWidth
              className={styles.fullWidth}
              {...register("complaint")}
              error={!!errors.complaint}
              helperText={errors.complaint?.message}
            />

            {/* Submit */}
            <Button
              type="submit"
              variant="contained"
              color="success"
              fullWidth
              sx={{ py: 1.3, fontWeight: "bold" }}
              disabled={formLoading}
            >
              {formLoading ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                "Register Patient"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
