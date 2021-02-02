import React from "react";
import Part, { CoursePart } from './Part';

const Content: React.FC<{ content: Array<CoursePart> }> = ({ content }) => {
    return (
        <div>
            {content.map(part => <Part key={part.name} part={part} />
            )}
        </div>
    )
};
export default Content;