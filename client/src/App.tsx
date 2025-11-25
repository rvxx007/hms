import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import ProtectedRoute from "./auth/ProtectedRoute"

// import { Navigate } from "react-router-dom";
// import AdminLayout from "./layouts/AdminLayout";
// import DoctorLayout from "./layouts/DoctorLayout";
// import Login from "./pages/Login";
import WelcomeScreen from "./componenets/WelcomeScreen/WelcomeScreen";
import Login from "./pages/Login";

// export function ProtectedRoute({ children, role }) {
//   const token = localStorage.getItem("token");
//   const userRole = localStorage.getItem("role");

//   if (!token) return <Navigate to="/login" />;

//   if (role && userRole !== role) return <Navigate to="/login" />;

//   return children;
// }

const router = createBrowserRouter([
   { path: "/", element: <WelcomeScreen /> },
  { path: "/login", element: <Login /> },

  // {
  //   path: "/admin",
  //   element: (
  //     <ProtectedRoute role="admin">
  //       <AdminLayout />
  //     </ProtectedRoute>
  //   ),
  //   children: [
  //     { path: "", element: <AdminDashboard /> },
  //     // Add all admin pages
  //   ],
  // },

  // {
  //   path: "/doctor",
  //   element: (
  //     <ProtectedRoute role="doctor">
  //       <DoctorLayout />
  //     </ProtectedRoute>
  //   ),
  //   children: [
  //     { path: "", element: <DoctorDashboard /> },
  //     // Add all doctor pages
  //   ],
  // },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
