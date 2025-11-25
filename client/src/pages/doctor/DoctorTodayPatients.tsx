import { useEffect, useState, useCallback, type JSX } from "react";
import api from "../../lib/api/axios";

import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  TextField,
  CircularProgress,
  Divider,
  Button,
  Alert,
} from "@mui/material";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";

import { useForm, type SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { DOCTOR_TODAYS_PATIENTS_ENDPOINT } from "../../lib/constants/apiRoute";

import styles from "./DoctorTodayPatients.module.css";
import { headers } from "../../lib/util/commonFun";

interface Patient {
  _id: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  phone: string;
  address: string;
  complaint: string;
}

interface FilterForm {
  search?: string;
  gender?: string;
}

const schema: yup.ObjectSchema<FilterForm> = yup.object({
  search: yup.string().optional(),
  gender: yup.string().optional(),
});

export default function DoctorTodayPatients(): JSX.Element {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [originalPatients, setOriginalPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState("");

  const { register, reset, handleSubmit } = useForm<FilterForm>({
    resolver: yupResolver(schema),
    defaultValues: { search: "", gender: "" },
  });

  const loadTodayPatients = useCallback(async () => {
    try {
      setLoading(true);

      const res = await api.get(DOCTOR_TODAYS_PATIENTS_ENDPOINT, headers);
      
      if (res.data.success) {
        setPatients(res.data.data);
        setOriginalPatients(res.data.data);
      }
    } catch {
      setServerError("Failed to load today’s patients.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTodayPatients();
  }, [loadTodayPatients]);

  const onFilter: SubmitHandler<FilterForm> = (filters) => {
    let filtered = [...originalPatients];

    if (filters.gender)
      filtered = filtered.filter((p) => p.gender === filters.gender);

    if (filters.search)
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(filters.search?.toLowerCase() || "")
      );

    setPatients(filtered);
  };

  const clearFilters = () => {
    reset({ search: "", gender: "" });
    setPatients(originalPatients);
  };

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.pageTitle}>
        <CalendarMonthIcon className={styles.pageIcon} />
        <Typography variant="h4">Today's Patients</Typography>
      </Box>

      <Card className={styles.filterCard}>
        <CardHeader title="Filters" className={styles.filterHeader} />
        <Divider />

        <CardContent>
          <form onSubmit={handleSubmit(onFilter)}>
            <Box className={styles.filterRow}>
              <Box className={styles.filterColumn}>
                <label className={styles.label}>Gender</label>
                <select {...register("gender")} className={styles.select}>
                  <option value="">All</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </Box>

              <Box className={styles.filterColumn}>
                <TextField fullWidth label="Search patient" {...register("search")} />
              </Box>
            </Box>

            <Box className={styles.buttonRow}>
              <Button type="submit" variant="contained" className={styles.applyBtn}>
                Apply Filters
              </Button>

              <Button
                type="button"
                variant="outlined"
                className={styles.clearBtn}
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>

      <Card className={styles.listCard}>
        <CardHeader title="Patients Today" className={styles.listHeader} />
        <Divider />

        <CardContent>
          {serverError && <Alert severity="error">{serverError}</Alert>}

          {loading ? (
            <Box className={styles.loaderBox}>
              <CircularProgress />
            </Box>
          ) : patients.length === 0 ? (
            <Typography className={styles.noData}>No patients for today</Typography>
          ) : (
            <Box className={styles.patientList}>
              {patients.map((p) => (
                <Card key={p._id} className={styles.patientCard}>
                  <Box className={styles.patientHeader}>
                    <Typography variant="h6" className={styles.patientName}>
                      {p.name} — Age {p.age}, {p.gender}
                    </Typography>
                    <PersonIcon className={styles.personIcon} />
                  </Box>

                  <Typography className={styles.detailText}>
                    <strong>Complaint:</strong> {p.complaint}
                  </Typography>

                  <Typography className={styles.detailText}>
                    <strong>Phone:</strong> {p.phone}
                  </Typography>

                  <Typography className={styles.detailSub}>
                    <strong>Address:</strong> {p.address}
                  </Typography>
                </Card>
              ))}
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
