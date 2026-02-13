import React, { useState } from 'react';
import Button from './button.tsx'

interface SearchPanelProps {
    onFetch: () => void;
}

const SearchPanel = ({ onFetch }: SearchPanelProps) => {
    const [text, setText] = useState("");

    return (
        <div className="flex flex-row items-center justify-center">
            <Button
                variant="blue"
                onClick={onFetch}
            >
                Hae
            </Button>
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