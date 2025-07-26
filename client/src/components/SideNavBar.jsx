import React, { useContext, useState } from 'react';
import { HandCoins, BarChart3, CreditCard, TrendingUp, X, Menu, Users, Calendar, Target, TrendingDown, PieChart, HelpCircle, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';

const Home = ({ closeMenu }) => {
    const{darkMode} = useContext(ThemeContext)
    const navigationItems = [
        { icon: BarChart3, label: 'Dashboard', path: '/dashboard' },
        { icon: CreditCard, label: 'Accounts', path: '/accounts' },
        { icon: TrendingUp, label: 'Transactions', path: '/transactions' },
        { icon: PieChart, label: 'Cash Flow', path: '/cash-flow' },
        { icon: BarChart3, label: 'Reports', path: '/reports', badge: 'BETA' },
        { icon: Target, label: 'Budget', path: '/budget' },
        { icon: Calendar, label: 'Recurring', path: '/recurring' },
        { icon: Target, label: 'Goals', path: '/goals' },
        { icon: TrendingDown, label: 'Investments', path: '/investments' },
        { icon: HelpCircle, label: 'Advice', path: '/advice' },
        { icon: Users, label: 'Assistant', path: '/assistant' }
    ];

    return (
        <div className={`h-full flex flex-col border-r ${darkMode ? 'bg-gray-800 text-white border-gray-700 shadow' : 'bg-white text-black border-gray-200 shadow'}`}>
            {/* Scrollable Navigation Section */}
            <nav className="flex-1 overflow-y-auto p-4">
                <ul className="space-y-3">
                    {navigationItems.map((item, index) => (
                        <li key={index}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `w-full flex items-center gap-3 p-2 rounded-md text-left transition-colors ${isActive
                                        ? darkMode
                                            ? 'bg-gray-700 text-white'
                                            : 'bg-gradient-to-br from-amber-300 to-amber-400 text-black'
                                        : darkMode
                                            ? 'hover:bg-gray-700 text-white'
                                            : 'hover:bg-gradient-to-br hover:from-amber-300 hover:to-amber-400 hover:text-black'
                                    }`
                                }
                                onClick={() => closeMenu && closeMenu()}
                            >
                                <item.icon size={16} />
                                <span className="text-base">{item.label}</span>
                                {item.badge && (
                                    <span className="ml-auto text-xs font-semibold bg-gradient-to-br from-indigo-200 to-purple-300 px-2 py-1 rounded">
                                        {item.badge}
                                    </span>
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Sticky/Frozen User Section */}
            <div className={`p-4 border-t ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
                <div className="flex items-center space-x-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}>
                        <User size={16} />
                    </div>
                    <span className="text-sm">{`Jane Smith`}</span>
                </div>
            </div>
        </div>

    );
};

export default Home;