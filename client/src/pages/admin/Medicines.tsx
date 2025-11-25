import { useEffect, useState, type JSX } from "react";
import api from "../../lib/api/axios";
import styles from "./Medicines.module.css";

// Material UI
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
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import MedicationIcon from "@mui/icons-material/Medication";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";

// RHF + Yup
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ADMIN_MEDICINES_ENDPOINT } from "../../lib/constants/apiRoute";
import { headers } from "../../lib/util/commonFun";

// ----------------------------------------------------
// TYPES
// ----------------------------------------------------

export interface Medicine {
  _id: string;
  name: string;
  genericName: string;
  strength: string;
  type: "Tablet" | "Syrup" | "Injection";
  company: string;
}

interface MedicineForm {
  name: string;
  genericName: string;
  strength: string;
  type: Medicine["type"];
  company: string;
}

// ----------------------------------------------------
// VALIDATION
// ----------------------------------------------------

const schema: yup.ObjectSchema<MedicineForm> = yup.object({
  name: yup.string().required("Medicine name is required"),
  genericName: yup.string().required("Generic name is required"),
  strength: yup.string().required("Strength is required"),
  type: yup
    .mixed<Medicine["type"]>()
    .oneOf(["Tablet", "Syrup", "Injection"])
    .required("Type is required"),
  company: yup.string().required("Company is required"),
});

// ----------------------------------------------------
// COMPONENT
// ----------------------------------------------------

export default function Medicines(): JSX.Element {
  const [list, setList] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MedicineForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      genericName: "",
      strength: "",
      type: "" as Medicine["type"],
      company: "",
    },
  });

  // Load medicines
  const load = async (): Promise<void> => {
    try {
      setLoading(true);
      const res = await api.get(ADMIN_MEDICINES_ENDPOINT, headers);

      if (res.data?.success) {
        setList(res.data.data);
      }
    } catch (err) {
      setError("Failed to load medicines.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // Submit
  const submit = async (data: MedicineForm) => {
    setSaving(true);
    setError("");

    try {
      await api.post(ADMIN_MEDICINES_ENDPOINT, data, headers);

      reset();
      load();
    } catch (err) {
      setError("Failed to add medicine.");
    } finally {
      setSaving(false);
    }
  };

  // ----------------------------------------------------
  // UI
  // ----------------------------------------------------

  return (
    <Box className={styles.container}>
      {/* PAGE HEADER */}
      <Typography variant="h4" className={styles.headerWrapper}>
        <MedicationIcon sx={{ fontSize: 38 }} />
        Manage Medicines
      </Typography>

      {/* ADD MEDICINE FORM */}
      <Card className={styles.card}>
        <CardHeader title="Add Medicine" />
        <Divider />

        <CardContent>
          {error && <Alert severity="error">{error}</Alert>}

          <form onSubmit={handleSubmit(submit)} className={styles.formGrid}>
            <TextField
              label="Medicine Name"
              fullWidth
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <TextField
              label="Generic Name"
              fullWidth
              {...register("genericName")}
              error={!!errors.genericName}
              helperText={errors.genericName?.message}
            />

            <TextField
              label="Strength (e.g., 500mg)"
              fullWidth
              {...register("strength")}
              error={!!errors.strength}
              helperText={errors.strength?.message}
            />

            <FormControl fullWidth error={!!errors.type}>
              <InputLabel>Type</InputLabel>
              <Select label="Type" defaultValue="" {...register("type")}>
                <MenuItem value="Tablet">Tablet</MenuItem>
                <MenuItem value="Syrup">Syrup</MenuItem>
                <MenuItem value="Injection">Injection</MenuItem>
              </Select>

              <Typography className={styles.errorText}>
                {errors.type?.message}
              </Typography>
            </FormControl>

            <TextField
              label="Company Name"
              fullWidth
              {...register("company")}
              error={!!errors.company}
              helperText={errors.company?.message}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ py: 1.3, fontWeight: "bold" }}
              disabled={saving}
            >
              {saving ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                "Add Medicine"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* MEDICINE LIST */}
      <Card className={styles.card}>
        <CardHeader title="Medicine List" />
        <Divider />

        <CardContent>
          {loading ? (
            <div className={styles.center}>
              <CircularProgress />
            </div>
          ) : list.length === 0 ? (
            <Typography className={styles.muted}>No medicines found.</Typography>
          ) : (
            <List className={styles.list}>
              {list.map((m: Medicine) => (
                <ListItem key={m._id} className={styles.listItem}>
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: "1.1rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <LocalPharmacyIcon color="primary" />
                        {m.name} ({m.strength})
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography>{m.genericName} — {m.type}</Typography>
                        <Typography sx={{ fontSize: "0.9rem", color: "#4b5563" }}>
                          {m.company}
                        </Typography>
                      </>
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
