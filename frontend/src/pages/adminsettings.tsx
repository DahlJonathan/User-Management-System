import Button from '../components/button.tsx';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FetchData } from '../utility/api.ts';
import type { Admin } from '../types/admin.ts';
import InputRow from '../components/input.tsx';

function AdminDashboard() {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState<Admin[]>([]);
    const [message, setMessage] = useState("");
    const [addingAdmin, setAddingAdmin] = useState(false);
    const [addAdmin, setAddAdmin] = useState({ name: "", rights: "", password: "" })


    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const data = await FetchData<Admin[]>("/admins");
                setAdmin(data);
            } catch (err: any) {
                setAdmin([]);
                setMessage(err);
            }
        };

        fetchAdmin();
    }, []);


    const back = () => {
        navigate('/main');
    }

    const DeleteAdmin = async (id: number) => {
        setMessage("");
        try {
            await FetchData<Admin>(`/admins/${id}`, { method: 'DELETE' });
            setAdmin((prev) => prev.filter((u) => u.id !== id));
            setMessage("admin poistettu");
        } catch (err: any) {
            console.error(err.message);
            setMessage(err.message);
        }
    }

    const SaveAdmin = async () => {

        if (!addAdmin.name.trim()) {
            setMessage("Name is required");
            return;
        }

        if (addAdmin.rights !== "Full" && addAdmin.rights !== "Read" && addAdmin.rights !== "") {
            setMessage("Rights must be Full or Read");
            return;
        }

        if (!addAdmin.password.trim()) {
            setMessage("Password is required");
            return;
        }

        try {
            const newUser = await FetchData<Admin>(`/admins`, {
                method: 'POST',
                data: addAdmin
            });
            setAdmin((prevUsers) => {
                const currentUsers = Array.isArray(prevUsers) ? prevUsers : [];
                return [...currentUsers, newUser];
            });

            setMessage("Admin added");
            setAddAdmin({ name: "", rights: "", password: "" });
            setAddingAdmin(false);
        } catch (err: any) {
            setMessage(err.message);
        }
    }


    return (
        <div className="flex flex-col justify-center items-center">
            <div className="text-4xl font-bold mb-5">
                Edit Admins
            </div>
            <Button
                type="button"
                variant="yellow"
                onClick={() => setAddingAdmin(true)}
            >
                Add Admin
            </Button>
            {addingAdmin && (
                <div className="mt-2 mb-2 p-4 border rounded bg-gray-50 shadow-sm">
                    <InputRow
                        editData={addAdmin}
                        setEditData={setAddAdmin}
                        onSave={() => (SaveAdmin())}
                        onCancel={() => setAddingAdmin(false)}
                        fields={[
                            {
                                name: "name",
                                maxLength: 15,
                                placeholder: "Name"
                            },
                            {
                                name: "rights",
                                type: "rights",
                                placeholder: "rights (Full or Read only)"
                            },
                            {
                                name: "password",
                                type: "password",
                                placeholder: "password"
                            }
                        ]}
                    />
                </div>
            )}
            <div className="text-2xl font-bold mb-3">
                {message}
            </div>
            {admin.map((user, index) => (
                <div
                    key={user.id ?? index}
                    className="flex items-center h-12 p-1 border mb-1 bg-white shadow-sm rounded gap-4 w-100"
                >
                    <p className="text-xl font-semibold flex-1 text-left pl-5 truncate">
                        {user.name}
                    </p>
                    <p className="text-xl text-black flex-1 text-center">
                        {user.rights}
                    </p>
                    <div className="w-24 flex justify-end pr-2">
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                            #{user.id}
                        </span>
                    </div>
                    <Button
                        type="button"
                        variant="red"
                        onClick={() => DeleteAdmin(user.id!)}
                    >
                        Delete
                    </Button>
                </div>
            ))}
            <div className="mt-5">
                <Button
                    variant="red"
                    type="button"
                    onClick={back}
                >
                    Back
                </Button>
            </div>
        </div>
    );

}

export default AdminDashboard;