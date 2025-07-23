
import React, { useState } from 'react';
import Home from '../pages/Home';
import { Outlet } from 'react-router-dom';
import { NavigationHeader } from '../pages/NavigationHeader';

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [privateMode, setPrivateMode] = useState(false);

  return (
    <div className="relative h-screen w-screen overflow-hidden flex">

      <aside className={`fixed top-0 left-0 h-full w-64 z-40 bg-white transform transition-transform duration-300 ease-in-out
                ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
                lg:translate-x-0`}>
        <Home closeMenu={() => setIsMenuOpen(false)} />
      </aside>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col h-full lg:pl-64 overflow-hidden">
        <NavigationHeader
          isMenuOpen={isMenuOpen}
          onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode((prev) => !prev)}
          privateMode={privateMode}
          togglePrivateMode={() => setPrivateMode((prev) => !prev)}
        />

        <main className="flex-1 overflow-y-auto bg-gray-100">
          <Outlet
            darkMode={darkMode}
            toggleDarkMode={() => setDarkMode((prev) => !prev)}
            togglePrivateMode={() => setPrivateMode((prev) => !prev)}
            privateMode={privateMode}
          />
        </main>
      </div>
    </div>
  );
}