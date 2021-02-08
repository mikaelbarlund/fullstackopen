import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient, toNewEntry } from "../utils";
import { PatientRequest, EntryRequest } from '../types';
const router = express.Router();


router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  const patientRequest = req.body as PatientRequest;
  const newPatient = patientService.addPatient(toNewPatient(patientRequest));
  res.json(newPatient);
});

router.post('/:id/entries', (req, res) => {
  const entryRequest = req.body as EntryRequest;
  const newEntry = patientService.addEntry(req.params.id, toNewEntry(entryRequest));
  res.json(newEntry);
});

export default router;