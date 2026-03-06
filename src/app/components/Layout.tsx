import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { Sprout, Plus, LogOut, User as UserIcon } from "lucide-react";
import { useApp } from "../contexts/AppContext";
import { LogActionModal } from "./LogActionModal";
import { useState } from "react";

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalXP, level, user, logout } = useApp();
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/" },
    { name: "Challenges", path: "/challenges" },
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "Achievements", path: "/achievements" },
    { name: "Redeem", path: "/redeem" },
    { name: "How It Works", path: "/how-it-works" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#0f1419]">
      <nav className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl">
                <span className="text-white">Re</span>
                <span className="text-[#bef264]">Wear</span>
              </span>
              <Sprout className="w-5 h-5 text-[#bef264]" />
            </Link>

            <div className="flex items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-6 py-2 rounded-full transition-colors ${
                    isActive(item.path)
                      ? "bg-[#bef264] text-black"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsLogModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#bef264] text-black rounded-full hover:bg-[#a8d957] transition-colors"
              >
                <Plus className="w-4 h-4" />
                Log Action
              </button>
              
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <span className="text-gray-300">{totalXP} XP</span>
                <span className="text-gray-500">·</span>
                <span className="text-gray-300">Level {level}</span>
              </div>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#1e293b] rounded-full border border-gray-800 hover:border-gray-700 transition-colors"
                >
                  <UserIcon className="w-4 h-4 text-gray-400" />
                  <span className="text-white">{user?.name}</span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#1e293b] border border-gray-800 rounded-xl shadow-lg overflow-hidden">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-3 text-gray-300 hover:bg-[#0f172a] transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Outlet />
      </main>

      <LogActionModal
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
      />
    </div>
  );
}
