import { useState } from 'react';
import Button from '../components/button.tsx';
import { FetchData } from '../utility/api.ts';
import { useNavigate } from 'react-router-dom';


export default function Login() {
    const [loginName, setLoginName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setError("");

        try {
            const response = await FetchData<any>(`/login`, {
                method: 'POST',
                data: ({
                    username: loginName,
                    password: password
                }),
            });
            if (response.status === "OK") {
                navigate('/main')
            } else {
                setError("Login Failed");
            }

        } catch (err: any) {
            setError("Invalid username or password");
            console.error("Login failed:", err);
        }
    }



    return (
        <div className="flex flex-col items-center justify-center gap-4 mt-20">
            <div className="text-3xl font-bold">
                <p>Admin Login</p>
            </div>
            <form onSubmit={handleLogin} className="flex flex-col gap-2 items-center justify-center">
                <input
                    type="text"
                    value={loginName}
                    onChange={(e) => setLoginName(e.target.value)}
                    className="border p-2 rounded bg-white"
                    placeholder="  Login Name"
                />
                <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 rounded bg-white"
                    placeholder="  Password"
                />
                <Button
                    type="submit"
                    variant="green"
                    className="w-20"
                >
                    Login
                </Button>
            </form>
            {error}
        </div>
    )
}