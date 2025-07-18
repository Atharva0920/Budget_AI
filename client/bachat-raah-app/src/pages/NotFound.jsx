import React from 'react';
import { HandCoins, Home, ArrowLeft, HelpCircle } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <div className="bg-white border-b border-gray-200 p-4">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <HandCoins size={32} className="text-emerald-600" />
                        <span className="font-semibold text-2xl text-gray-800">Bachat AI</span>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                        <Home size={16} />
                        <span className="hidden sm:inline">Back to Dashboard</span>
                    </button>
                </div>
            </div>

            <div className="flex-1 flex items-center justify-center p-4">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="relative mb-8">
                        <div className="text-8xl sm:text-9xl font-bold text-emerald-600 opacity-20">
                            404
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-white rounded-full p-6 shadow-lg border-4 border-emerald-600">
                                <HandCoins size={64} className="text-emerald-600" />
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                            Oops! Page Not Found
                        </h1>
                        <p className="text-lg text-gray-600 mb-2">
                            Looks like this page went on a spending spree and disappeared from our budget!
                        </p>
                        <p className="text-gray-500">
                            Don't worry, your financial data is safe and sound.
                        </p>
                    </div>


                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium" onClick={() => window.history.back()}>
                            <ArrowLeft size={18} />
                            Go Back
                        </button>
                        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-emerald-600 border-2 border-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors font-medium" onClick={() => window.location.href = '/'}>
                            <Home size={18} />
                            Dashboard
                        </button>
                        
                    </div>

                </div>
            </div>

            <div className="bg-white border-t border-gray-200 p-4">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>© 2025 Bachat AI</span>
                        <span>•</span>
                        <a href="#" className="hover:text-emerald-600 transition-colors">Privacy Policy</a>
                        <span>•</span>
                        <a href="#" className="hover:text-emerald-600 transition-colors">Terms of Service</a>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors">
                            <HelpCircle size={16} />
                            Help & Support
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;