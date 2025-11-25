import { useEffect, useState } from "react";
import api from "../../lib/api/axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import {
  ADMIN_CHART_DOCTOR_HOSPITAL_ENDPOINT,
  ADMIN_CHART_MEDICINCES_TYPES_ENDPOINT,
  ADMIN_CHART_PETIENTS_WEEK_API_ENDPOINT,
  ADMIN_STATS_API_ENDPOINT,
} from "../../lib/constants/apiRoute";

import type {
  CardData,
  DoctorAndHospitalType,
  medicinesType,
  StatsData,
} from "../../lib/interface/commonTypes";

import { headers } from "../../lib/util/commonFun";

import styles from "./AdminDashboard.module.css";

export default function AdminDashboard() {
  const [stats, setStats] = useState<StatsData>();
  const [weekData, setWeekData] = useState<any[]>();
  const [dhData, setDhData] = useState<DoctorAndHospitalType>();
  const [medTypeData, setMedTypeData] = useState<medicinesType>();

  const COLORS = ["#2563eb", "#10b981", "#f97316"];

  useEffect(() => {
    api.get(ADMIN_STATS_API_ENDPOINT, headers).then((r) => setStats(r.data.data));
    api.get(ADMIN_CHART_PETIENTS_WEEK_API_ENDPOINT, headers).then((r) => setWeekData(r.data.data));
    api.get(ADMIN_CHART_DOCTOR_HOSPITAL_ENDPOINT, headers).then((r) => setDhData(r.data.data));
    api.get(ADMIN_CHART_MEDICINCES_TYPES_ENDPOINT, headers).then((r) => setMedTypeData(r.data.data));
  }, []);

  if (!stats) return <p className={styles.loadingText}>Loading...</p>;

  const cards: CardData[] = [
    { label: "Hospitals", value: stats.hospitals },
    { label: "Doctors", value: stats.doctors },
    { label: "Medicines", value: stats.medicines },
    { label: "Total Patients", value: stats.patients },
    { label: "Today's Patients", value: stats.todaysPatients },
  ];

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.pageTitle}>Admin Dashboard</h1>

      <div className={styles.statsGrid}>
        {cards.map((c, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.statLabel}>{c.label}</div>
            <div className={styles.statValue}>{c.value ?? "-"}</div>
          </div>
        ))}
      </div>

      <div className={styles.chartCard}>
        <h2 className={styles.chartTitle}>Patients (Last 7 Days)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weekData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.chardCardContainer}>

      {dhData && (
        <div className={styles.chartCard}>
          <h2 className={styles.chartTitle}>Doctors vs Hospitals</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: "Doctors", value: dhData.doctors },
                  { name: "Hospitals", value: dhData.hospitals },
                ]}
                cx="50%"
                cy="50%"
                outerRadius={110}
                dataKey="value"
                label
              >
                <Cell fill={COLORS[0]} />
                <Cell fill={COLORS[1]} />
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {medTypeData && (
        <div className={styles.chartCard}>
          <h2 className={styles.chartTitle}>Medicine Type Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: "Tablet", value: medTypeData.tablet },
                  { name: "Syrup", value: medTypeData.syrup },
                  { name: "Injection", value: medTypeData.injection },
                ]}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
                label
              >
                <Cell fill={COLORS[0]} />
                <Cell fill={COLORS[1]} />
                <Cell fill={COLORS[2]} />
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      </div>
    </div>
  );
}
