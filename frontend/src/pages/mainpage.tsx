import { useState, useEffect } from 'react';
import SearchPanel from '../components/searchpanel.tsx';
import { FetchData } from '../utility/api.ts'
import type { User } from '../types/user.ts';
import SearchResult from "../components/searchresult.tsx"


export default function MainPage() {
    const [message, setMessage] = useState<string>();
    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState(false);

    useEffect(() => {
        fetchUsers("All", "");
    }, [])

    const fetchUsers = async (mode: string = "All", text: string = "") => {
        setMessage("");
        let url = ""

        if (mode === "All") {
            url = "/users";
        }
        if (mode === "Id") {
            url = `/users?id=${text}`;
        }
        if (mode === "Name") {
            url = `/users?name=${text}`
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
            <SearchPanel onFetch={fetchUsers} setMessage={setMessage} />
            <SearchResult message={message} search={search} users={users} setUsers={setUsers} setMessage={setMessage} />
        </div>
    );
}