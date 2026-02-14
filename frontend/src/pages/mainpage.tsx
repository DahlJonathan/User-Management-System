import React, { useState, useEffect } from 'react';
import SearchPanel from '../components/searchpanel.tsx';
import { FetchData } from '../utility/api.ts'
import type { User } from '../types/user.ts';


export default function MainPage() {
    const [message, setMessage] = useState<string>();
    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState(false);

    useEffect(() => {
        fetchUsers("All", "");
    }, [])

    const fetchUsers = async (mode: string = "All", text: string = "") => {
        let url = ""

        if (mode === "All") {
            url = "/users";
        }
        if (mode === "Id") {
            url = `/users?id=${text}`;
        }

        try {
            setMessage("");
            if (mode === "All" || mode === "Name") {
                const data = await FetchData<User[]>(url)
                setUsers(data)
            } else {
                const data = await FetchData<User>(url)
                setUsers(data ? [data] : [])
            }
        } catch (err: any) {
            setUsers([]);
            setMessage(err.message);
        }
        setSearch(true);

    }

    return (
        <div>
            <SearchPanel onFetch={fetchUsers} />
            <div className="flex flex-col items-center justify-center">
                {search && (
                    <div className="text-3xl mt-10">
                        {users.map((user, index) => (
                            <div key={user.id ?? index} className="p-2 border">
                                <p>{user.name} - {user.email} - #{user.id}</p>
                            </div>
                        ))}
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}