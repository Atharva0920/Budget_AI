import React, { useState } from 'react';
import { HandCoins, BarChart3, CreditCard, TrendingUp, Users, Calendar, Target, TrendingDown, PieChart, HelpCircle, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useNavigationTitleContext } from '../contexts/NavigationTitleContext';

const Home = (closeMenu) => {
    const {title, setTitle} = useNavigationTitleContext();

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
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className={`
                w-64 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white flex flex-col
                lg:relative lg:translate-x-0 lg:z-auto
                fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out`}>
                {/* Header */}
                <div className="p-6 border-b border-emerald-300">
                    <div className="flex items-center gap-2">
                        <HandCoins size={36} />
                        <span className="font-semibold text-4xl">Budget AI</span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 overflow-y-auto">
                    <ul className="space-y-2">
                        {navigationItems.map((item, index) => (
                            <li key={index}>
                                <NavLink
                                    to={item.path}
                                    key={index}
                                    className={({ isActive }) =>
                                        `w-full flex items-center gap-3 p-3 rounded text-left transition-colors ${isActive ? 'bg-white text-black' : 'hover:bg-white hover:text-black'
                                        }`
                                    }
                                    onClick={() =>{
                                        console.log(item.label)
                                        setTitle(item.label);
                                        // closeMenu?.();
                                        }
                                    }
                                >
                                    <item.icon size={16} />
                                    <span className="text-base">{item.label}</span>
                                    {item.badge && (
                                        <span className="ml-auto text-xs bg-gradient-to-br from-orange-600 to-purple-500 px-2 py-1 rounded">
                                            {item.badge}
                                        </span>
                                    )}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* User Profile */}
                <div className="p-4 border-t border-emerald-300">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                            <User size={16} />
                        </div>
                        <span className="text-sm">Jane Smith</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;