import Button from './button.tsx';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate('/login');
    }
    return (
        <div className="flex items-center justify-center mt-20">
            <Button
                variant="red"
                type="button"
                onClick={logout}
            >
                Logout
            </Button>
        </div>
    )
}

export default LogoutButton;