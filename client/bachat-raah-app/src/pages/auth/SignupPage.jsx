import React, { useState } from 'react';
import { TrendingUp, Clock, Shield, Eye, EyeOff } from 'lucide-react';
import { href } from 'react-router-dom';

export default function SignUpPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Green Section */}
            <div className="flex-1 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-12 flex flex-col justify-between">
                {/* Header */}
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">₹</span>
                    </div>
                    <h1 className="text-2xl font-bold">Bachat Raah</h1>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col justify-center">
                    <h2 className="text-4xl font-bold mb-6 leading-tight">
                        Take Control of Your<br />
                        Financial Future
                    </h2>
                    <p className="text-lg mb-12 opacity-90 max-w-md">
                        Join thousands of users who trust Bachat Raah to manage their finances with AI-powered insights and intuitive tools.
                    </p>

                    {/* Features */}
                    <div className="space-y-6 mb-12">
                        <div className="flex items-start space-x-4">
                            <div className="mt-1">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">Investment Tracking</h3>
                                <p className="text-sm opacity-80">Monitor your portfolio performance in real-time</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="mt-1">
                                <Clock className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">Smart Analytics</h3>
                                <p className="text-sm opacity-80">Get insights into your spending patterns and trends</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="mt-1">
                                <Shield className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">Bank-level Security</h3>
                                <p className="text-sm opacity-80">Your financial data is protected with industry-leading encryption</p>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex space-x-12">
                        <div>
                            <div className="text-3xl font-bold">50K+</div>
                            <div className="text-sm opacity-80">Active Users</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold">$2.5B+</div>
                            <div className="text-sm opacity-80">Assets Tracked</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold">4.9★</div>
                            <div className="text-sm opacity-80">User Rating</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Sign Up Form */}
            <div className="flex-1 bg-gray-50 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h2>
                            <p className="text-gray-600">Sign up to get started with your financial journey</p>
                        </div>

                        {/* Social Login Buttons */}
                        <div className="space-y-3 mb-6">
                            <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <span>Continue with Google</span>
                            </button>

                            <button className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.719-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.751-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                                </svg>
                                <span>Continue with Apple</span>
                            </button>
                        </div>

                        <div className="text-center text-gray-500 mb-6">
                            <span>Or continue with email</span>
                        </div>

                        {/* Form */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email address
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent pl-10"
                                        placeholder="Enter your email"
                                        required
                                    />
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent pl-10 pr-12"
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="rememberMe"
                                        checked={formData.rememberMe}
                                        onChange={handleInputChange}
                                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                                    />
                                    <label className="ml-2 block text-sm text-gray-700">
                                        Remember me
                                    </label>
                                </div>
                                <button
                                    type="button"
                                    className="text-sm text-emerald-600 hover:text-emerald-500"
                                >
                                    Forgot password?
                                </button>
                            </div>

                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
                            >
                                <span>Sign up</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>

                        <p className="text-center text-sm text-gray-600 mt-6">
                            Already have an account?{' '}
                            <button className="text-emerald-600 hover:text-emerald-500 font-medium" onClick={()=>{
                                window.location.href = '/login';
                            }}>
                                Sign in for free
                            </button>
                        </p>
                    </div>

                    {/* Security Badges */}
                    <div className="flex items-center justify-center space-x-6 mt-6 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                            <Shield className="w-4 h-4 text-emerald-500" />
                            <span>256-bit SSL</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Shield className="w-4 h-4 text-emerald-500" />
                            <span>FDIC Insured</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Shield className="w-4 h-4 text-emerald-500" />
                            <span>SOC 2 Certified</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}