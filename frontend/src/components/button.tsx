interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'blue' | 'gray' | 'red' | 'yellow';
    className?: string;
}

const Button = ({ children, onClick, variant = "blue", className = "" }: ButtonProps) => {

    const baseStyle = "px-6 py-2 rounded-lg font-medium transition-all duration-200 active:scale-95";

    const variants = {
        blue: "bg-blue-600 text-white hover:bg-blue-700 shadow-md",
        gray: "bg-gray-200 text-gray-800 hover:bg-gray-300",
        red: "bg-red-600 text-white hover:bg-red-700 shadow-md",
        yellow: "bg-yellow-600 text-white hover:bg-yellow-700 shadow-md",
    };

    return (
        <button
            onClick={onClick}
            className={`${baseStyle} ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    )
}

export default Button;