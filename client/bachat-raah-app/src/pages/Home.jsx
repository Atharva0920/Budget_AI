import React, { useState } from 'react';
import { X, HandCoins, Search, Bell, Menu, BarChart3, CreditCard, TrendingUp, Users, Calendar, Target, TrendingDown, PieChart, HelpCircle, User } from 'lucide-react';

const Home = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigationItems = [
        { icon: BarChart3, label: 'Dashboard', active: false },
        { icon: CreditCard, label: 'Accounts', active: false },
        { icon: TrendingUp, label: 'Transactions', active: false },
        { icon: PieChart, label: 'Cash Flow', active: false },
        { icon: BarChart3, label: 'Reports', active: false, badge: 'BETA' },
        { icon: Target, label: 'Budget', active: false },
        { icon: Calendar, label: 'Recurring', active: false },
        { icon: Target, label: 'Goals', active: false },
        { icon: TrendingDown, label: 'Investments', active: false },
        { icon: HelpCircle, label: 'Advice', active: false },
        { icon: Users, label: 'Assistant', active: true }
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Mobile Menu Button */}
            <button
                className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-emerald-600 text-white rounded-md shadow-lg"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Overlay */}
            {isMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                w-64 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white flex flex-col
                lg:relative lg:translate-x-0 lg:z-auto
                fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out
                ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                {/* Header */}
                <div className="p-6 border-b border-emerald-300">
                    <div className="flex items-center gap-2">
                        <HandCoins size={36} />
                        <span className="font-semibold text-4xl">Bachat AI</span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 overflow-y-auto">
                    <ul className="space-y-2">
                        {navigationItems.map((item, index) => (
                            <li key={index}>
                                <button
                                    className={`w-full flex items-center gap-3 p-3 rounded text-left transition-colors ${item.active ? 'bg-white text-black' : 'hover:bg-white hover:text-black'
                                        }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <item.icon size={16} />
                                    <span className="text-base">{item.label}</span>
                                    {item.badge && (
                                        <span className="ml-auto text-xs bg-gradient-to-br from-orange-600 to-purple-500 px-2 py-1 rounded">
                                            {item.badge}
                                        </span>
                                    )}
                                </button>
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

            {/* Footer */}
            <div className="hidden lg:block fixed bottom-0 right-0 p-4 bg-white border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                </div>
            </div>
        </div>
    );
};

export default Home;