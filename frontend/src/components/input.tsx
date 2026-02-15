import Button from './button.tsx';
interface inputRow {
    editData: { name: string, email: string };
    setEditData: (data: { name: string, email: string }) => void;
    onSave: () => void
    onCancel: () => void
}
const inputRow = ({ editData, setEditData, onSave, onCancel }: inputRow) => {
    return (
        <div className="flex flex-1 items-center gap-2 w-full">
            <input
                className="border rounded p-1 flex-1 min-w-0"
                maxLength={10}
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                placeholder="Name (max 10)"
            />
            <input
                type="email"
                className="border rounded p-1 flex-1 min-w-0"
                maxLength={30}
                value={editData.email}
                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                placeholder="Email address"
            />
            <div className="flex gap-1 flex-shrink-0">
                <Button variant="green" onClick={onSave}>Save</Button>
                <Button variant="red" onClick={onCancel}>Back</Button>
            </div>
        </div>
    )
}

export default inputRow;