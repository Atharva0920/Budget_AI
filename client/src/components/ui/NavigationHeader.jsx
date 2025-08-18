import React, { useState } from "react";
import { Search, Bell, User, Eye, EyeOff, Sun, Moon, Menu, X, HandCoins } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import ProfileModal from "../../pages/ProfileModal";

export function NavigationHeader({ onMenuClick, isMenuOpen }) {
  const { darkMode, toggleDarkMode, privateMode, togglePrivateMode } = useTheme();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
      <header
        className={`${
          darkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 border-gray-200"
        } border-b px-4 sm:px-6 py-4 w-full shadow-sm`}
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Left Section */}
          <div className={`flex gap-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
            <button className="lg:hidden p-2 rounded-lg" onClick={onMenuClick}>
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex items-center gap-2">
              <HandCoins size={36} />
              <span className="font-semibold text-4xl">Budget AI</span>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center flex-wrap gap-3 sm:gap-4">
            {/* Search */}
            <div className="relative w-full sm:w-auto">
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  darkMode ? "text-white" : "text-gray-500"
                }`}
                size={18}
              />
              <input
                type="text"
                placeholder="Search transactions..."
                className={`w-full sm:w-64 pl-10 pr-4 py-2 rounded-lg border ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            {/* Private Mode */}
            <button
              onClick={togglePrivateMode}
              className={`p-2 rounded-lg ${darkMode ? "hover:bg-gray-700 text-white" : "hover:bg-gray-100"}`}
            >
              {privateMode ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>

            {/* Dark Mode */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg ${darkMode ? "hover:bg-gray-700 text-white" : "hover:bg-gray-100"}`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Notifications */}
            <button
              className={`p-2 rounded-lg ${darkMode ? "hover:bg-gray-700 text-white" : "hover:bg-gray-100"}`}
            >
              <Bell size={20} />
            </button>

            {/* Profile Button */}
            <button
              onClick={() => setIsProfileOpen(true)}
              className={`p-2 rounded-lg ${darkMode ? "hover:bg-gray-700 text-white" : "hover:bg-gray-100"}`}
            >
              <User size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Profile Modal */}
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </>
  );
}
