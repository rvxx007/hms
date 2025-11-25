import { Button, Typography, Box, Card, CardContent } from "@mui/material";
import HospitalIcon from "@mui/icons-material/LocalHospital";
import PeopleIcon from "@mui/icons-material/PeopleAlt"; // For Patient Management
import MedicalServicesIcon from "@mui/icons-material/MedicalServices"; // For Doctor Tools
import SettingsIcon from "@mui/icons-material/Settings"; // For Administration

export default function WelcomeScreen() {
  // Define features to display
  const features = [
    { icon: <PeopleIcon sx={{ fontSize: 40, color: '#3b82f6' }} />, title: "Patient Management", description: "Seamless patient registration, history, and records." },
    { icon: <MedicalServicesIcon sx={{ fontSize: 40, color: '#10b981' }} />, title: "Doctor Tools", description: "Efficient scheduling, diagnostics, and prescription management." },
    { icon: <SettingsIcon sx={{ fontSize: 40, color: '#f59e0b' }} />, title: "Admin Operations", description: "Robust tools for billing, inventory, and overall administration." },
  ];

  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 relative overflow-hidden">
      

      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-100/50 z-0"></div>

      <Box className="relative z-10 w-full max-w-7xl mx-auto py-16 px-6 sm:px-8 lg:py-24 lg:px-12 flex-grow flex flex-col justify-center">

        <Box className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-20"> 
          
          {/* Text Content */}
          <Box className="w-full lg:w-1/2 text-center lg:text-left">
            <div className="flex items-center gap-3 mb-4 justify-center lg:justify-start">
              <HospitalIcon className="text-blue-600 transition-colors duration-300 group-hover:text-blue-700" sx={{ fontSize: 60 }} />
              <Typography variant="h3" className="font-extrabold !text-blue-800">
                HMS
              </Typography>
            </div>
            
            <Typography variant="h2" component="h1" className="font-extrabold mb-4 !text-gray-900 leading-tight">
              Modern, <span className="text-blue-600">Intuitive</span> & Collaborative Hospital Management
            </Typography>

            <Typography
              variant="h5"
              className="mb-10 max-w-xl mx-auto lg:mx-0 !text-gray-600"
            >
              Streamline your hospital operations with powerful tools for administration, doctors, and patient management  all in one unified platform.
            </Typography>

            <div className="flex gap-4 mt-6 flex-wrap justify-center lg:justify-start shadow-lg rounded-xl p-1 bg-white/50 backdrop-blur-sm w-fit mx-auto lg:mx-0">
              <Button
                variant="contained"
                color="primary"
                size="large"
                href="/login"
                className="hover:shadow-xl transition-all transform hover:scale-[1.03] duration-300"
                sx={{ paddingX: 6, paddingY: 1.75, fontSize: "1.15rem", fontWeight: 'bold' }}
              >
                Get Started: Login
              </Button>

              <Button
                variant="outlined"
                color="primary"
                size="large"
                href=""
                className="transition-all transform hover:bg-blue-50/70 border-2" 
                sx={{ paddingX: 6, paddingY: 1.75, fontSize: "1.15rem", fontWeight: 'bold' }}
              >
                Explore Features
              </Button>
            </div>
          </Box>

          <Box className="w-full lg:w-1/2 hidden lg:flex justify-center"> 
              <Box 
                component="img"
                src="https://via.placeholder.com/600x450/3b82f6/ffffff?text=Hospital+Management+Illustration"
                alt="Hospital Management System Illustration"
                className="rounded-3xl shadow-2xl transition-shadow duration-500 hover:shadow-blue-500/50" // Sharper corners and shadow hover
                sx={{ 
                    maxHeight: '450px', 
                    width: '100%', 
                    objectFit: 'cover',
                }}
              />
          </Box>

        </Box>

        <Box className="mt-8 sm:mt-16 w-full">
            <Typography variant="h4" className="text-center font-extrabold mb-10 !text-gray-800">
                Key System Capabilities
            </Typography>
            
            <Box className="flex flex-wrap -mx-4 justify-center"> 
                {features.map((feature, index) => (
                    <Box key={index} className="w-full sm:w-1/2 md:w-1/3 p-4"> 
                        <Card 
                            className="shadow-xl transition-all duration-500 transform hover:shadow-blue-300/50 hover:scale-[1.02] h-full rounded-2xl border-t-4 border-blue-400"
                            elevation={4} 
                        >
                            <CardContent className="text-center p-8">
                                <Box className="mb-4">{feature.icon}</Box>
                                <Typography variant="h6" className="font-bold mb-2 !text-blue-700">
                                    {feature.title}
                                </Typography>
                                <Typography variant="body1" className="!text-gray-600">
                                    {feature.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                ))}
            </Box>
        </Box>

      </Box>

      {/* Footer */}
      <Box className="w-full py-4 text-sm text-center bg-gray-100 text-gray-600 border-t border-gray-200">
        © {new Date().getFullYear()} Hospital Management System (HMS) — Developed by Akash
      </Box>
    </div>
  );
}