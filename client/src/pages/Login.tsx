import { useState, type JSX } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import api from "../lib/api/axios";
import { useAuth } from "../hook/auth/useAuth";
import { LOGIN_API_ENDPOINT } from "../lib/constants/apiRoute";

import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

// Material UI
import {
  TextField,
  Button,
  Alert,
  Card,
  CardContent,
  Typography,
  IconButton,
  InputAdornment,
  CircularProgress,
  Box,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// ----------------------
// TYPES
// ----------------------

interface LoginForm {
  email: string;
  password: string;
}

interface LoginResponse {
  role: "admin" | "doctor";
  token: string;
  userId: string;
}



// ----------------------
// VALIDATION SCHEMA
// ----------------------

const schema: yup.ObjectSchema<LoginForm> = yup.object({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Minimum 6 characters").required("Password is required"),
});

export default function Login(): JSX.Element {
  const { login } = useAuth();

  const [serverError, setServerError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPwd, setShowPwd] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginForm) => {
    setServerError("");
    setLoading(true);

    try {
      const res = await api.post(LOGIN_API_ENDPOINT, values);

      if (res?.data?.success) {
        login(res.data.data.token, res.data.data.role);
      }

      setLoading(false);
    } catch (err: unknown) {
      const message =
        (err as any)?.response?.data?.message ||
        (err as any)?.response?.data?.error ||
        "Invalid email or password";

      setServerError(message);
      setLoading(false);
    }
  };

  // --------------------------
  // UI
  // --------------------------
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #e0f2fe, #c7d2fe)",
        padding: "20px",
      }}
    >
      <Card
        sx={{
          maxWidth: 900,
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          borderRadius: 4,
          boxShadow: 6,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
            padding: "40px",
            background: "linear-gradient(135deg, #2563eb, #4f46e5)",
            color: "white",
            textAlign: "center",
          }}
        >
          <LocalHospitalIcon sx={{ fontSize: 70, color: "#ffffff", marginBottom: 2 }} />

          <Typography variant="h3" sx={{ fontWeight: "800", letterSpacing: 1 }}>
            HMS
          </Typography>

          <Typography sx={{ opacity: 0.9, marginTop: 2, fontSize: "1rem" }}>
            Secure role-based access for hospital administrators and doctors.
            Manage patients, prescriptions, and more.
          </Typography>
        </Box>

        <CardContent
          sx={{
            width: { xs: "100%", md: "50%" },
            padding: { xs: "30px", md: "50px" },
          }}
        >
          <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold", mb: 1 }}>
            Welcome Back
          </Typography>

          <Typography sx={{ textAlign: "center", color: "gray", marginBottom: 3 }}>
            Sign in to continue to your dashboard
          </Typography>

          {serverError && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {serverError}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>

            <TextField
              {...register("email")}
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
            />

   
            <TextField
              {...register("password")}
              label="Password"
              type={showPwd ? "text" : "password"}
              fullWidth
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPwd((p) => !p)}>
                      {showPwd ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                marginTop: 3,
                paddingY: 1.4,
                fontSize: "1rem",
                fontWeight: "bold",
                borderRadius: 2,
              }}
              startIcon={loading ? <CircularProgress size={18} color="inherit" /> : null}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <Typography
            variant="caption"
            sx={{ display: "block", textAlign: "center", marginTop: 4, color: "gray" }}
          >
            © {new Date().getFullYear()} HMS — Developed by Akash
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
