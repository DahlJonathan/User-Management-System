import type { User } from '../types/user.ts'

interface ResultProps {
    users: User[];
    search: boolean;
    message?: string;
}

const SearchResult = ({ users, search, message }: ResultProps) => {
    return (
        <div className="flex flex-col items-center justify-center">
            {search && (
                <div className="text-xl mt-10 w-full max-w-md">
                    {users.map((user, index) => (
                        <div key={user.id ?? index} className="flex flew-row gap-5 p-2 border mb-2 bg-white shadow-sm rounded">
                            <p className="font-semibold">{user.name}</p>
                            <p className="text-sm text-gray-600">{user.email} - #{user.id}</p>
                        </div>
                    ))}
                    {message && (
                        <p className="text-red-500 text-center mt-4 font-medium">
                            {message}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchResult;