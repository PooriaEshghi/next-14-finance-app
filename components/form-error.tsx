import { FieldError } from "react-hook-form";

interface FormErrorProps {
  error?: FieldError;
}

export default function FormError({ error }: FormErrorProps) {
  return error?.message ? <p className="mt-1 text-red-500">{error.message}</p> : null;
}
