import Button from './button.tsx'

interface Props<T extends Record<string, string>> {
    editData: T
    setEditData: (data: T) => void
    onSave: () => void
    onCancel: () => void
    fields: {
        name: keyof T
        type?: string
        maxLength?: number
        placeholder?: string
    }[]
}

function InputRow<T extends Record<string, string>>({
    editData,
    setEditData,
    onSave,
    onCancel,
    fields
}: Props<T>) {
    return (
        <div className="flex flex-1 items-center gap-2 w-full">
            {fields.map((field) => (
                <input
                    key={String(field.name)}
                    type={field.type || "text"}
                    className="border rounded p-1 flex-1 min-w-0 "
                    maxLength={field.maxLength}
                    value={editData[field.name] || ""}
                    placeholder={field.placeholder || String(field.name)}
                    onChange={(e) =>
                        setEditData({
                            ...editData,
                            [field.name]: e.target.value
                        })
                    }
                />
            ))}

            <div className="flex gap-1 flex-shrink-0">
                <Button variant="green" onClick={onSave}>
                    Save
                </Button>

                <Button variant="red" onClick={onCancel}>
                    Back
                </Button>
            </div>
        </div>
    )
}

export default InputRow