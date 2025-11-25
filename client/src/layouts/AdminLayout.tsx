import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../hook/auth/useAuth";

import {
  Box,
  Paper,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Toolbar,
  AppBar,
  Typography,
  Divider,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import MedicationIcon from "@mui/icons-material/Medication";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LogoutIcon from "@mui/icons-material/Logout";

import AdminDashboard from "../pages/admin/AdminDashboard";
import styles from "./AdminLayout.module.css";

export default function AdminLayout() {
  const { logout } = useAuth();

  const menuItems = [
    { label: "Dashboard", path: "/admin", icon: <DashboardIcon /> },
    { label: "Hospitals", path: "/admin/hospitals", icon: <LocalHospitalIcon /> },
    { label: "Doctors", path: "/admin/doctors", icon: <MedicalServicesIcon /> },
    { label: "Medicines", path: "/admin/medicines", icon: <MedicationIcon /> },
    { label: "Register Patient", path: "/admin/register-patient", icon: <PersonAddAltIcon /> },
    { label: "All Patients", path: "/admin/patients", icon: <PeopleAltIcon /> },
  ];

  return (
    <Box className={styles.layoutWrapper}>
      <Paper elevation={3} className={styles.sidebar}>
        <Box className={styles.logoArea}>
          <LocalHospitalIcon className={styles.logoIcon} />
          <Typography variant="h5" className={styles.logoText}>
            Admin Panel
          </Typography>
        </Box>

        <Divider />

        <List className={styles.menuList}>
          {menuItems.map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              className={({ isActive }) =>
                isActive ? styles.menuItemActive : styles.menuItem
              }
            >
              <ListItemButton>
                <ListItemIcon className={styles.menuIcon}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </NavLink>
          ))}
        </List>

        <Divider />

        <Box className={styles.logoutWrapper}>
          <Button
            variant="contained"
            fullWidth
            color="error"
            startIcon={<LogoutIcon />}
            onClick={logout}
            className={styles.logoutBtn}
          >
            Logout
          </Button>
        </Box>
      </Paper>

      <Box className={styles.mainSection}>
        <AppBar position="sticky" elevation={1} className={styles.topBar}>
          <Toolbar className={styles.topBarInner}>
            <Typography variant="h6" className={styles.dashboardTitle}>
              HMS — Admin Dashboard
            </Typography>

            <Button
              variant="outlined"
              color="error"
              size="small"
              startIcon={<LogoutIcon />}
              onClick={logout}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        <Box className={styles.contentArea}>
          
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
