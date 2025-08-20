import type { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  // hover?: boolean;
}

const variantClasses = {
  primary: "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg hover:shadow-xl dark:from-dark-primary dark:to-dark-primary dark:hover:from-dark-primary-hover dark:hover:to-dark-primary-hover",
  secondary: "bg-gradient-to-r from-purple-100 to-purple-200 hover:from-purple-200 hover:to-purple-300 text-purple-700 shadow-md hover:shadow-lg dark:from-dark-surface dark:to-dark-surface-alt dark:hover:from-dark-surface-alt dark:hover:to-dark-border dark:text-dark-text dark:border dark:border-dark-border",
};

export function Button({
  variant,
  text,
  startIcon,
  fullWidth,
  onClick,
  loading,
  className,
}: ButtonProps) {
  const baseClasses = "px-6 py-3 rounded-xl font-medium flex items-center justify-center transition-all duration-200 gap-2";
  const variantClass = variantClasses[variant];
  const loadingClass = loading ? " opacity-60 cursor-not-allowed" : "";
  const widthClass = fullWidth ? " w-full" : "";
  const classes = `${baseClasses} ${variantClass} ${loadingClass} ${widthClass} ${className || ''}`.trim();
  
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