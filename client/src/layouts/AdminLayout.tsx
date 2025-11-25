import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../hook/auth/useAuth";

export default function AdminLayout() {
  const { logout } = useAuth();

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-white p-6 border-r space-y-4">
        <h2 className="text-xl font-bold">Admin Panel</h2>

        <nav className="space-y-2">
          <Link to="/admin" className="block p-2">Dashboard</Link>
          <Link to="/admin/hospitals" className="block p-2">Hospitals</Link>
          <Link to="/admin/doctors" className="block p-2">Doctors</Link>
          <Link to="/admin/medicines" className="block p-2">Medicines</Link>
          <Link to="/admin/register-patient" className="block p-2">Register Patient</Link>
          <Link to="/admin/patients" className="block p-2">All Patients</Link>
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
