import { useState, useContext } from 'react';

import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    PiggyBank,
    Calendar,
    Download,
    Filter,
    BarChart3,
    PieChart,
    LineChart,
    ArrowUpRight,
    ArrowDownRight,
    Target,
    Wallet
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart as RechartsPieChart, Cell, LineChart as RechartsLineChart, Line, Area, AreaChart, Pie, Tooltip } from 'recharts';
import { ThemeContext } from '../contexts/ThemeContext';
import { formatCurrency } from '../utils/formatCurrency';

const ReportsPage = () => {
    console.log('ResponsiveContainer:', ResponsiveContainer);

    const [selectedPeriod, setSelectedPeriod] = useState('thisMonth');
    const [selectedChart, setSelectedChart] = useState('spending');
    const { darkMode, privateMode } = useContext(ThemeContext);
    // Mock data for demonstration
    const summaryData = {
        totalIncome: 5200,
        totalExpenses: 3800,
        savings: 1400,
        netBalance: 1400
    };

    const spendingByCategory = [
        { name: 'Food & Dining', value: 650, color: '#10B981' },
        { name: 'Transportation', value: 320, color: '#3B82F6' },
        { name: 'Rent', value: 1200, color: '#8B5CF6' },
        { name: 'Entertainment', value: 420, color: '#F59E0B' },
        { name: 'Healthcare', value: 85, color: '#EF4444' },
        { name: 'Utilities', value: 230, color: '#6366F1' },
        { name: 'Travel', value: 150, color: '#06B6D4' },
        { name: 'Education', value: 95, color: '#8B5CF6' }
    ];

    const monthlyTrends = [
        { month: 'Jan', income: 4800, expenses: 3200, savings: 1600 },
        { month: 'Feb', income: 5100, expenses: 3400, savings: 1700 },
        { month: 'Mar', income: 4900, expenses: 3600, savings: 1300 },
        { month: 'Apr', income: 5300, expenses: 3900, savings: 1400 },
        { month: 'May', income: 5200, expenses: 3800, savings: 1400 },
        { month: 'Jun', income: 5400, expenses: 4100, savings: 1300 }
    ];

    const periodOptions = [
        { value: 'thisWeek', label: 'This Week' },
        { value: 'thisMonth', label: 'This Month' },
        { value: 'last3Months', label: 'Last 3 Months' },
        { value: 'thisYear', label: 'This Year' }
    ];

    const chartOptions = [
        { value: 'spending', label: 'Spending by Category', icon: PieChart },
        { value: 'trends', label: 'Monthly Trends', icon: LineChart },
        { value: 'comparison', label: 'Income vs Expenses', icon: BarChart3 }
    ];

    return (
        <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Financial Reports</h1>
                        <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Analyze your income, expenses, and savings patterns</p>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Period Filter */}
                        <div className="relative">
                            <select
                                value={selectedPeriod}
                                onChange={(e) => setSelectedPeriod(e.target.value)}
                                className={`appearance-none px-4 py-2 pr-8 rounded-lg border ${darkMode
                                    ? 'bg-gray-800 border-gray-700 text-white'
                                    : 'bg-white border-gray-200 text-gray-900'
                                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            >
                                {periodOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                            <Calendar className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={16} />
                        </div>

                        {/* Export Button */}
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 hover:scale-105">
                            <Download size={18} />
                            Export
                        </button>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Total Income */}
                    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-all duration-200 hover:shadow-md`}>
                        <div className="flex items-center justify-between mb-2">
                            <TrendingUp className="text-green-600" size={24} />
                            <ArrowUpRight className="text-green-600" size={16} />
                        </div>
                        <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Income</h3>
                        <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{formatCurrency(summaryData.totalIncome)}</p>
                        <p className="text-sm text-green-600">+8.2% from last month</p>
                    </div>

                    {/* Total Expenses */}
                    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-all duration-200 hover:shadow-md`}>
                        <div className="flex items-center justify-between mb-2">
                            <TrendingDown className="text-red-600" size={24} />
                            <ArrowUpRight className="text-red-600" size={16} />
                        </div>
                        <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Expenses</h3>
                        <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{formatCurrency(summaryData.totalExpenses)}</p>
                        <p className="text-sm text-red-600">+5.1% from last month</p>
                    </div>

                    {/* Savings */}
                    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-all duration-200 hover:shadow-md`}>
                        <div className="flex items-center justify-between mb-2">
                            <PiggyBank className="text-blue-600" size={24} />
                            <ArrowUpRight className="text-blue-600" size={16} />
                        </div>
                        <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Savings</h3>
                        <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{formatCurrency(summaryData.savings)}</p>
                        <p className="text-sm text-blue-600">+12.3% from last month</p>
                    </div>

                    {/* Net Balance */}
                    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-all duration-200 hover:shadow-md`}>
                        <div className="flex items-center justify-between mb-2">
                            <Wallet className="text-purple-600" size={24} />
                            <span className={`text-sm px-2 py-1 rounded-full ${summaryData.netBalance > 0 ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                                {summaryData.netBalance > 0 ? 'Positive' : 'Negative'}
                            </span>
                        </div>
                        <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Net Balance</h3>
                        <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{formatCurrency(summaryData.netBalance)}</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {((summaryData.savings / summaryData.totalIncome) * 100).toFixed(1)}% savings rate
                        </p>
                    </div>
                </div>

                {/* Chart Controls */}
                <div className="flex flex-wrap gap-3 mb-6">
                    {chartOptions.map(option => {
                        const IconComponent = option.icon;
                        return (
                            <button
                                key={option.value}
                                onClick={() => setSelectedChart(option.value)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${selectedChart === option.value
                                    ? 'bg-blue-600 text-white'
                                    : darkMode
                                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                        : 'bg-white text-gray-600 hover:bg-gray-50'
                                    } border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                            >
                                <IconComponent size={16} />
                                {option.label}
                            </button>
                        );
                    })}
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Main Chart */}
                    <div className={`lg:col-span-2 ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {chartOptions.find(opt => opt.value === selectedChart)?.label}
                        </h3>

                        <div style={{ width: '100%', height: '300px' }}>
                            {selectedChart === 'spending' && (
                                <ResponsiveContainer>
                                    <RechartsPieChart>
                                        <Pie
                                            data={spendingByCategory}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={100}
                                            dataKey="value"
                                        >
                                            {spendingByCategory.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>

                                        <Tooltip formatter={(value) => formatCurrency(value)}></Tooltip>
                                    </RechartsPieChart>
                                </ResponsiveContainer>
                            )}

                            {selectedChart === 'trends' && (
                                <ResponsiveContainer >
                                    <AreaChart data={monthlyTrends}>
                                        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#E5E7EB'} />
                                        <XAxis dataKey="month" stroke={darkMode ? '#9CA3AF' : '#6B7280'} />
                                        <YAxis stroke={darkMode ? '#9CA3AF' : '#6B7280'} />
                                        <Area type="monotone" dataKey="income" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                                        <Area type="monotone" dataKey="expenses" stackId="2" stroke="#EF4444" fill="#EF4444" fillOpacity={0.3} />
                                        <RechartsPieChart>
                                            <Tooltip formatter={(value) => formatCurrency(value)}></Tooltip>
                                        </RechartsPieChart>
                                    </AreaChart>
                                </ResponsiveContainer>
                            )}

                            {selectedChart === 'comparison' && (
                                <ResponsiveContainer width={700} height="80%">
                                    <BarChart data={monthlyTrends}>
                                        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#E5E7EB'} />
                                        <XAxis dataKey="month" stroke={darkMode ? '#9CA3AF' : '#6B7280'} />
                                        <YAxis stroke={darkMode ? '#9CA3AF' : '#6B7280'} />
                                        <Bar dataKey="income" fill="#10B981" />
                                        <Bar dataKey="expenses" fill="#EF4444" />
                                        <RechartsPieChart>
                                            <Tooltip formatter={(value) => formatCurrency(value)}></Tooltip>
                                        </RechartsPieChart>
                                    </BarChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </div>

                    {/* Category Breakdown */}
                    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Top Categories</h3>
                        <div className="space-y-4">
                            {spendingByCategory.slice(0, 5).map((category, index) => (
                                <div key={category.name} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                                        <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{category.name}</span>
                                    </div>
                                    <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        {formatCurrency(category.value)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-xl shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <div className="flex items-center gap-3">
                            <Target className="text-green-600" size={20} />
                            <div>
                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Savings Goal</p>
                                <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>73% Complete</p>
                            </div>
                        </div>
                    </div>

                    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-xl shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <div className="flex items-center gap-3">
                            <TrendingUp className="text-blue-600" size={20} />
                            <div>
                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Avg. Monthly Income</p>
                                <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{formatCurrency(5100)}</p>
                            </div>
                        </div>
                    </div>

                    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-xl shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <div className="flex items-center gap-3">
                            <TrendingDown className="text-orange-600" size={20} />
                            <div>
                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Avg. Monthly Expenses</p>
                                <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{formatCurrency(3650)}</p>
                            </div>
                        </div>
                    </div>

                    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-xl shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <div className="flex items-center gap-3">
                            <PiggyBank className="text-purple-600" size={20} />
                            <div>
                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Best Savings Month</p>
                                <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>February</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportsPage;