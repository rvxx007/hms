import { useEffect, useState, useCallback } from "react";
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
  MenuItem,
} from "@mui/material";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { headers } from "../../lib/util/commonFun";
import { ADMIN_PATIENTS_ENDPOINT } from "../../lib/constants/apiRoute";

import styles from "./TodayPatients.module.css";

interface Patient {
  _id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  address: string;
  complaint: string;
}

interface FilterForm {
  search: string;
  gender: string;
}

const schema = yup.object().shape({
  search: yup.string().optional().default(""),
  gender: yup.string().optional().default(""),
});

export default function DoctorTodayPatients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [allPatients, setAllPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState("");

  const { register, reset, handleSubmit } = useForm<FilterForm>({
    resolver: yupResolver(schema),
  });

  const loadPatients = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get(ADMIN_PATIENTS_ENDPOINT, headers);
      
      if (res.data.success) {
        setPatients(res.data.data);
        setAllPatients(res.data.data);
      }
    } catch {
      setServerError("Failed to fetch patients");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPatients();
  }, [loadPatients]);

  const applyFilters = (filters: FilterForm) => {
    let list = [...allPatients];

    if (filters.gender) list = list.filter((p) => p.gender === filters.gender);

    if (filters.search)
      list = list.filter((p) =>
        p.name.toLowerCase().includes(filters.search!.toLowerCase())
      );

    setPatients(list);
  };

  const clearFilters = () => {
    reset({ search: "", gender: "" });
    setPatients(allPatients);
  };

  return (
    <Box className={styles.wrapper}>
      <Typography variant="h4" className={styles.pageTitle}>
        <CalendarMonthIcon className={styles.pageIcon} />
        Today’s Patients
      </Typography>

      <Card className={styles.filterCard}>
        <CardHeader title="Filters" className={styles.filterHeader} />
        <Divider />

        <CardContent>
          <form onSubmit={handleSubmit(applyFilters)}>
            <div className={styles.filterRow}>
              <div className={styles.filterColumn}>
                <label className={styles.label}>Gender</label>
                <TextField select {...register("gender")} fullWidth size="small">
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </div>

              <div className={styles.filterColumn}>
                <TextField
                  label="Search Patient"
                  fullWidth
                  size="small"
                  {...register("search")}
                />
              </div>
            </div>

            <div className={styles.buttonRow}>
              <Button variant="contained" type="submit" className={styles.applyBtn}>
                Apply Filters
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                onClick={clearFilters}
                className={styles.clearBtn}
              >
                Clear Filters
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className={styles.listCard}>
        <CardHeader title="Patients Today" className={styles.listHeader} />
        <Divider />

        <CardContent>
          {serverError && <Alert severity="error">{serverError}</Alert>}

          {loading ? (
            <div className={styles.loaderBox}>
              <CircularProgress />
            </div>
          ) : patients.length === 0 ? (
            <Typography className={styles.noData}>No patients today.</Typography>
          ) : (
            <div className={styles.patientList}>
              {patients.map((p) => (
                <Card key={p._id} className={styles.patientCard}>
                  <Typography variant="h6" className={styles.patientName}>
                    {p.name} — Age {p.age}, {p.gender}
                  </Typography>

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
            </div>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
