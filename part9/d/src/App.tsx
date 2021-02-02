import React from "react";
import Header from './Header';
import Content from './Content';
import { CoursePart } from './Part';
import Total from './Total';
const App: React.FC = () => {

    const courseName = "Half Stack application development";
    // new types


    // this is the new coursePart variable
    const courseParts: CoursePart[] = [
        {
            name: "Fundamentals",
            exerciseCount: 10,
            description: "This is an awesome course part",
        },
        {
            name: "Using props to pass data",
            exerciseCount: 7,
            groupProjectCount: 3,
        },
        {
            name: "Deeper type usage",
            exerciseCount: 14,
            description: "Confusing description",
            exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
        },
        {
            name: "Deep Thought",
            exerciseCount: 1,
            description: "Ultimate Answer",
            answer: 42,
        }
    ];

    return (
        <div>
            <Header name={courseName} />
            <Content content={courseParts} />
            <Total total={courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)} />
        </div>
    )
};
export default App;