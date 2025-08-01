import type { ReactElement } from "react";

export function SidebarItem({
  text,
  icon,
  active,
  onClick,
}: {
  text: string;
  icon: ReactElement;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <div 
      className={`flex ${active ? 'bg-purple-200 border-purple-600 dark:bg-dark-primary/20 dark:border-dark-primary' : 'hover:bg-gray-100 hover:border-gray-200 dark:hover:bg-dark-surface-alt dark:hover:border-dark-border'} border-r-8 transition-all ease-in-out duration-300`}
      onClick={onClick}
    >
      <div className="pl-10 p-2 flex items-center gap-2 cursor-pointer dark:text-dark-text">
        {icon} {text}
      </div>
    </div>
  );
}
