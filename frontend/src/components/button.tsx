interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
    variant?: 'blue' | 'gray' | 'red' | 'yellow' | 'green';
}

const Button = ({
    children,
    variant = "blue",
    className = "",
    disabled,
    ...props
}: ButtonProps) => {

    const baseStyle =
        "px-2 py-2 font-medium transition-all duration-200 rounded-lg active:scale-95";

    const variants = {
        blue: "bg-blue-600 text-white hover:bg-blue-700 shadow-md",
        gray: "bg-gray-200 text-gray-800 hover:bg-gray-300",
        red: "bg-red-600 text-white hover:bg-red-700 shadow-md",
        yellow: "bg-yellow-600 text-white hover:bg-yellow-700 shadow-md",
        green: "bg-green-600 text-white hover:bg-green-700 shadow-md",
    };

    const disabledStyle = disabled
        ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none border border-gray-400"
        : variants[variant];

    return (
        <button
            {...props}
            disabled={disabled}
            className={`${baseStyle} ${disabledStyle} ${className}`}
        >
            {children}
        </button>
    );
};
export default Button;