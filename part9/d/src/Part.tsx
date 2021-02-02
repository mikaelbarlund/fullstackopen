import React from "react";
import { CoursePart } from './types';

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
    switch (part.name) {
        case "Fundamentals":
            return (
                <div>
                    <p>
                        {part.name} {part.exerciseCount}  {part.description}
                    </p>
                </div>
            )
        case "Using props to pass data":
            return (
                <div>
                    <p>
                        {part.name} {part.exerciseCount}  {part.groupProjectCount}
                    </p>
                </div>
            )
        case "Deeper type usage":
            return (
                <div>
                    <p>
                        {part.name} {part.exerciseCount}  {part.description} {part.exerciseSubmissionLink}
                    </p>
                </div>
            )
            case "Deep Thought":
                return (
                    <div>
                        <p>
                            {part.name} {part.exerciseCount}  {part.description} {part.answer}
                        </p>
                    </div>
                )
        default:
            return assertNever(part);
    }

};
export default Part;