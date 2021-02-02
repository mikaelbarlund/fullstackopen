interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartDescriptive extends CoursePartBase {
    description: string;
}

interface CoursePartOne extends CoursePartDescriptive {
    name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
}

interface CoursePartThree extends CoursePartDescriptive {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
}

interface CoursePartMikael extends CoursePartDescriptive {
    name: "Deep Thought";
    answer: number;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartMikael;