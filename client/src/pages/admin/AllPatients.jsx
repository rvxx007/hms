import { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function AllPatients() {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get("/admin/patients", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(res => setList(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold">All Patients</h2>

      <div className="mt-4 space-y-4">
        {list.map(p => (
          <div key={p._id} className="border p-4 rounded">
            <strong>{p.name}</strong> (Age {p.age}, {p.gender})
            <div>Hospital: {p.hospital?.name}</div>
            <div>Doctor: {p.doctor?.user?.name}</div>
            <div>Complaint: {p.complaint}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
