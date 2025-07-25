import React from 'react';
import { Search, Bell, User, Eye, EyeOff, Sun, Moon, Menu, X } from 'lucide-react';
import { ThemeContext } from '../contexts/ThemeContext';
import { useNavigationTitleContext } from '../contexts/NavigationTitleContext';

export function NavigationHeader({ onMenuClick, isMenuOpen }) {
    const { 
        darkMode, 
        toggleDarkMode, 
        privateMode, 
        togglePrivateMode 
    } = React.useContext(ThemeContext);
    const { title, setTitle} = useNavigationTitleContext();
    return (
        <header
            className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                } border-b px-4 sm:px-6 py-4 w-full`}
        >
            <div className="flex items-center justify-between flex-wrap gap-4">

                <div className="flex items-center gap-4"><button className={`lg:hidden p-2 rounded-lg ${darkMode ? 'text-white' : 'text-gray-900'}`} onClick={onMenuClick}>
                    {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
                    <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {title}
                    </h2>
                </div>

                <div className="flex items-center flex-wrap gap-3 sm:gap-4">
                    <div className="relative w-full sm:w-auto">
                        <Search
                            className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-white' : 'text-gray-500'
                                }`}
                            size={18}
                        />
                        <input
                            type="text"
                            placeholder="Search transactions..."
                            className={`w-full sm:w-64 pl-10 pr-4 py-2 rounded-lg border ${darkMode
                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                : 'bg-white border-gray-300'
                                } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                        />
                    </div>

                    <div className="relative group">
                        <button
                            onClick={togglePrivateMode}
                            className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100'}`}
                        >
                            {privateMode ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                        <div className="absolute right-0 mt-2 w-max px-3 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                            Privacy Mode
                        </div>
                    </div>

                    <div className="relative group">
                        <button
                            onClick={toggleDarkMode}
                            className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100'}`}
                            
                        >
                            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <div className="absolute right-0 mt-2 w-max px-3 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                            Toggle Dark Mode
                        </div>
                    </div>

                    <div className="relative group">
                        <button
                            className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100'}`}
                           
                        >
                            <Bell size={20} />
                        </button>
                        <div className="absolute right-0 mt-2 w-max px-3 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                            Notifications
                        </div>
                    </div>

                    <div className="relative group">
                        <button
                            className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100'}`}
                            
                        >
                            <User size={20} />
                        </button>
                        <div className="absolute right-0 mt-2 w-max px-3 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                            Profile
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
