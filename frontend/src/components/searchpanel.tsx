import React, { useState } from 'react';
import Button from './button.tsx'

interface SearchPanelProps {
    onFetch: (mode: Search, text: string) => void;
}

type Search = "All" | "Name" | "Id";

const SearchPanel = ({ onFetch }: SearchPanelProps) => {
    const [searchText, setSearchText] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mode, setMode] = useState<Search>("All");

    const selectedSearch = (value: Search) => {
        setMode(value);
        setDropdownOpen(false);
    }

    const handleSearch = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        onFetch(mode, searchText)
    }

    const placeholders: Record<string, string> = {
        All: "leave empty",
        Name: "add name",
        Id: "add id",
    }

    return (
        <form onSubmit={handleSearch} className="flex flex-row items-center justify-center gap-1">
            <div className="relative">
                <Button
                    type="button"
                    variant="blue"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                    Search {mode}
                </Button>
                {dropdownOpen && (
                    <div className="absolute left-0 mt-2 w-30 bg-white border rounded shadow z-10">
                        <Button
                            type="button"
                            variant="gray"
                            onClick={() => { selectedSearch("All"), setSearchText("") }}
                            className="w-full"
                        >
                            All
                        </Button>
                        <Button
                            type="button"
                            variant="gray"
                            onClick={() => { selectedSearch("Name"), setSearchText("") }}
                            className="w-full"
                        >
                            Name
                        </Button>
                        <Button
                            type="button"
                            variant="gray"
                            onClick={() => { selectedSearch("Id"), setSearchText("") }}
                            className="w-full"
                        >
                            Id
                        </Button>
                    </div>

                )}
            </div>
            <input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className={`border rounded p-2 transition-colors ${mode === "All" ? "bg-gray-200 cursor-not-allowed opacity-50" : "bg-white"
                    }`}
                placeholder={placeholders[mode]}
                disabled={mode === "All"}
            >
            </input>
            <Button
                type="submit"
                variant="green"
            >
                Search
            </Button>
        </form>
    );
}

export default SearchPanel;