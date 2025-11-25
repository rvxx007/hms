import config from "../config/config";

export const LOGIN_API_ENDPOINT = `${config?.apiBaseUrl}/auth/login`;

export const ADMIN_API_PREFIX = `${config?.apiBaseUrl}/admin`;

export const ADMIN_STATS_API_ENDPOINT = `${ADMIN_API_PREFIX}/stats`;
export const ADMIN_CHART_HOSPITAL_API_ENDPOINT = `${ADMIN_API_PREFIX}/chart/doctor-hospital`;
export const ADMIN_CHART_PETIENTS_WEEK_API_ENDPOINT = `${ADMIN_API_PREFIX}/chart/patients-week`;
export const ADMIN_CHART_DOCTOR_HOSPITAL_ENDPOINT = `${ADMIN_API_PREFIX}/chart/doctor-hospital`;
export const ADMIN_CHART_MEDICINCES_TYPES_ENDPOINT = `${ADMIN_API_PREFIX}/chart/medicines-types`;

export const ADMIN_HOSPITALS_ENDPOINT = `${ADMIN_API_PREFIX}/hospitals`;
export const ADMIN_DOCTORS_ENDPOINT = `${ADMIN_API_PREFIX}/doctors`;
export const ADMIN_MEDICINES_ENDPOINT = `${ADMIN_API_PREFIX}/medicines`;
export const ADMIN_PATIENTS_ENDPOINT = `${ADMIN_API_PREFIX}/patients`;


export const DOCTOR_API_PREFIX = `${config?.apiBaseUrl}/doctor`;

export const DOCTOR_TODAYS_PATIENTS_ENDPOINT = `${DOCTOR_API_PREFIX}/patients/today`;
export const DOCTOR_PRESCRIPTION_HISTORY_ENDPOINT = `${DOCTOR_API_PREFIX}/patients/prescription-history`;
export const DOCTOR_MEDICINES_ENDPOINT = `${DOCTOR_API_PREFIX}/medicines`;
export const DOCTOR_PRESCRIBE_ENDPOINT = `${DOCTOR_API_PREFIX}/prescribe`;

export const DOCTOR_PRES_HISTORY_ENDPOINT = `${DOCTOR_API_PREFIX}/patients/prescription-history`;

