import { useState, type JSX } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../hook/auth/useAuth";

import {
  Box,
  Drawer,
  IconButton,
  Button,
  Divider,
  Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import MedicationIcon from "@mui/icons-material/Medication";
import LogoutIcon from "@mui/icons-material/Logout";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

import styles from "./DoctorLayout.module.css";

export default function DoctorLayout(): JSX.Element {
  const { logout } = useAuth();
  const [open, setOpen] = useState<boolean>(false);

  const toggleSidebar = () => setOpen((prev) => !prev);

  const navItems = [
    { label: "Dashboard", to: "/doctor", icon: <DashboardIcon /> },
    { label: "Today's Patients", to: "/doctor/today", icon: <PeopleIcon /> },
    { label: "Prescriptions", to: "/doctor/prescriptions", icon: <MedicationIcon /> },
  ];

  return (
    <Box className={styles.layoutWrapper}>

      {/* MOBILE HEADER */}
      <Box className={styles.mobileHeader}>
        <div className={styles.mobileBrand}>
          <LocalHospitalIcon className={styles.brandIcon} />
          <Typography variant="h6" className={styles.brandTitle}>Doctor Panel</Typography>
        </div>

        <IconButton onClick={toggleSidebar}>
          <MenuIcon className={styles.menuIcon} />
        </IconButton>
      </Box>

      {/* DESKTOP SIDEBAR */}
      <Drawer
        variant="permanent"
        className={styles.desktopSidebar}
        PaperProps={{ className: styles.sidebarPaper }}
      >
        <Box className={styles.sidebarTop}>
          <div className={styles.brandRow}>
            <LocalHospitalIcon className={styles.brandIcon} />
            <Typography variant="h6" className={styles.brandTitle}>Doctor Panel</Typography>
          </div>

          <Divider className={styles.divider} />

          <nav className={styles.navMenu}>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive ? styles.navItemActive : styles.navItem
                }
              >
                <span className={styles.navIcon}>{item.icon}</span>
                <span className={styles.navLabel}>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </Box>

        <Box className={styles.sidebarBottom}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<LogoutIcon />}
            onClick={logout}
            className={styles.logoutButton}
          >
            Logout
          </Button>
        </Box>
      </Drawer>

      {/* MOBILE SIDEBAR */}
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleSidebar}
        PaperProps={{ className: styles.mobileSidebarPaper }}
      >
        <Box className={styles.mobileSidebarTop}>
          <div className={styles.brandRow}>
            <LocalHospitalIcon className={styles.brandIcon} />
            <Typography variant="h6" className={styles.brandTitle}>Doctor Panel</Typography>
          </div>

          <Divider />

          <nav className={styles.navMenu}>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  isActive ? styles.navItemActive : styles.navItem
                }
              >
                <span className={styles.navIcon}>{item.icon}</span>
                <span className={styles.navLabel}>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </Box>

        <Button
          fullWidth
          variant="contained"
          color="error"
          className={styles.logoutButtonMobile}
          onClick={logout}
        >
          Logout
        </Button>
      </Drawer>

      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </Box>
  );
}
