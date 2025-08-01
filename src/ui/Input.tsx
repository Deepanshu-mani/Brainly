import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  reference: React.Ref<HTMLInputElement>;
}

export function Input({ placeholder, reference, ...rest }: InputProps) {
  return (
    <div className="relative">
      <input
        placeholder={placeholder}
        type="text"
        ref={reference}
        {...rest}
        className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all duration-200 backdrop-blur-sm hover:bg-white/70 dark:bg-dark-surface dark:border-dark-border dark:text-dark-text dark:placeholder-dark-text-muted dark:focus:border-dark-primary dark:focus:ring-dark-primary/20 dark:hover:bg-dark-surface-alt"
      />
    </div>
  );
}