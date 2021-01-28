export interface Diagnose {
    code: string,
    name: string,
    latin?: string
}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: string,
    occupation: string
}
export type NonSensitivePatient = Omit<Patient, 'ssn'>;


export type Visibility = 'great' | 'good' | 'ok' | 'poor';
export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';
export interface DiaryEntry {
    id: number;
    date: string;
    weather: Weather;
    visibility: Visibility;
    comment: string;
}