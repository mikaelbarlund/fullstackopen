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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface Patient {
    id: string,
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

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;
export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatient = Omit<Patient, 'id'>;
