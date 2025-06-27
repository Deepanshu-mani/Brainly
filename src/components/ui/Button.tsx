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
  primary: "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg hover:shadow-xl",
  secondary: "bg-gradient-to-r from-purple-100 to-purple-200 hover:from-purple-200 hover:to-purple-300 text-purple-700 shadow-md hover:shadow-lg",
};

export function Button({
  variant,
  text,
  startIcon,
  fullWidth,
  onClick,
  loading,
  hover,
}: ButtonProps) {
  const classes =
    variantClasses[variant] +
    " " +
    "px-6 py-3 rounded-xl font-medium flex items-center justify-center transition-all duration-200 gap-2" +
    (loading ? " opacity-60 cursor-not-allowed" : "") +
    (fullWidth ? " w-full" : "");
  
  return (
    <button
      onClick={onClick}
      className={classes} 
      disabled={loading}
    >
      {loading && (
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
      )}
      {!loading && startIcon}
      <span>{text}</span>
    </button>
  );
}