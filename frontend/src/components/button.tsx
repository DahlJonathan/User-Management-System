interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
    variant?: 'blue' | 'gray' | 'red' | 'yellow' | 'green';
}

const Button = ({ children, onClick, variant = "blue", className = "", ...props }: ButtonProps) => {

    const baseStyle = "px-2 py-2 font-medium transition-all duration-200 active:scale-95";

    const variants = {
        blue: "bg-blue-600 text-white hover:bg-blue-700 shadow-md rounded-lg",
        gray: "bg-gray-200 text-gray-800 hover:bg-gray-300",
        red: "bg-red-600 text-white hover:bg-red-700 shadow-md rounded-lg",
        yellow: "bg-yellow-600 text-white hover:bg-yellow-700 shadow-md rounded-lg",
        green: "bg-green-600 text-white hover:bg-green-700 shadow-md rounded-lg",
    };

    return (
        <button
            {...props}
            onClick={onClick}
            className={`${baseStyle} ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    )
}

export default Button;