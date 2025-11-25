import { useState } from "react";
// Assuming you have these imports for functionality
import api from "../lib/api/axios";
import { useAuth } from "../hook/auth/useAuth";

// --- MUI Components & Icons ---
import { Box, Typography, TextField, Button, Alert } from "@mui/material";
import HospitalIcon from "@mui/icons-material/LocalHospital";
import LockOpenIcon from "@mui/icons-material/LockOpen"; // New icon for the form
import { Email } from "@mui/icons-material";

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // New loading state for UX

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", form);
      // Simulate network delay if needed: await new Promise(resolve => setTimeout(resolve, 1000));
      login(res.data.token, res.data.role);
    } catch (err) {
      setError("Invalid email or password. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      
      {/* Login Card/Box */}
      <Box
        component="form"
        onSubmit={submit}
        className="w-full max-w-md bg-white p-8 sm:p-10 shadow-2xl rounded-xl border border-gray-200 transition-all duration-500 hover:shadow-blue-300/50"
        sx={{
          // Optional: Add a subtle animation/lift on hover
          '&:hover': { transform: 'translateY(-2px)' },
        }}
      >
        
        {/* Logo and Title */}
        <div className="flex flex-col items-center justify-center mb-8 group">
          {/* Your provided icon with attractive transitions */}
          <HospitalIcon 
            className="text-blue-600 transition-colors duration-300 group-hover:text-blue-700" 
            sx={{ fontSize: 60 }} 
          />
          <Typography variant="h4" className="font-extrabold !text-gray-900 mt-2">
            HMS Login
          </Typography>
          <Typography variant="subtitle2" className="!text-gray-500">
            Access your Hospital Management System
          </Typography>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}

        {/* Email Field */}
        <TextField
          label="Email Address"
          type="email"
          name="email"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          disabled={loading}
          onChange={handleInputChange}
          className="mb-4"
          InputProps={{
            startAdornment: <Email className="text-gray-400 mr-2" />,
          }}
        />

        {/* Password Field */}
        <TextField
          label="Password"
          type="password"
          name="password"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          disabled={loading}
          onChange={handleInputChange}
          className="mb-6"
          InputProps={{
            startAdornment: <LockOpenIcon className="text-gray-400 mr-2" />,
          }}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          disabled={loading}
          className="hover:shadow-lg transition-all transform hover:scale-[1.01]"
          sx={{ paddingY: 1.5, fontSize: "1.1rem", fontWeight: 'bold' }}
        >
          {loading ? "Logging In..." : "Login"}
        </Button>

        {/* Footer/Links */}
        <Box className="mt-6 text-center">
            <Typography variant="body2" className="!text-blue-600 hover:underline cursor-pointer">
                Forgot Password?
            </Typography>
        </Box>

      </Box>
    </div>
  );
}