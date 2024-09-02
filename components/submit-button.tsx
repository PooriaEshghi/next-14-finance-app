'use client'

import Button from "./button";
import { useFormStatus } from "react-dom";
import { Loader } from "lucide-react";
import { ButtonHTMLAttributes, ClassAttributes } from "react";

type SubmitButtonProps = JSX.IntrinsicAttributes &
  ClassAttributes<HTMLButtonElement> &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'default' | 'outline' | 'ghost' | 'danger';
    size?: 'xs' | 'sm' | 'base' | 'lg';
  };

export default function SubmitButton({...props}:SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
    
      {...props}
      className={`${props.className} flex items-center justify-center space-x-2`}
    >
      {pending && <Loader className="animate-spin w-4 h-4" />}
      {props.children}
    </Button>
  );
}
