import type { User } from '../types/user.ts'
import Button from './button.tsx'
import { FetchData } from '../utility/api.ts'

interface ResultProps {
    users: User[];
    search: boolean;
    message?: string;
    setMessage: (text: string) => void;
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const SearchResult = ({ users, search, message, setMessage, setUsers }: ResultProps) => {

    const DeleteUser = async (id: number) => {
        setMessage("");
        try {
            await FetchData<User>(`/users/${id}`, {
                method: 'DELETE'
            });
            setUsers((prev) => prev.filter((u) => u.id !== id));
            setMessage("Käyttäjä poistettu");
        } catch (err: any) {
            console.error(err.message);
            setMessage?.(err.message)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center">
            {message && (
                <p className="text-red-500 text-center mt-4 text-2xl font-bold">
                    {message}
                </p>
            )}
            {search && (
                <div className="mt-5 w-full max-w-md">
                    {users.map((user, index) => (
                        <div
                            key={user.id ?? index}
                            className="flex items-center p-1 border mb-1 bg-white shadow-sm rounded gap-4"
                        >
                            <p className="text-xl font-semibold flex-1 text-left">
                                {user.name}
                            </p>
                            <p className="text-xl text-black flex-1 text-center">
                                {user.email}
                            </p>
                            <div className="flex items-center gap-1 justify-end flex-1">
                                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                                    #{user.id}
                                </span>
                                <Button
                                    type="button"
                                    variant="yellow"
                                >
                                    Edit
                                </Button>
                                <Button
                                    type="button"
                                    variant="red"
                                    onClick={() => DeleteUser(user.id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchResult;