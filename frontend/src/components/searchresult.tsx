import type { User } from '../types/user.ts';
import Button from './button.tsx';
import { FetchData } from '../utility/api.ts';
import { useState } from 'react';
import InputRow from './input.tsx';

interface ResultProps {
    users: User[];
    search: boolean;
    message?: string;
    setMessage: (text: string) => void;
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const SearchResult = ({ users, search, message, setMessage, setUsers }: ResultProps) => {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editData, setEditData] = useState({ name: "", email: "" });
    const rights = localStorage.getItem("rights");

    const DeleteUser = async (id: number) => {
        setMessage("");
        try {
            await FetchData<User>(`/users/${id}`, { method: 'DELETE' });
            setUsers((prev) => prev.filter((u) => u.id !== id));
            setMessage("Käyttäjä poistettu");
        } catch (err: any) {
            console.error(err.message);
            setMessage(err.message);
        }
    }

    const EditUser = async (id: number) => {
        setMessage("");
        try {
            await FetchData<User>(`/users/${id}`, {
                method: 'PUT',
                data: editData
            });
            setUsers((prevUsers) =>
                prevUsers.map((u) =>
                    u.id === id ? { ...u, name: editData.name, email: editData.email } : u
                )
            );
            setEditingId(null);
            setMessage("User updated successfully!");
        } catch (err: any) {
            console.error(err.message);
            setMessage(err.message);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center">
            {message && (
                <p className="text-red-500 text-center mt-4 text-2xl font-bold">
                    {message}
                </p>
            )}

            {search && users && (
                <div className="mt-5 w-full max-w-xl">
                    {users.map((user, index) => (
                        <div key={user.id ?? index} className="flex items-center p-1 border mb-1 bg-white shadow-sm rounded gap-4">
                            {editingId === user.id ? (
                                <InputRow
                                    editData={editData}
                                    setEditData={setEditData}
                                    onSave={() => EditUser(user.id!)}
                                    onCancel={() => setEditingId(null)}
                                    fields={[
                                        {
                                            name: "name",
                                            maxLength: 10,
                                            placeholder: "Name"
                                        },
                                        {
                                            name: "email",
                                            type: "email",
                                            placeholder: "Email"
                                        }
                                    ]}
                                />
                            ) : (
                                <>
                                    <p className="text-xl font-semibold flex-1 text-left pl-5">{user.name}</p>
                                    <p className="text-xl text-black flex-1 text-center">{user.email}</p>
                                    <div className="flex items-center gap-1 justify-end flex-1">
                                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">#{user.id}</span>
                                        <Button
                                            type="button"
                                            variant="yellow"
                                            disabled={rights !== "Full"}
                                            onClick={() => {
                                                setEditingId(user.id!);
                                                setEditData({ name: user.name, email: user.email });
                                            }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="red"
                                            onClick={() => DeleteUser(user.id!)}
                                            disabled={rights !== "Full"}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


export default SearchResult;