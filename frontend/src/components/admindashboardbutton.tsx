import Button from './button.tsx';
import { useNavigate } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';

const AdminDashboardButton = () => {
    const navigate = useNavigate();
    const rights = localStorage.getItem("rights");


    const dashboard = () => {
        navigate('/admindashboard')
    }

    return (
        <div>
            <Button
                variant="blue"
                type="button"
                onClick={dashboard}
                disabled={rights !== "Full"}
            >
                <FiSettings size={24} />
            </Button>
        </div>
    )
}

export default AdminDashboardButton;