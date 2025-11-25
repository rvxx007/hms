import { useEffect, useState } from "react";
import api from "../../lib/api/axios";

export default function Hospitals() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [list, setList] = useState([]);

  // Fetch hospitals
  const load = async () => {
    const res = await api.get("/admin/hospitals");
    setList(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  // Create Hospital
  const submit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    await api.post("/admin/hospitals", {
      name,
      address,
      phone,
    });

    setName("");
    setAddress("");
    setPhone("");

    load();
  };

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">Manage Hospitals</h1>

      {/* Form */}
      <form
        onSubmit={submit}
        className="bg-white p-6 rounded shadow w-full max-w-xl space-y-4"
      >
        <input
          type="text"
          placeholder="Hospital Name"
          className="border p-2 w-full rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Address"
          className="border p-2 w-full rounded"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <input
          type="text"
          placeholder="Phone"
          className="border p-2 w-full rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Add Hospital
        </button>
      </form>

      {/* Hospital List */}
      <div className="bg-white p-6 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold">Hospital List</h2>

        {list.length === 0 && <p>No hospitals found</p>}

        {list.map((h) => (
          <div
            key={h._id}
            className="flex items-center justify-between border p-3 rounded"
          >
            <div>
              <div className="font-semibold">{h?.name}</div>
              <div className="text-sm text-gray-600">{h.address}</div>
              <div className="text-sm text-gray-600">{h.phone}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
