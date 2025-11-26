import type { JSX } from "react";
import { Button, Card, CardContent, Typography, Box } from "@mui/material";

import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import SettingsIcon from "@mui/icons-material/Settings";

export default function WelcomeScreen(): JSX.Element {
  const features = [
    {
      icon: <PeopleAltIcon sx={{ fontSize: 48, color: "#3b82f6" }} />,
      title: "Patient Management",
      description: "Seamless patient registration, history, and OPD flow.",
    },
    {
      icon: <MedicalServicesIcon sx={{ fontSize: 48, color: "#10b981" }} />,
      title: "Doctor Tools",
      description: "Diagnostics, scheduling & prescription workflows.",
    },
    {
      icon: <SettingsIcon sx={{ fontSize: 48, color: "#f59e0b" }} />,
      title: "Admin Operations",
      description: "Billing, HR, inventory & hospital configuration.",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        position: "relative",
        background: "linear-gradient(to bottom right, #eef4ff 0%, #e0e7ff 100%)",
        padding: "0",
        margin: "0",
        overflow: "hidden",
      }}
    >
      <Box
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "60px 20px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4rem",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              maxWidth: "900px",
              gap: "3rem",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                textAlign: "center",
              }}
            >
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "1rem",
                  alignItems: "center",
                }}
              >
                <LocalHospitalIcon sx={{ fontSize: 60, color: "#2563eb" }} />
                <Typography
                  variant="h3"
                  style={{
                    color: "#1e3a8a",
                    fontWeight: 800,
                    letterSpacing: "1px",
                  }}
                >
                  HMS
                </Typography>
              </Box>

              <Typography
                variant="h4"
                style={{
                  fontWeight: 800,
                  color: "#1f2937",
                  maxWidth: "700px",
                  margin: "0 auto",
                  lineHeight: "1.3",
                }}
              >
                Modern,{" "}
                <span style={{ color: "#2563eb" }}>Intuitive</span> & Intelligent
                Hospital Management
              </Typography>

              <Typography
                variant="body1"
                style={{
                  color: "#4b5563",
                  maxWidth: "600px",
                  margin: "0 auto",
                  fontSize: "1.1rem",
                  lineHeight: "1.6",
                }}
              >
                Manage administration, OPD, patients, billing, doctors, and hospital workflow in
                one powerful system.
              </Typography>

              <Box
                style={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "1.2rem",
                  flexWrap: "wrap",
                }}
              >
                <Button
                  variant="contained"
                  href="/login"
                  sx={{
                    px: 4,
                    py: 1.4,
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    borderRadius: "10px",
                  }}
                >
                  Get Started: Login
                </Button>

                <Button
                  variant="outlined"
                  href="#features"
                  sx={{
                    px: 4,
                    py: 1.4,
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    borderRadius: "10px",
                  }}
                >
                  Explore Features
                </Button>
              </Box>
            </Box>

            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                maxWidth: "600px",
              }}
            >
              <img
                src="https://via.placeholder.com/600x450/3b82f6/ffffff?text=Hospital+Management+Illustration"
                alt="Hospital Illustration"
                style={{
                  width: "100%",
                  borderRadius: "25px",
                  boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
                }}
              />
            </Box>
          </Box>

          <Box
            id="features"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              alignItems: "center",
              marginTop: "2rem",
              width: "100%",
            }}
          >
            <Typography
              variant="h5"
              style={{
                fontWeight: 800,
                color: "#1f2937",
              }}
            >
              Key System Capabilities
            </Typography>

            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "1.5rem",
                flexWrap: "wrap",
                width: "100%",
              }}
            >
              {features.map((f, i) => (
                <Card
                  key={i}
                  sx={{
                    width: "300px",
                    borderTop: "4px solid #2563eb",
                    borderRadius: "16px",
                    boxShadow: "0px 8px 20px rgba(0,0,0,0.08)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0px 12px 28px rgba(37,99,235,0.25)",
                    },
                  }}
                >
                  <CardContent
                    style={{
                      textAlign: "center",
                      padding: "30px 20px",
                    }}
                  >
                    <div style={{ marginBottom: "10px" }}>{f.icon}</div>
                    <Typography
                      variant="h6"
                      style={{
                        color: "#1d4ed8",
                        fontWeight: "bold",
                      }}
                    >
                      {f.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      style={{ color: "#4b5563", marginTop: "8px" }}
                    >
                      {f.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        </Box>

        <Box
          style={{
            width: "100%",
            textAlign: "center",
            padding: "20px 0",
            color: "#475569",
            fontSize: "0.9rem",
            position: "absolute",
            bottom: "0",
            left: "0",
          }}
        >
          © {new Date().getFullYear()} HMS — Developed by Akash
        </Box>
      </Box>
    </div>
  );
}
