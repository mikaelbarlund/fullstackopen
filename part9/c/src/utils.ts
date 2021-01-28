import { NewPatient, PatientRequest, Gender } from './types';

const toNewPatient = (object: PatientRequest): NewPatient => {
    const newEntry: NewPatient = {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSSN(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
    };

    return newEntry;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name.');
    }
    return name;
};
const parseSSN = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn.');
    }
    return ssn;
};
const parseGender = (input: unknown): Gender => {
    if (!input || !isString(input)) {
        throw new Error('Incorrect or missing gender.');
    }
    switch (input) {
        case 'male':
            return Gender.male;
        case 'female':
            return Gender.female;
        case 'other':
            return Gender.other;
        default:
            throw new Error('Incorrect or missing gender.');
    }
};
const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation.');
    }
    return occupation;
};
const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ');
    }
    return date;
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};


export default toNewPatient;