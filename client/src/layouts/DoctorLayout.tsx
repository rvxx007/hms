import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../hook/auth/useAuth";

export default function DoctorLayout() {
  const { logout } = useAuth();

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-white p-6 border-r space-y-4">
        <h2 className="text-xl font-bold">Doctor Panel</h2>

        <nav className="space-y-2">
          <Link to="/doctor" className="block p-2">Dashboard</Link>
          <Link to="/doctor/today" className="block p-2">Today's Patients</Link>
          <Link to="/doctor/prescriptions" className="block p-2">Prescriptions</Link>
        </nav>

        <button
          onClick={logout}
          className="mt-5 w-full bg-red-600 text-white py-2 rounded"
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 p-8 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}
