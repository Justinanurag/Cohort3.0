import type { ReactElement } from "react";


interface SidebarItemProps {
  text: string;
  icon: ReactElement;
  onClick?: () => void;
  className?: string;
}

export function SidebarItem({ text, icon, onClick, className }: SidebarItemProps) {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 group ${className || 'hover:bg-indigo-50 hover:text-indigo-700'}`}
      onClick={onClick}
    >
      <div className="flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
        {icon}
      </div>
      <span className="font-medium text-sm text-gray-800 group-hover:font-semibold truncate">
        {text}
      </span>
    </div>
  );
}