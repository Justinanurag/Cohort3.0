import { Twitter, Youtube, BrainCircuit, LogOut, Home, Search, BarChart3, Settings } from "lucide-react";
import { SidebarItem } from "./SidebarItem";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useContent } from "../hooks/useContent";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState("User");
  const [userEmail, setUserEmail] = useState("");
  const contents = useContent();

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserName(user.name || "User");
        setUserEmail(user.email || "");
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    }
  }, []);

  // Calculate statistics
  const totalContent = contents.length;
  const youtubeCount = contents.filter(c => c.type === "youtube").length;
  const twitterCount = contents.filter(c => c.type === "twitter").length;

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log out",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#6366f1",
      cancelButtonColor: "#6b7280",
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

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="h-screen bg-gradient-to-b from-white via-gray-50 to-white border-r border-gray-200 w-72 fixed left-0 top-0 flex flex-col shadow-xl z-10">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50/50 to-purple-50/50">
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate("/dashboard")}
        >
          <div className="p-2.5 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl group-hover:scale-110 transition-transform duration-200 shadow-lg">
            <BrainCircuit
              size={28}
              className="text-white"
            />
          </div>
          <div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent block">
              Second Brain
            </span>
            <span className="text-xs text-gray-500">Your Knowledge Hub</span>
          </div>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg ring-2 ring-white">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">{userName}</p>
            <p className="text-xs text-gray-500 truncate">{userEmail}</p>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-indigo-100">
          <div className="text-center">
            <div className="text-lg font-bold text-indigo-600">{totalContent}</div>
            <div className="text-xs text-gray-600">Total</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-red-600">{youtubeCount}</div>
            <div className="text-xs text-gray-600">YouTube</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-400">{twitterCount}</div>
            <div className="text-xs text-gray-600">Twitter</div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search content..."
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white"
          />
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        <SidebarItem
          text="Dashboard"
          icon={<Home size={20} className={isActive("/dashboard") ? "text-indigo-600" : "text-gray-500"} />}
          onClick={() => navigate("/dashboard")}
          className={isActive("/dashboard") ? "bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600" : "hover:bg-indigo-50 hover:text-indigo-700"}
        />
        
        <div className="pt-4">
          <div className="flex items-center justify-between mb-2 px-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Content Sources
            </p>
            <BarChart3 size={14} className="text-gray-400" />
          </div>
          <SidebarItem
            text="YouTube"
            icon={<Youtube size={20} className="text-red-600" />}
            className="hover:bg-red-50"
          />
          <SidebarItem
            text="Twitter"
            icon={<Twitter size={20} className="text-blue-400" />}
            className="hover:bg-blue-50"
          />
        </div>

        <div className="pt-4">
          <div className="flex items-center justify-between mb-2 px-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Tools
            </p>
            <Settings size={14} className="text-gray-400" />
          </div>
          <SidebarItem
            text="Settings"
            icon={<Settings size={20} className="text-gray-500" />}
            className="hover:bg-gray-50"
            onClick={() => {
              Swal.fire({
                icon: "info",
                title: "Settings",
                text: "Settings panel coming soon!",
                timer: 2000,
                showConfirmButton: false,
              });
            }}
          />
        </div>
      </div>

      {/* Logout Section */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <SidebarItem
          text="Log Out"
          icon={<LogOut size={20} className="text-red-500" />}
          onClick={handleLogout}
          className="hover:bg-red-50 hover:text-red-700"
        />
      </div>
    </div>
  );
}
