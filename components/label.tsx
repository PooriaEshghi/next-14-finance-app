import { LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

export default function Label({ className = "", ...props }: LabelProps) {
  return (
    <label
      {...props}
      className={`block text-gray-700 dark:text-gray-300 ${className}`}
    ></label>
  );
}
