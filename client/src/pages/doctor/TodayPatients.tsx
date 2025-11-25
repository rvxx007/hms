import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../lib/api/axios";

export default function TodayPatients() {
  const [patients, setPatients] = useState([]);

  // Fetch today's patients
  const load = async () => {
    const res = await api.get("/doctor/today");
    setPatients(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">Today's Patients</h1>

      <div className="bg-white p-6 rounded shadow space-y-4">

        {patients.length === 0 && (
          <p className="text-gray-500">No patients registered today.</p>
        )}

        {patients.map((p) => (
          <div
            key={p._id}
            className="border p-4 rounded shadow-sm bg-gray-50"
          >
            <div className="text-lg font-semibold">{p.name}</div>

            <div className="flex gap-4 text-sm text-gray-700 mt-1">
              <div>Age: {p.age}</div>
              <div>Gender: {p.gender}</div>
              <div>Phone: {p.phone}</div>
            </div>

            <div className="mt-2 text-gray-700 text-sm">
              Complaint: <b>{p.complaint}</b>
            </div>

            <Link
              to={`/doctor/prescribe/${p._id}`}
              className="inline-block mt-3 bg-blue-600 text-white px-3 py-2 rounded"
            >
              Give Prescription →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
