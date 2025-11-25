import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function PrescriptionHistory() {
  const [list, setList] = useState([]);

  const load = async () => {
    const res = await api.get("/doctor/prescriptions");
    setList(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">Prescription History</h1>

      <div className="bg-white p-6 rounded shadow space-y-4">

        {list.length === 0 && <p>No prescriptions found</p>}

        {list.map((pres) => (
          <div
            key={pres._id}
            className="border p-4 rounded bg-gray-50 shadow-sm space-y-3"
          >
            {/* Patient */}
            <div className="flex justify-between items-center">
              <div className="text-lg font-semibold">
                {pres?.patient?.name}
              </div>

              <div className="text-sm text-gray-600">
                {new Date(pres.createdAt).toLocaleDateString()}
              </div>
            </div>

            {/* Medicines */}
            <div className="space-y-1 text-sm">
              {pres?.medicines.map((m, i) => (
                <div key={i} className="bg-white p-2 rounded border">
                  <b>{m.medicine.name}</b> ({m.medicine.strength})
                  <div className="text-gray-700">
                    Dosage: {m.dosage} • Duration: {m.duration}
                  </div>
                  {m.notes && (
                    <div className="text-gray-500">
                      Notes: {m.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}
