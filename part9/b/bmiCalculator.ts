interface BMIInputValues {
    height: number;
    mass: number;
}

const parseBMIArguments = (args: Array<string>): BMIInputValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    const [, , height, mass] = args;
    if ([height, mass].find(a => isNaN(Number(a)))) throw new Error('Provided values were not numbers!');
    return {
        height: Number(height),
        mass: Number(mass)
    };
};
const calculateBmi = (height: number, mass: number): string => {
    const bmi = mass / Math.pow(height / 100, 2);
    return bmi < 15 ? 'Very severely underweight' :
        bmi < 16 ? 'Severely underweight' :
            bmi < 18.5 ? 'Underweight' :
                bmi < 25 ? 'Normal(healthy weight)' :
                    bmi < 30 ? 'Overweight' :
                        bmi < 35 ? 'Obese Class I(Moderately obese)' :
                            bmi < 40 ? 'Obese Class II(Severely obese)' :
                                'Obese Class III(Very severely obese)';
};

if (process.argv[1].endsWith('bmiCalculator.ts')) {
    try {
        const { height, mass } = parseBMIArguments(process.argv);
        console.log(calculateBmi(height, mass));
    } catch (e) {
        const {message} = e as Error;
        console.log('Error, something bad happened, message: ', message);
    }
}

export { calculateBmi };