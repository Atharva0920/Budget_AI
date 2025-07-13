import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Shield, TrendingUp, PieChart, Sparkles, CheckCircle } from 'lucide-react';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      // Here you would normally handle the login logic
      console.log('Login attempt:', { email, password, rememberMe });
    }, 2000);
  };

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

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      content: "Bachat Raah has transformed how I manage my finances. The AI assistant is incredibly helpful!",
      avatar: "SJ"
    },
    {
      name: "Michael Chen",
      role: "Software Engineer",
      content: "Finally, a financial app that actually understands my needs. The insights are game-changing.",
      avatar: "MC"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex">
      {/* Left Side - Branding & Features */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-700"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-emerald-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-48 h-48 bg-teal-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        
        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">💰</span>
            </div>
            <span className="font-bold text-3xl">Bachat Raah</span>
          </div>

          {/* Hero Content */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              Take Control of Your
              <span className="block text-emerald-200">Financial Future</span>
            </h1>
            <p className="text-xl text-emerald-100 leading-relaxed">
              Join thousands of users who trust Bachat Raah to manage their finances with AI-powered insights and intuitive tools.
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

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">M</span>
            </div>
            <span className="font-bold text-3xl text-gray-800">Bachat Raah</span>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
              <p className="text-gray-600">Sign in to your account to continue</p>
            </div>

            {/* Social Login */}
            <div className="space-y-3 mb-6">
              <button className="w-full flex items-center justify-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200 group">
                <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-blue-600 rounded"></div>
                <span className="font-medium text-gray-700 group-hover:text-emerald-700">Continue with Google</span>
              </button>
              <button className="w-full flex items-center justify-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200 group">
                <div className="w-5 h-5 bg-gradient-to-r from-gray-800 to-gray-900 rounded"></div>
                <span className="font-medium text-gray-700 group-hover:text-emerald-700">Continue with Apple</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with email</span>
              </div>
            </div>

            {/* Email/Password Form */}
            <div className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff size={18} className="text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye size={18} className="text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                  />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 ${
                  isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:from-emerald-600 hover:to-teal-700'
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center mt-6">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <button className="text-emerald-600 hover:text-emerald-700 font-semibold">
                  Sign up for free
                </button>
              </p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Shield size={14} className="text-emerald-500" />
                <span>256-bit SSL</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle size={14} className="text-emerald-500" />
                <span>FDIC Insured</span>
              </div>
              <div className="flex items-center gap-1">
                <Sparkles size={14} className="text-emerald-500" />
                <span>SOC 2 Certified</span>
              </div>
            </div>
          </div>

          {/* Mobile Testimonial */}
          <div className="lg:hidden mt-8 bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-2xl border border-emerald-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-semibold">
                {testimonials[0].avatar}
              </div>
              <div>
                <div className="font-semibold text-gray-800">{testimonials[0].name}</div>
                <div className="text-sm text-gray-600">{testimonials[0].role}</div>
              </div>
            </div>
            <p className="text-gray-700 italic">"{testimonials[0].content}"</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;