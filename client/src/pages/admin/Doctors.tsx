import { useEffect, useState } from "react";
import api from "../../lib/api/axios";
import styles from "./Doctors.module.css";

// Material UI
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PersonIcon from "@mui/icons-material/Person";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  ADMIN_DOCTORS_ENDPOINT,
  ADMIN_HOSPITALS_ENDPOINT,
} from "../../lib/constants/apiRoute";
import { headers } from "../../lib/util/commonFun";

// ---------------------------
// TYPES
// ---------------------------
interface DoctorForm {
  name: string;
  email: string;
  password: string;
  specialization: string;
  phone: string;
  hospital: string;
}

// ---------------------------
// VALIDATION
// ---------------------------
const schema: yup.ObjectSchema<DoctorForm> = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .min(6, "Min 6 characters")
    .required("Password is required"),
  specialization: yup.string().required("Specialization is required"),
  phone: yup
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone is required"),
  hospital: yup.string().required("Hospital selection is required"),
});

export default function Doctors() {
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DoctorForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      specialization: "",
      phone: "",
      hospital: "",
    },
  });

  // Load Data
  const load = async () => {
    try {
      setLoading(true);

      const hRes = await api.get(ADMIN_HOSPITALS_ENDPOINT, headers);
      setHospitals(hRes.data.data || []);
      
      const dRes = await api.get(ADMIN_DOCTORS_ENDPOINT, headers);
      setDoctors(dRes.data.data || []);
    } catch (err) {
      setError("Failed to load doctors or hospitals.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // Submit
  const submit = async (data: DoctorForm) => {
    setSaving(true);
    setError("");

    try {
      const resp = await api.post(ADMIN_DOCTORS_ENDPOINT, data, headers);
      if (resp.status === 201 || resp.status === 200) {
        reset();
        load();
      }
    } catch (err) {
      setError("Failed to add doctor.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box className={styles.container}>
      {/* HEADER */}
      <Typography variant="h4" className={styles.headerWrapper}>
        <MedicalServicesIcon sx={{ fontSize: 38 }} />
        Manage Doctors
      </Typography>

      {/* ADD DOCTOR FORM */}
      <Card className={styles.card}>
        <CardHeader title="Add Doctor" />
        <Divider />

        <CardContent>
          {error && <Alert severity="error">{error}</Alert>}

          <form onSubmit={handleSubmit(submit)} className={styles.formGrid}>
            <TextField
              label="Name"
              fullWidth
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <TextField
              label="Email"
              fullWidth
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <TextField
              label="Specialization"
              fullWidth
              {...register("specialization")}
              error={!!errors.specialization}
              helperText={errors.specialization?.message}
            />

            <TextField
              label="Phone"
              fullWidth
              {...register("phone")}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />

            <FormControl fullWidth error={!!errors.hospital}>
              <InputLabel>Hospital</InputLabel>
              <Select label="Hospital" defaultValue="" {...register("hospital")}>
                {hospitals.map((h) => (
                  <MenuItem key={h._id} value={h._id}>
                    {h.name}
                  </MenuItem>
                ))}
              </Select>

              <Typography className={styles.errorText}>
                {errors.hospital?.message}
              </Typography>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ py: 1.4, fontWeight: 700 }}
              disabled={saving}
            >
              {saving ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Add Doctor"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* DOCTORS LIST */}
      <Card className={styles.card}>
        <CardHeader title="Doctors List" />
        <Divider />

        <CardContent>
          {loading ? (
            <div className={styles.centered}>
              <CircularProgress />
            </div>
          ) : doctors && doctors.length === 0 ? (
            <Typography className={styles.mutedText}>
              No doctors found.
            </Typography>
          ) : (
            <List className={styles.doctorList}>
              {doctors && doctors?.map((d) => (
                <ListItem key={d._id} className={styles.doctorItem}>
                  <ListItemText
                    primary={
                      <Typography sx={{ fontWeight: 600, display: "flex", alignItems: "center", gap: "8px" }}>
                        <PersonIcon color="primary" />
                        {d.user.name}
                      </Typography>
                    }
                    secondary={
                      <div>
                        <div>Specialization: {d.specialization}</div>
                        <div>Phone: {d.phone}</div>
                        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                          <LocalHospitalIcon sx={{ fontSize: 18 }} />
                          {d.hospital?.name}
                        </div>
                      </div>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
