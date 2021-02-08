export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

export interface Diagnosis {
    code: string,
    name: string,
    latin?: string,
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    }
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: {
        date: string;
        criteria: string;
    };
}

export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

export interface Patient {
    id: string;
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string,
    entries: Entry[]
}

export interface PatientRequest {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: string,
    occupation: string,
}

export interface EntryRequest {
    type: "Hospital" | "OccupationalHealthcare" | "HealthCheck";
    description: string;
    date: string;
    specialist: string;
    healthCheckRating: HealthCheckRating;
    diagnosisCodes?: Array<Diagnosis['code']>;
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    };
    discharge?: {
        date: string;
        criteria: string;
    };
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;
export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatient = Omit<Patient, 'id'>;
export type NewEntry =
    | Omit<HospitalEntry, 'id'>
    | Omit<OccupationalHealthcareEntry, 'id'>
    | Omit<HealthCheckEntry, 'id'>;
