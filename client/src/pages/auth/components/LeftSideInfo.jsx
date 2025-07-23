import React from 'react';
import { TrendingUp, PieChart, Shield } from 'lucide-react';

export default function LeftSideInfo() {
    const features = [
            {
                icon: TrendingUp,
                title: "Investment Tracking",
                description: "Monitor your portfolio performance in real-time"
            },
            {
                icon: PieChart,
                title: "Smart Analytics",
                description: "Get insights into your spending patterns and trends"
            },
            {
                icon: Shield,
                title: "Bank-level Security",
                description: "Your financial data is protected with industry-leading encryption"
            }
        ];
    return (
       <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-600"></div>
                <div className="absolute inset-0 bg-black/10"></div>

                {/* Animated Background Elements */}
                <div className="absolute top-20 left-20 w-32 h-32 bg-emerald-400/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-40 right-20 w-48 h-48 bg-teal-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

                <div className="relative z-10 flex flex-col justify-center p-12 text-white">
                    {/* Logo */}
                    <div className="flex items-center gap-3 mb-12">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                            <span className="text-white font-bold text-2xl">💰</span>
                        </div>
                        <span className="font-bold text-3xl">Budget AI</span>
                    </div>

                    {/* Hero Content */}
                    <div className="mb-12">
                        <h1 className="text-4xl font-bold mb-4 leading-tight">
                            Take Control of Your
                            <span className="block text-emerald-200">Financial Future</span>
                        </h1>
                        <p className="text-xl text-emerald-100 leading-relaxed">
                            Join thousands of users who trust Budget AI to manage their finances with AI-powered insights and intuitive tools.
                        </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-6">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-start gap-4 group">
                                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                    <feature.icon size={20} className="text-emerald-200" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-white">{feature.title}</h3>
                                    <p className="text-emerald-100 text-sm leading-relaxed">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Stats */}
                    <div className="mt-12 grid grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">50K+</div>
                            <div className="text-sm text-emerald-200">Active Users</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">$2.5B+</div>
                            <div className="text-sm text-emerald-200">Assets Tracked</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">4.9★</div>
                            <div className="text-sm text-emerald-200">User Rating</div>
                        </div>
                    </div>
                </div>
            </div>
    );
}