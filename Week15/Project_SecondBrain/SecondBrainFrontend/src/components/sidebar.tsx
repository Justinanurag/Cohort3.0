import { Twitter, Youtube, BrainCircuit, LogOut } from "lucide-react";
import { SidebarItem } from "./SidebarItem";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log out",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      // Clear auth info
      localStorage.clear();

      // Show success toast
      Swal.fire({
        icon: "success",
        title: "Logged Out",
        text: "You have been successfully logged out.",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/signin");
    }
  };

  return (
    <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 p-6 flex flex-col">
      {/* Logo */}
      <div
        className="flex items-center gap-3 mb-8 cursor-pointer group"
        onClick={() => navigate("/dashboard")}
      >
        <BrainCircuit
          size={36}
          className="text-indigo-600 group-hover:scale-110 transition-transform duration-200"
        />
        <span className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
          Second Brain
        </span>
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
