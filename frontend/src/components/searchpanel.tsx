import React, { useState } from 'react';
import Button from './button.tsx';
import InputRow from './input.tsx';
import { FetchData } from '../utility/api.ts';
import type { User } from '../types/user.ts';

interface SearchPanelProps {
    onFetch: (mode: Search, text: string) => void;
    setMessage: (text: string) => void;
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

type Search = "All" | "Name" | "Id";

const SearchPanel = ({ onFetch, setMessage, setUsers }: SearchPanelProps) => {
    const [searchText, setSearchText] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mode, setMode] = useState<Search>("All");
    const [addUser, setAddUser] = useState({ name: "", email: "" });
    const [addingUser, setAddingUser] = useState(false);

    const selectedSearch = (value: Search) => {
        setMode(value);
        setDropdownOpen(false);
        setMessage("");
    }

    const handleSearch = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setMessage("");
        if (searchText === "" && mode !== "All") {
            setMessage("Search field cannot be empty")
            return
        }
        if (mode === "Id") {
            const isOnlyNumbers = /^\d+$/.test(searchText);

            if (!isOnlyNumbers || parseInt(searchText) <= 0) {
                setMessage("Please enter a positive ID number");
                return;
            }
        }

        onFetch(mode, searchText)
        setMessage("");
        setSearchText("");
    }

    const validateEmail = (email: string) => {
        return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    };

    const AddUser = async () => {
        if (!validateEmail(addUser.email)) {
            setMessage("Invalid email address!");
            return;
        }
        try {
            const newUser = await FetchData<User>(`/users`, {
                method: 'POST',
                data: addUser
            });
            setUsers((prevUsers) => {
                const currentUsers = Array.isArray(prevUsers) ? prevUsers : [];
                return [...currentUsers, newUser];
            });

            setMessage("User added");
            setAddUser({ name: "", email: "" });
            setAddingUser(false);
        } catch (err: any) {
            console.error(err.message);
            setMessage(err.message);
        }
    }

    const placeholders: Record<string, string> = {
        All: "leave empty",
        Name: "add name",
        Id: "add id",
    }

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <form onSubmit={handleSearch} className="flex flex-row items-center justify-center gap-1">
                <div className="relative">
                    <Button
                        type="button"
                        variant="blue"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        Search {mode} {dropdownOpen ? '↑' : '↓'}
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
                />

                <Button
                    type="submit"
                    variant="green"
                >
                    Search</Button>

                <Button
                    type="button"
                    variant="yellow"
                    onClick={() => setAddingUser(true)}
                >
                    Add User
                </Button>
            </form>
            {addingUser && (
                <div className="mt-2 p-4 border rounded bg-gray-50 shadow-sm">
                    <InputRow
                        editData={addUser}
                        setEditData={setAddUser}
                        onSave={() => (AddUser())}
                        onCancel={() => setAddingUser(false)}
                    />
                </div>
            )}
        </div>
    );
}

export default SearchPanel;