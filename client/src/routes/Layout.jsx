import React, { useState } from 'react';
import SideNavBar from '../components/ui/SideNavBar';
import { Outlet } from 'react-router-dom';
import { NavigationHeader } from '../components/ui/NavigationHeader'

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [privateMode, setPrivateMode] = useState(false);

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">

      {/* Top Navigation */}
      <div className="z-50">
        <NavigationHeader
          isMenuOpen={isMenuOpen}
          onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      </div>

      {/* Main content below nav */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <aside className={`fixed lg:static top-16 left-0 h-[calc(100vh-4rem)] w-64 z-40 bg-white transform transition-transform duration-300 ease-in-out 
                          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
          <SideNavBar
            closeMenu={() => setIsMenuOpen(false)}
            setTitle
            isMenuOpen
            onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        </aside>
    
        {/* Dim background for small screens */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-gray-100">
          <Outlet
            context={{
              darkMode,
              toggleDarkMode: () => setDarkMode((prev) => !prev),
              privateMode,
              togglePrivateMode: () => setPrivateMode((prev) => !prev),
            }}
          />
        </main>
      </div>
    </div>
  );
}
