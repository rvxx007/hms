import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../lib/api/axios";

export default function PrescriptionForm() {
  const { patientId } = useParams();
  const navigate = useNavigate();

  const [medicinesList, setMedicinesList] = useState([]);
  const [items, setItems] = useState([
    { medicine: "", dosage: "", duration: "", notes: "" }
  ]);

  // Fetch medicines
  useEffect(() => {
    api.get("/doctor/medicines").then((res) => setMedicinesList(res.data));
  }, []);

  // Add prescription row
  const addRow = () => {
    setItems([...items, { medicine: "", dosage: "", duration: "", notes: "" }]);
  };

  // Update a row
  const updateRow = (index, key, value) => {
    const updated = [...items];
    updated[index][key] = value;
    setItems(updated);
  };

  // Submit prescription
  const submit = async (e) => {
    e.preventDefault();

    await api.post(`/doctor/prescribe/${patientId}`, {
      medicines: items,
    });

    alert("Prescription saved!");
    navigate("/doctor/today");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Prescription</h1>

      <form onSubmit={submit} className="space-y-6">

        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded shadow space-y-3"
          >

            <select
              className="border p-2 w-full rounded"
              onChange={(e) => updateRow(index, "medicine", e.target.value)}
              required
            >
              <option value="">Select Medicine</option>
              {medicinesList.map((m) => (
                <option key={m._id} value={m._id}>
                  {m.name} ({m.strength})
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Dosage (e.g. 1-0-1)"
              className="border p-2 w-full rounded"
              onChange={(e) => updateRow(index, "dosage", e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Duration (e.g. 5 days)"
              className="border p-2 w-full rounded"
              onChange={(e) => updateRow(index, "duration", e.target.value)}
              required
            />

            <textarea
              placeholder="Notes"
              className="border p-2 w-full rounded"
              onChange={(e) => updateRow(index, "notes", e.target.value)}
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addRow}
          className="bg-gray-700 text-white px-4 py-2 rounded"
        >
          + Add Medicine
        </button>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Submit Prescription
        </button>
      </form>
    </div>
  );
}
