import { Twitter, Youtube, BrainCircuit } from "lucide-react";
import { SidebarItem } from "./SidebarItem";

export function Sidebar() {
  return (
    <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 p-6 flex flex-col gap-6">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-6  cursor-pointer">
        <BrainCircuit size={38} className="text-blue-600 " />
        <span className="text-2xl font-bold text-gray-800">Second Brain</span>
      </div>

      {/* Sidebar items */}
      <SidebarItem
        text="YouTube"
        icon={<Youtube size={30} color="#FF0000" />}
      />
      <SidebarItem
        text="Twitter"
        icon={<Twitter size={30} color="#1DA1F2" />}
      />
    </div>
  );
}
