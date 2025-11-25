import { useEffect, useState } from "react";
import api from "../../lib/api/axios";
import { ADMIN_HOSPITALS_ENDPOINT } from "../../lib/constants/apiRoute";
import { headers } from "../../lib/util/commonFun";
import type { Hospital, HospitalForm } from "../../lib/interface/commonTypes";

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "./Hospitals.module.css";

const schema: yup.ObjectSchema<HospitalForm> = yup.object({
  name: yup.string().required("Hospital name is required"),
  address: yup.string().required("Address is required"),
  phone: yup
    .string()
    .min(10, "Phone must be at least 10 digits")
    .required("Phone number is required"),
});

export default function Hospitals() {
  const [list, setList] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<HospitalForm>({
    resolver: yupResolver(schema),
    defaultValues: { name: "", address: "", phone: "" },
  });

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get(ADMIN_HOSPITALS_ENDPOINT, headers);console.log(res);
      

      setList(res.data.data || []);
    } catch {
      setError("Failed to load hospitals.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (data: HospitalForm) => {
    setSaving(true);
    setError("");

    try {
      await api.post(ADMIN_HOSPITALS_ENDPOINT, data, headers);
      reset();
      load();
    } catch {
      setError("Failed to add hospital.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.headerRow}>
        <LocalHospitalIcon className={styles.headerIcon} />
        <Typography variant="h4" className={styles.headerText}>
          Manage Hospitals
        </Typography>
      </Box>

      <Card className={styles.formCard}>
        <CardHeader
          title="Add New Hospital"
          titleTypographyProps={{ className: styles.cardTitle }}
        />
        <Divider />

        <CardContent>
          {error && <Alert severity="error">{error}</Alert>}

          <form onSubmit={handleSubmit(submit)} className={styles.form}>
            <TextField
              label="Hospital Name"
              fullWidth
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <TextField
              label="Address"
              fullWidth
              {...register("address")}
              error={!!errors.address}
              helperText={errors.address?.message}
            />

            <TextField
              label="Phone Number"
              fullWidth
              {...register("phone")}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={saving}
              className={styles.submitBtn}
            >
              {saving ? <CircularProgress size={22} color="inherit" /> : "Add Hospital"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className={styles.listCard}>
        <CardHeader
          title="Hospital List"
          titleTypographyProps={{ className: styles.cardTitle }}
        />
        <Divider />

        <CardContent>
          {loading ? (
            <Box className={styles.loaderBox}>
              <CircularProgress />
            </Box>
          ) : list.length === 0 ? (
            <Typography className={styles.noData}>No hospitals found.</Typography>
          ) : (
            <List className={styles.hospitalList}>
              {list && list.map((h) => (
                <ListItem key={h._id} className={styles.hospitalItem}>
                  <ListItemText
                    primary={<span className={styles.hospitalName}>{h.name}</span>}
                    secondary={
                      <div className={styles.hospitalDetails}>
                        <div>{h.address}</div>
                        <div>{h.phone}</div>
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
