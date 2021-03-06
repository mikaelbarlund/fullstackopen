import express from 'express';
import diagnoses from './routes/diagnosis';
import patients from './routes/patients';

import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

app.use('/api/diagnosis', diagnoses);
app.use('/api/patients', patients);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});