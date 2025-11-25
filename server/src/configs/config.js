import dotenv from 'dotenv';
dotenv.config();

const config= {
    port: process.env.PORT || 3000,
    mdbUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
    adminEmail: process.env.ADMIN_EMAIL || "admin@hms.com",
    adminPassword: process.env.ADMIN_PASSWORD || 'admin123',
}

export default Object.freeze(config);