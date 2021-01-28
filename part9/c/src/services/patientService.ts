import patients from '../../data/patients.json';
import { Patient, NonSensitivePatient } from '../types';

const getEntries = (): Array<Patient> => {
    return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
    return patients.map(a => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { ssn, ...nonSensitive } = a;
        return nonSensitive;
    });
};

export default {
    getEntries,
    getNonSensitiveEntries
};