import { FieldError } from "react-hook-form";

interface FormErrorProps {
  error?: FieldError | string;
}

export default function FormError({ error }: FormErrorProps) {
  if (typeof error === 'string') {
    return <p className="mt-1 text-red-500">{error}</p>;
  }
  return error?.message ? <p className="mt-1 text-red-500">{error.message}</p> : null;
}
