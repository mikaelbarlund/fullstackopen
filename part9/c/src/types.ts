export enum Gender {
    male = 'male',
    female = 'female',
    other = 'other',
}
export type GenderStrings = keyof typeof Gender;

export interface Diagnose {
    code: string,
    name: string,
    latin?: string,
}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string,
}

export interface PatientRequest {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: string,
    occupation: string,
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>;
export type NewPatient = Omit<Patient, 'id'>;
