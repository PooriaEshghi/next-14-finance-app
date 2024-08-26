import { sizes, variants } from "@/lib/variants";
import { JSX, ClassAttributes, ButtonHTMLAttributes } from "react"

type ButtonProps = JSX.IntrinsicAttributes &
  ClassAttributes<HTMLButtonElement> &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'default' | 'outline' | 'ghost';
    size?: 'xs' | 'sm' | 'base' | 'lg';
  };

export default function Button({
  variant = 'default',
  size = 'base',
  className = '',
  ...props
}: ButtonProps) {
 

  return (
    <button
      {...props}
      className={`${variants[variant]} ${sizes[size]} ${className}`}
    />
  );
}
