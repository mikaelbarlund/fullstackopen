import { NewPatient, PatientRequest, Gender, EntryRequest, NewEntry, Diagnosis } from './types';

export const toNewPatient = (object: PatientRequest): NewPatient => {
    const newEntry: NewPatient = {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSSN(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: [],
    };

    return newEntry;
};

export const toNewEntry = (object: EntryRequest): NewEntry => {
    const newEntry = {
        type: parseType(object.type),
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    };
    switch (object.type) {
        case "HealthCheck":
            return { ...newEntry, type: object.type, healthCheckRating: parseHealthCheckRating(object.healthCheckRating) };
        case "Hospital":
            return { ...newEntry, type: object.type, discharge: parseDischarge(object.discharge) };
        case "OccupationalHealthcare":
            return { ...newEntry, type: object.type, employerName: parseEmployerName(object.employerName), sickLeave: parseSickLeave(object.sickLeave) };
        default:
            assertNever(object.type);
            throw new Error("Incorrect or missing entry type.");
    }
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
            return Gender.Male;
        case 'female':
            return Gender.Female;
        case 'other':
            return Gender.Other;
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

const parseType = (input: unknown): "Hospital" | "OccupationalHealthcare" | "HealthCheck" => {
    if (!input || !isEntryTpe(input)) {
        throw new Error('Incorrect or missing type.');
    }
    return input;
};

const parseDescription = (input: unknown): string => {
    if (!input || !isString(input)) {
        throw new Error('Incorrect or missing description.');
    }
    return input;
};

const parseSpecialist = (input: unknown): string => {
    if (!input || !isString(input)) {
        throw new Error('Incorrect or missing specialist.');
    }
    return input;
};

const parseDiagnosisCodes = (input: unknown): Array<string> => {
    if (!input || !isDiagnosisCodes(input)) {
        throw new Error('Incorrect or missing diagnosisCodes.');
    }
    return input;
};

const parseHealthCheckRating = (input: unknown): number => {
    if (!isNumberString(input) || ![0, 1, 2, 3].some(a => a === parseInt(input))) {
        throw new Error('Incorrect or missing healthCheckRating.');
    }
    return parseInt(input);
};

const parseDischarge = (input: unknown): { date: string; criteria: string; } => {
    if (!input || !isDischarge(input)) {
        throw new Error('Incorrect or missing discharge.');
    }
    return input;
};

const parseSickLeave = (input: unknown): { startDate: string; endDate: string; } => {
    if (!isSickLeave(input)) {
        throw new Error('Incorrect or missing sick-leave.');
    }
    return input;
};


const parseEmployerName = (input: unknown): string => {
    if (!input || !isString(input)) {
        throw new Error('Incorrect or missing employer name.');
    }
    return input;
};

const isString = (input: unknown): input is string => {
    return typeof input === 'string' || input instanceof String;
};

const isNumberString = (input: unknown): input is string => {
    return isString(input) && !isNaN(parseInt(input));
};

const isEntryTpe = (input: unknown): input is "Hospital" | "OccupationalHealthcare" | "HealthCheck" => {
    return ["Hospital", "OccupationalHealthcare", "HealthCheck"].some(a => a === input);
};

const isDiagnosisCodes = (input: unknown): input is Array<Diagnosis['code']> => {
    return Array.isArray(input) && input.every(a => isString(a));
};

const isDate = (input: string): boolean => {
    return Boolean(Date.parse(input));
};

const isDischarge = (input: unknown): input is { date: string; criteria: string; } => {
    const test = input as { date: string; criteria: string; };
    if (!input || !test.date || !isDate(test.date) || !test.criteria || !isString(test.criteria)) {
        return false;
    } else {
        return true;
    }
};
const isSickLeave = (input: unknown): input is { startDate: string; endDate: string; } => {
    const test = input as { startDate: string; endDate: string; };
    if ((test === undefined )) {
        return true;
    }

    if (!input || !test.startDate || !isDate(test.startDate) || !test.endDate || !isDate(test.endDate)) {
        return false;
    } else {
        return true;
    }
};

export const assertNever = (arg: never): never => arg;
