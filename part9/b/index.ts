import express from 'express';

import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});


app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if (isNaN(Number(weight)) || isNaN(Number(height))) res.send({ error: 'malformatted parameters' });
    else res.send({
        weight: weight,
        height: height,
        bmi: calculateBmi(height, weight)
    });
});

interface ExcerciseInputValues {
    target: number;
    daily_exercises: Array<number>;
}

app.post('/exercises', (req, res) => {
    const {daily_exercises,target}: {daily_exercises: Array<number>, target:number} = req.body as ExcerciseInputValues;
    if(!daily_exercises||!target) res.status(400).json({ error: "parameters missing" });
    else if (daily_exercises.find(a => isNaN(Number(a)))) res.status(400).json({ error: "malformatted parameters" });
    else if (isNaN(Number(target))) res.status(400).json({ error: "malformatted parameters" });
    else res.json(calculateExercises(daily_exercises, target));
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});