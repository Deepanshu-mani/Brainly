import type { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
  hover?: boolean;
}

const variantClasses = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-200 text-purple-600",
};

export function Button({
  variant,
  text,
  startIcon,
  fullWidth,
  onClick,
  loading ,
  hover,
}: ButtonProps) {
  const classes =
    variantClasses[variant] +
    " " +
    "px-4 py-2 rounded-md font-light flex items-center justify-center transition duration-200 gap-2 all-ease" +
    (loading ? " opacity-40" : hover ? " hover:scale-95" : "") +
    (fullWidth ? " w-full" : "");
  return (
    <button
      onClick={onClick}
      className={classes} disabled={loading}
    >
      {startIcon}
      <span>{text}</span>
    </button>
  );
}
