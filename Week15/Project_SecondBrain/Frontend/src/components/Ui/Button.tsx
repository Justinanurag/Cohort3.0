import type { ReactElement } from "react";

export interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "ms" | "lg";
  text: string;
  startIcon?: ReactElement; // optional
  endIcon?: ReactElement; // optional
  onClick: () => void;
}

export const Button = ({
  variant,
  size,
  text,
  startIcon,
  endIcon,
  onClick,
}: ButtonProps) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all";
  const variantClasses =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : "bg-gray-200 text-gray-800 hover:bg-gray-300";
  const sizeClasses =
    size === "sm"
      ? "px-3 py-1 text-sm"
      : size === "ms"
      ? "px-4 py-2 text-base"
      : "px-5 py-3 text-lg";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${sizeClasses}`}
    >
      {startIcon && <span className="mr-2">{startIcon}</span>}
      {text}
      {endIcon && <span className="ml-2">{endIcon}</span>}
    </button>
  );
};

// Example usage inside a component
export default function App() {
  return (
    <div className="p-6">
      <Button
        variant="primary"
        size="sm"
        text="Click Me"
        onClick={() => alert("Button Clicked!")}
      />
    </div>
  );
}
