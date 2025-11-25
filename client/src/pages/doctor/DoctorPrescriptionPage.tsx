import { useEffect, useState, useCallback, type JSX } from "react";
import api from "../../lib/api/axios";

// MUI
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  TextField,
  CircularProgress,
  Divider,
  Button,
  Alert,
  IconButton,
} from "@mui/material";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import HealingIcon from "@mui/icons-material/Healing";

// RHF + Yup
import { useForm, type SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Utils
import { headers } from "../../lib/util/commonFun";
import { DOCTOR_TODAYS_PATIENTS_ENDPOINT } from "../../lib/constants/apiRoute";

// ----------------------------------------------------
// TYPES
// ----------------------------------------------------

interface Patient {
  _id: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  phone: string;
  address: string;
  complaint: string;
}



interface FilterForm {
  search?: string;
  gender?: string;
}

// ----------------------------------------------------
// VALIDATION
// ----------------------------------------------------

const schema: yup.ObjectSchema<FilterForm> = yup.object({
  search: yup.string().optional(),
  gender: yup.string().optional(),
});

// ----------------------------------------------------
// COMPONENT
// ----------------------------------------------------

export default function DoctorTodayPatients(): JSX.Element {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [originalPatients, setOriginalPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState("");

  // RHF
  const { register, reset, handleSubmit, watch } = useForm<FilterForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      search: "",
      gender: "",
    },
  });

  const selectedGender = watch("gender");

  // ----------------------------------------------------
  // Load today's patients
  // ----------------------------------------------------
  const loadTodayPatients = useCallback(async () => {
    try {
      setLoading(true);

      const res = await api.get(
        DOCTOR_TODAYS_PATIENTS_ENDPOINT,
        headers
      );

      if (res.data.success) {
        setPatients(res.data.data);
        setOriginalPatients(res.data.data);
      }
    } catch {
      setServerError("Failed to fetch today's patients.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTodayPatients();
  }, [loadTodayPatients]);

  // ----------------------------------------------------
  // Apply Filters
  // ----------------------------------------------------
  const onFilter= (filters:FilterForm) => {
    let filtered = [...originalPatients];

    if (filters.gender)
      filtered = filtered.filter((p) => p.gender === filters.gender);

    if (filters.search)
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(String(filters.search).toLowerCase())
      );

    setPatients(filtered);
  };

  // ----------------------------------------------------
  // Reset Filters
  // ----------------------------------------------------
  const clearFilters = () => {
    reset({
      search: "",
      gender: "",
    });
    setPatients(originalPatients);
  };

  // ----------------------------------------------------
  // UI
  // ----------------------------------------------------

  return (
    <Box className="space-y-12">

      {/* HEADER */}
      <Box className="flex items-center gap-3">
        <CalendarMonthIcon sx={{ fontSize: 40 }} className="text-blue-600" />
        <Typography variant="h4" className="font-bold text-blue-700">
          Today’s Patients
        </Typography>
      </Box>

      {/* FILTER CARD */}
      <Card className="shadow-xl rounded-lg border border-gray-200">
        <CardHeader
          title="Filter Patients"
          titleTypographyProps={{ className: "font-bold text-gray-700" }}
        />
        <Divider />

        <CardContent>
          <form onSubmit={handleSubmit(onFilter)}>
            <Box className="flex flex-col lg:flex-row gap-6">

              {/* Gender */}
              <Box className="flex flex-col w-full">
                <label className="text-gray-700 mb-1 font-medium">
                  Gender
                </label>

                <select
                  {...register("gender")}
                  className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </Box>

              {/* Search */}
              <Box className="flex flex-col w-full">
                <TextField
                  fullWidth
                  label="Search patient"
                  {...register("search")}
                />
              </Box>
            </Box>

            {/* Buttons */}
            <Box className="flex gap-4 mt-6">
              <Button
                type="submit"
                variant="contained"
                sx={{
                  px: 4,
                  py: 1.4,
                  fontWeight: "bold",
                }}
              >
                Apply Filters
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                onClick={clearFilters}
                sx={{
                  px: 4,
                  py: 1.4,
                  fontWeight: "bold",
                }}
              >
                Clear Filters
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>

      {/* PATIENT LIST */}
      <Card className="shadow-xl rounded-lg border border-gray-100">
        <CardHeader
          title="Patients for Today"
          titleTypographyProps={{ className: "font-bold text-gray-700" }}
        />
        <Divider />

        <CardContent>

          {serverError && (
            <Alert severity="error" className="mb-4">
              {serverError}
            </Alert>
          )}

          {loading ? (
            <div className="flex justify-center py-10">
              <CircularProgress />
            </div>
          ) : patients.length === 0 ? (
            <Typography className="text-center text-gray-500 py-6 text-lg">
              No patients for today.
            </Typography>
          ) : (
            <Box className="space-y-6">
              {patients.map((p) => (
                <Card
                  key={p._id}
                  className="p-6 border-l-4 border-blue-600 shadow-sm hover:shadow-md transition rounded-lg"
                >
                  {/* Top row */}
                  <Box className="flex items-center justify-between mb-3">
                    <Typography variant="h6" className="font-bold text-gray-900">
                      {p.name} — Age {p.age}, {p.gender}
                    </Typography>
                    <PersonIcon className="text-blue-500" />
                  </Box>

                  <Typography className="text-gray-700 mb-1">
                    <strong>Complaint:</strong> {p.complaint}
                  </Typography>

                  <Typography className="text-gray-700 mb-1">
                    <strong>Phone:</strong> {p.phone}
                  </Typography>

                  <Typography className="text-gray-600 text-sm">
                    <strong>Address:</strong> {p.address}
                  </Typography>
                </Card>
              ))}
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
