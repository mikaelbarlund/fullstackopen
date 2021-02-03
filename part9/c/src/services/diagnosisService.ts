import diagnoseData from '../../data/diagnoses.json';
import {Diagnosis} from '../types';

const getEntries = (): Array<Diagnosis> => {
    return diagnoseData;
};


export default {
    getEntries
};