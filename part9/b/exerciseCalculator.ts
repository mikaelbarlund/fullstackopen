interface ExcerciseInputValues {
    target: number;
    hours: Array<number>;
}

const parseExcerciseArguments = (args: Array<string>): ExcerciseInputValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    const [, , target, ...hours] = args;
    if (hours.find(a => isNaN(Number(a)))) throw new Error('Provided values were not numbers!');
    return {
        target: Number(target),
        hours: hours.map(hour => Number(hour))
    }
}

interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (hours: Array<number>, target: number): Result => {
    const periodLength: number = hours.length;
    const average: number = hours.reduce((sum, current) => sum + current, 0) / hours.length;
    const success: boolean = average > target;
    const rating: number = target / average < 1 ? 1 : target / average < 2 ? 2 : 3;
    console.log(target / average);
    return {
        periodLength: periodLength,
        trainingDays: hours.filter(a => a > 0).length,
        success: success,
        rating: rating,
        ratingDescription: rating === 1 ? 'you are the champ!' : rating === 2 ? 'not too bad but could be better' : 'try working out a bit more',
        target: target,
        average: average
    };
}

try {
    const { target, hours } = parseExcerciseArguments(process.argv);
    console.log(calculateExercises(hours, target));
} catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
}