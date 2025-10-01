import { ReactElement } from "react";

interface SidebarItemProps {
  text: string;
  icon: ReactElement;
}

export function SidebarItem({ text, icon }: SidebarItemProps) {
  return (
    <div className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded-md cursor-pointer">
      {icon} 
      <span>{text}</span>
    </div>
  );
}
