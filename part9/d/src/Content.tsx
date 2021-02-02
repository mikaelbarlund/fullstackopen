import React from "react";
import Part from './Part';
import { CoursePart } from './types';

const Content: React.FC<{ content: Array<CoursePart> }> = ({ content }) => {
    return (
        <div>
            {content.map(part => <Part key={part.name} part={part} />
            )}
        </div>
    )
};
export default Content;