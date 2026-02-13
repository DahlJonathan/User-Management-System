import React, { useState, useEffect } from 'react';
import SearchPanel from '../components/searchpanel.tsx';
import axios from 'axios';

type User = {
    id: number;
    name: string;
    email: string;
};

export default function MainPage() {
    const [message, setMessage] = useState<string>();
    const [users, setUsers] = useState<User[]>([]);
    const errorMessage = "jotain meni pieleen"

    useEffect(() => {
        FetchAll();
    }, [])

    const FetchAll = async () => {
        try {
            const res = await axios.get<User[]>("http://localhost:8080/users")
            setUsers(res.data);
        } catch (err: any) {
            const msg = err.respons?.data?.message || err.message || errorMessage
            setMessage(msg)
        }
    }

    return (
        <div>
            <SearchPanel />
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