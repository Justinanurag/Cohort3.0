import type { ReactElement, ReactNode } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement; // optional
}

const variantClasses = {
  primary: "bg-purple-500 text-white hover:bg-purple-600",
  secondary: "bg-purple-200 text-purple-700 hover:bg-purple-300",
};

const defaultStyles = "px-4 py-2 rounded-md flex items-center gap-2 font-medium";

export function Button({ variant, text, startIcon }: ButtonProps) {
  return (
    <button
      type="button"
      className={`${variantClasses[variant]} ${defaultStyles}`}
    >
      {startIcon && <span>{startIcon}</span>}
      <span>{text}</span>
    </button>
  );
}
