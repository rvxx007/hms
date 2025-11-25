import { useEffect, useState, type JSX } from "react";
import api from "../../lib/api/axios";
import styles from "./PrescriptionHistory.module.css";

import { Card, Typography, CircularProgress, Alert } from "@mui/material";
import { DOCTOR_PRES_HISTORY_ENDPOINT } from "../../lib/constants/apiRoute";
import { headers } from "../../lib/util/commonFun";

interface Patient {
  _id: string;
  name: string;
  age: number;
  gender: string;
}

export default function PrescriptionHistory(): JSX.Element {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const loadHistory = async () => {
      try {
        setLoading(true);
        const res = await api.get(DOCTOR_PRES_HISTORY_ENDPOINT, headers);

        if (res.data.success) {
          setPatients(res.data.data);
        } else {
          setError("Unable to fetch history.");
        }
      } catch {
        setError("Failed to load prescription history.");
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  return (
    <div className={styles.wrapper}>
      <Typography variant="h4" className={styles.heading}>
        Prescription History
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      {loading ? (
        <div className={styles.loaderBox}>
          <CircularProgress />
        </div>
      ) : patients.length === 0 ? (
        <Typography className={styles.noData}>No history found.</Typography>
      ) : (
        <div className={styles.list}>
          {patients.map((p) => (
            <Card key={p._id} className={styles.patientCard}>
              <Typography variant="h6" className={styles.patientName}>
                {p.name}
              </Typography>
              <p className={styles.patientInfo}>
                Age {p.age} — {p.gender}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
