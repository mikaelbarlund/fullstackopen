import {  v4 as uuid } from 'uuid';
import patientData from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatient } from '../types';

const patients: Array<Patient> = patientData;

const getEntries = (): Array<Patient> => {
    return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
    return patients.map(a => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { ssn, entries, ...nonSensitive } = a;
        return nonSensitive;
    });
};

const findById = (id: string): Patient | undefined => {
    const entry = patients.find(d => d.id === id);
    return entry;
};

const addPatient = (patient: NewPatient
): Patient => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const id: string = uuid();
    const newPatient: Patient = { id: id, ...patient };
    patients.push(newPatient);
    return newPatient;
};

export default {
    getEntries,
    getNonSensitiveEntries,
    findById,
    addPatient
};