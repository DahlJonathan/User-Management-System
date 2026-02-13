import React, { useState, useEffect } from 'react';
import SearchPanel from '../components/searchpanel.tsx';
import { FetchData } from '../utility/api.ts'

type User = {
    id: number;
    name: string;
    email: string;
};

export default function MainPage() {
    const [message, setMessage] = useState<string>();
    const [users, setUsers] = useState<User[]>([]);

    const fetchUsers = async () => {
        FetchData<User[]>("/users")
            .then(setUsers)
            .catch(err => setMessage(err.message));
    }

    return (
        <div>
            <SearchPanel onFetch={fetchUsers} />
            <div className="flex flex-col items-center justify-center">
                <div className="text-3xl mt-10">
                    {users.map((user) => (
                        <div key={user.id} className="p-2 border ">
                            <p>{user.name} - {user.email} - #{user.id}</p>
                        </div>
                    ))}
                    {message}
                </div>
            </div>
        </div>
    );
}