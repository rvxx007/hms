export type Role = "admin" | "doctor";

export interface StatsData {
  hospitals: number;
  doctors: number;
  patients: number;
  appointments: number;
  medicines: number;
  todaysPatients: number;
}

export interface CardData {
  label: string;
  value: string | number;
}

export interface DoctorAndHospitalType {
  doctors: number;
  hospitals: number;
}

export interface medicinesType {
  injection: number;
  tablet: number;
  syrup: number;
}

export interface Hospital {
  _id: string;
  name: string;
  address: string;
  phone: string;
}

export interface HospitalForm {
  name: string;
  address: string;
  phone: string;
}


export interface MedicineForm {
  name: string;
  genericName: string;
  strength: string;
  type: string;
  company: string;
}