import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Medicines() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    name: "",
    genericName: "",
    strength: "",
    type: "",
    company: ""
  });

  // Load medicines
  const load = async () => {
    const res = await api.get("/admin/medicines");
    setList(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  // Handle submit
  const submit = async (e) => {
    e.preventDefault();
    await api.post("/admin/medicines", form);
    alert("Medicine added successfully");

    setForm({
      name: "",
      genericName: "",
      strength: "",
      type: "",
      company: "",
    });

    load();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manage Medicines</h1>

      {/* Medicine Form */}
      <form
        onSubmit={submit}
        className="bg-white p-6 rounded shadow w-full max-w-2xl space-y-4"
      >

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Medicine Name"
            className="border p-2 rounded"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            type="text"
            placeholder="Generic Name"
            className="border p-2 rounded"
            value={form.genericName}
            onChange={(e) => setForm({ ...form, genericName: e.target.value })}
          />

          <input
            type="text"
            placeholder="Strength (e.g. 500mg)"
            className="border p-2 rounded"
            value={form.strength}
            onChange={(e) => setForm({ ...form, strength: e.target.value })}
            required
          />

          <select
            className="border p-2 rounded"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            required
          >
            <option value="">Select Type</option>
            <option value="Tablet">Tablet</option>
            <option value="Syrup">Syrup</option>
            <option value="Injection">Injection</option>
          </select>

          <input
            type="text"
            placeholder="Company Name"
            className="border p-2 rounded col-span-2"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
          />
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Add Medicine
        </button>
      </form>

      {/* Medicine List */}
      <div className="bg-white p-6 rounded shadow space-y-4">

        <h2 className="text-xl font-semibold">Medicine List</h2>

        {list.length === 0 && <p>No medicines found</p>}

        {list.map((m) => (
          <div
            key={m._id}
            className="border p-4 rounded shadow-sm bg-gray-50"
          >
            <div className="font-semibold text-lg">
              {m.name} ({m.strength})
            </div>

            <div className="text-sm text-gray-700">
              {m.genericName} — {m.type}
            </div>

            <div className="text-sm text-gray-500">
              {m.company}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
