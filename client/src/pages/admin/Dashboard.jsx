import { useEffect, useState } from "react";
import api from "../../lib/api/axios.js"

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [weekData, setWeekData] = useState([]);
  const [dhData, setDhData] = useState(null);
  const [medTypeData, setMedTypeData] = useState(null);

  const COLORS = ["#2563eb", "#10b981", "#f97316"];

  const headers = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  };

  useEffect(() => {
    api.get("/admin/stats", headers).then((r) => setStats(r.data));
    api.get("/admin/chart/patients-week", headers).then((r) => setWeekData(r.data));
    api.get("/admin/chart/doctor-hospital", headers).then((r) => setDhData(r.data));
    api.get("/admin/chart/medicines-types", headers).then((r) => setMedTypeData(r.data));
  }, []);

  if (!stats) return <p>Loading...</p>;

  const cards = [
    { label: "Hospitals", value: stats.hospitals },
    { label: "Doctors", value: stats.doctors },
    { label: "Medicines", value: stats.medicines },
    { label: "Total Patients", value: stats.patients },
    { label: "Today's Patients", value: stats.todaysPatients },
  ];

  return (
    <div className="space-y-10">

      {/* Stats Cards */}
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
        {cards.map((c, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded shadow text-center"
          >
            <div className="text-gray-500">{c.label}</div>
            <div className="text-3xl font-bold">{c.value}</div>
          </div>
        ))}
      </div>

      {/* Weekly Patients Chart */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Patients (Last 7 Days)</h2>
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

      {/* Doctors vs Hospitals Pie Chart */}
      {dhData && (
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Doctors vs Hospitals</h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: "Doctors", value: dhData.doctors },
                  { name: "Hospitals", value: dhData.hospitals },
                ]}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
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

      {/* Medicine Types Donut Chart */}
      {medTypeData && (
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Medicine Type Distribution</h2>

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
  );
}
