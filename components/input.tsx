import { InputHTMLAttributes, HTMLInputTypeAttribute } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  type = "text",
  className = "",
  ...props
}: InputProps) {
  const styles: Record<string, string> = {
    checkbox:
      "rounded border-gray-300 text-gray-700 bg-white dark:bg-gray-950 dark:text-gray-500 shadow-sm",
    default:
      "w-full rounded-md shadow-sm border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-950",
  };

  const styleClass = styles[type] ?? styles["default"];

  return (
    <input
      {...props}
      type={type}
      className={`${styleClass} ${className}`}
    />
  );
}
