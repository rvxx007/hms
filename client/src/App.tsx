import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import type { JSX } from "react";

import WelcomeScreen from "./componenets/WelcomeScreen/WelcomeScreen";
import Login from "./pages/Login";

// Layouts
import AdminLayout from "./layouts/AdminLayout";
import DoctorLayout from "./layouts/DoctorLayout";

// Types
import type { Role } from "./lib/interface/commonTypes";

// Admin Pages
import Hospitals from "./pages/admin/Hospitals";
import Doctors from "./pages/admin/Doctors";
import Medicines from "./pages/admin/Medicines";
import RegisterPatient from "./pages/admin/RegisterPatient";
import AllPatients from "./pages/admin/AllPatients";
import DoctorTodayPatients from "./pages/doctor/DoctorTodayPatients";
import DoctorPrescriptionPage from "./pages/doctor/DoctorPrescriptionPage";
import DoctorPrescriptionHistory from "./pages/doctor/DoctorPrescriptionHistory";
import AdminDashboard from "./pages/admin/AdminDashboard";


// -----------------------------------------------------
// 🔐 PROTECTED ROUTES
// -----------------------------------------------------
export function ProtectedRoute({
  children,
  role,
}: {
  children: JSX.Element;
  role?: Role;
}) {
  const token = Cookies.get("token");
  const userRole = localStorage.getItem("role") as Role | null;

  if (!token) return <Navigate to="/login" replace />;
  if (role && userRole !== role) return <Navigate to="/login" replace />;

  return children;
}

// -----------------------------------------------------
// 🌐 PUBLIC ROUTE (prevent login page when logged in)
// -----------------------------------------------------
function PublicRoute({ children }: { children: JSX.Element }) {
  const token = Cookies.get("token");

  if (token) {
    const storedRole = localStorage.getItem("role");
    return <Navigate to={storedRole === "admin" ? "/admin" : "/doctor"} replace />;
  }

  return children;
}

// -----------------------------------------------------
// 🚀 ROUTER CONFIG
// -----------------------------------------------------
const router = createBrowserRouter([
  { path: "/", element: <WelcomeScreen /> },

  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },

  // --------------------- ADMIN ROUTES ---------------------
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "hospitals", element: <Hospitals /> },
      { path: "doctors", element: <Doctors /> },
      { path: "medicines", element: <Medicines /> },
      { path: "register-patient", element: <RegisterPatient /> },
      { path: "patients", element: <AllPatients /> },
    ],
  },

  // --------------------- DOCTOR ROUTES ---------------------
  {
    path: "/doctor",
    element: (
      <ProtectedRoute role="doctor">
        <DoctorLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/doctor/today" replace /> },

      { path: "today", element: <DoctorTodayPatients /> },

      { path: "prescribe/:patientId", element: <DoctorPrescriptionPage /> },

      { path: "prescriptions", element: <DoctorPrescriptionHistory /> },
    ],
  },

  // --------------------- 404 PAGE ---------------------
  {
    path: "*",
    element: (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "28px",
          fontWeight: 700,
          color: "#374151",
        }}
      >
        404 — Page Not Found
      </div>
    ),
  },
]);

// -----------------------------------------------------
// APP WRAPPER
// -----------------------------------------------------
export default function App() {
  return <RouterProvider router={router} />;
}
