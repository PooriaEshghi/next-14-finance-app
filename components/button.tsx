import { sizes, variants } from "@/lib/variants";
import { JSX, ClassAttributes, ButtonHTMLAttributes } from "react";

type ButtonProps = JSX.IntrinsicAttributes &
  ClassAttributes<HTMLButtonElement> &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'default' | 'outline' | 'ghost' | 'danger';
    size?: 'xs' | 'sm' | 'base' | 'lg';
  };

export default function Button({
  variant = 'default',
  size = 'base',
  className = '',
  ...props
}: ButtonProps) {

  // Ensure size is one of the allowed values, otherwise fallback to 'base'
  const buttonSize = (['xs', 'sm', 'base', 'lg'] as const).includes(size as any) ? size : 'base';

  return (
    <button
      {...props}
      className={`${variants[variant]} ${sizes[buttonSize]} ${className}`}
    />
  );
}
