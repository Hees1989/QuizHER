import React from 'react';

export const Main = (props) => {
    return (
        <div>
            <button onClick={() => props.changeUsername()}>Verander naam</button>
        </div>
    );
};