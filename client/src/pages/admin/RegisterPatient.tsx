import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function RegisterPatient() {
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    hospital: "",
    doctor: "",
    complaint: ""
  });

  // Load hospitals initially
  useEffect(() => {
    api.get("/admin/hospitals").then((res) => setHospitals(res.data));
  }, []);

  // Load doctors when hospital changes
  const loadDoctors = async (hospitalId) => {
    const res = await api.get(`/admin/doctors?hospital=${hospitalId}`);
    setDoctors(res.data);
  };

  const submit = async (e) => {
    e.preventDefault();

    await api.post("/admin/patients", form);

    alert("Patient registered successfully");

    setForm({
      name: "",
      age: "",
      gender: "",
      phone: "",
      address: "",
      hospital: "",
      doctor: "",
      complaint: ""
    });
  };

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">Register Patient (Today's OPD)</h1>

      {/* Form */}
      <form
        onSubmit={submit}
        className="bg-white p-6 rounded shadow space-y-4 max-w-2xl"
      >
        <div className="grid grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Patient Name"
            className="border p-2 rounded"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            type="number"
            placeholder="Age"
            className="border p-2 rounded"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            required
          />

          <select
            className="border p-2 rounded"
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <input
            type="text"
            placeholder="Phone"
            className="border p-2 rounded"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />

          <input
            type="text"
            placeholder="Address"
            className="border p-2 rounded col-span-2"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />

          <select
            className="border p-2 rounded"
            value={form.hospital}
            onChange={(e) => {
              setForm({ ...form, hospital: e.target.value });
              loadDoctors(e.target.value);
            }}
            required
          >
            <option value="">Select Hospital</option>
            {hospitals.map((h) => (
              <option value={h._id} key={h._id}>
                {h.name}
              </option>
            ))}
          </select>

          <select
            className="border p-2 rounded"
            value={form.doctor}
            onChange={(e) => setForm({ ...form, doctor: e.target.value })}
            required
          >
            <option value="">Select Doctor</option>
            {doctors.map((d) => (
              <option value={d._id} key={d._id}>
                {d.user.name}
              </option>
            ))}
          </select>

          <textarea
            placeholder="Complaint / Symptoms"
            className="border p-2 rounded col-span-2"
            value={form.complaint}
            onChange={(e) => setForm({ ...form, complaint: e.target.value })}
            required
          />
        </div>

        <button className="bg-green-600 text-white px-4 py-2 rounded w-full">
          Register Patient
        </button>
      </form>

    </div>
  );
}
