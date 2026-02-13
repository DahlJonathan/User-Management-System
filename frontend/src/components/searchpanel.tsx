import React, { useState } from 'react';

const SearchPanel = () => {
    const [text, setText] = useState("");

    return (
        <div className="flex flex-row items-center justify-center">
            <button
            >
                Hae
            </button>
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="border border-rounded"
                placeholder="hae käyttäjä"
            >
            </input>
        </div>
    );
}

export default SearchPanel;