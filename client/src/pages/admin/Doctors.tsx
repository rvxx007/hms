import { useEffect, useState } from "react";
import api from "../../lib/api/axios";

export default function Doctors() {
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    phone: "",
    hospital: ""
  });

  // Get hospitals + doctors
  const load = async () => {
    const hRes = await api.get("/admin/hospitals");
    setHospitals(hRes.data);

    const dRes = await api.get("/admin/doctors");
    setDoctors(dRes.data);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    await api.post("/admin/doctors", form);
    alert("Doctor added successfully");
    load();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manage Doctors</h1>

      {/* Doctor Form */}
      <form
        onSubmit={submit}
        className="bg-white p-6 rounded shadow space-y-4 w-full max-w-2xl"
      >
        <div className="grid grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Name"
            className="border p-2 rounded"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <input
            type="text"
            placeholder="Specialization"
            className="border p-2 rounded"
            onChange={(e) => setForm({ ...form, specialization: e.target.value })}
          />

          <input
            type="text"
            placeholder="Phone"
            className="border p-2 rounded"
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <select
            className="border p-2 rounded"
            onChange={(e) => setForm({ ...form, hospital: e.target.value })}
            required
          >
            <option value="">Select Hospital</option>
            {hospitals.map((h) => (
              <option value={h._id} key={h._id}>
                {h.name}
              </option>
            ))}
          </select>
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Add Doctor
        </button>
      </form>

      {/* Doctors List */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Doctors List</h2>

        <div className="space-y-4">
          {doctors.map((d) => (
            <div
              key={d._id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <div className="font-semibold text-lg">{d.user.name}</div>
                <div className="text-sm text-gray-600">
                  {d.specialization} — {d.phone}
                </div>
                <div className="text-sm text-gray-600">
                  Hospital: {d.hospital?.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
