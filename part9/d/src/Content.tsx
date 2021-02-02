import React from "react";

const Content: React.FC<{ content: Array<{ name: string, exerciseCount: number }> }> = ({ content }) => {
    return (
        <div>
            <p>
                {content[0].name} {content[0].exerciseCount}
            </p>
            <p>
                {content[1].name} {content[1].exerciseCount}
            </p>
            <p>
                {content[2].name} {content[2].exerciseCount}
            </p>
        </div>
    )
};
export default Content;