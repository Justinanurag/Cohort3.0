import { Twitter, Youtube, BrainCircuit, LogOut } from "lucide-react";
import { SidebarItem } from "./SidebarItem";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
    const navigate = useNavigate();

    const handleLogout=()=>{
      //clear the auth info like token  from local storage 
      console.log("Logout clicked");
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/signin");
    };

return (
  <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 p-6 flex flex-col">
    {/* Logo */}
    <div className="flex items-center gap-3 mb-6 cursor-pointer">
      <BrainCircuit size={38} className="text-blue-600" />
      <span className="text-2xl font-bold text-gray-800">Second Brain</span>
    </div>

    {/* Sidebar items */}
    <div className="flex flex-col gap-6">
      <SidebarItem
        text="YouTube"
        icon={<Youtube size={30} color="#FF0000" />}
      />
      <SidebarItem
        text="Twitter"
        icon={<Twitter size={30} color="#1DA1F2" />}
      />
    </div>

    {/* Push logout to bottom */}
    <div className="mt-auto">
      <SidebarItem
        text="Log Out"
        icon={<LogOut size={30} color="#F0310A" />}
        onClick={handleLogout}
      />
    </div>
  </div>
);

}
