import { forwardRef, InputHTMLAttributes } from "react";

// Define the prop types for the input component
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

// The Input component using forwardRef for better ref handling
const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { type = "text", className = "", ...props },
  ref
) {
  const styles: Record<string, string> = {
    checkbox:
      "rounded border-gray-300 text-gray-700 bg-white dark:bg-gray-950 dark:text-gray-500 shadow-sm disabled:opacity-60",
    file:
      "file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:opacity-50 file:dark:text-gray-400",
    default:
      "w-full rounded-md shadow-sm border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-950 disabled:opacity-60",
  };

  return (
    <input
      ref={ref}
      type={type}
      {...props}
      className={`${styles[type] ?? styles["default"]} ${className}`}
    />
  );
});

export default Input;
