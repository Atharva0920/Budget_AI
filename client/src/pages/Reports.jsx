import React, { useState } from 'react';
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    PiggyBank,
    Calendar,
    Download,
    BarChart3,
    PieChart,
    LineChart,
    ArrowUpRight,
    ArrowDownRight,
    Target,
    Wallet
} from 'lucide-react';
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    ResponsiveContainer, 
    PieChart as RechartsPieChart, 
    Cell, 
    Area, 
    AreaChart, 
    Pie, 
    Tooltip 
} from 'recharts';

// Import reusable components
import { Card } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { PageHeader } from '../components/ui/PageHeader';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { useTheme } from '../hooks/useTheme';
import { formatCurrency } from '../utils/formatters';

const ReportsPage = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('thisMonth');
    const [selectedChart, setSelectedChart] = useState('spending');
    const { darkMode, privateMode } = useTheme();

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

    // Summary cards configuration
    const summaryCards = [
        {
            title: 'Total Income',
            value: formatCurrency(summaryData.totalIncome, privateMode),
            icon: TrendingUp,
            change: '+8.2% from last month',
            changeType: 'positive'
        },
        {
            title: 'Total Expenses',
            value: formatCurrency(summaryData.totalExpenses, privateMode),
            icon: TrendingDown,
            change: '+5.1% from last month',
            changeType: 'negative'
        },
        {
            title: 'Savings',
            value: formatCurrency(summaryData.savings, privateMode),
            icon: PiggyBank,
            change: '+12.3% from last month',
            changeType: 'positive'
        },
        {
            title: 'Net Balance',
            value: formatCurrency(summaryData.netBalance, privateMode),
            icon: Wallet,
            badge: summaryData.netBalance > 0 ? 'Positive' : 'Negative',
            changeType: summaryData.netBalance > 0 ? 'positive' : 'negative',
            subtitle: `${((summaryData.savings / summaryData.totalIncome) * 100).toFixed(1)}% savings rate`
        }
    ];

    // Quick stats data
    const quickStats = [
        {
            icon: Target,
            label: 'Savings Goal',
            value: '73% Complete',
            color: 'text-green-600'
        },
        {
            icon: TrendingUp,
            label: 'Avg. Monthly Income',
            value: formatCurrency(5100, privateMode),
            color: 'text-blue-600'
        },
        {
            icon: TrendingDown,
            label: 'Avg. Monthly Expenses',
            value: formatCurrency(3650, privateMode),
            color: 'text-orange-600'
        },
        {
            icon: PiggyBank,
            label: 'Best Savings Month',
            value: 'February',
            color: 'text-purple-600'
        }
    ];

    const headerActions = (
        <>
            <Select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                options={periodOptions}
                darkMode={darkMode}
                className="min-w-[150px]"
            />
            <Button icon={Download}>
                Export
            </Button>
        </>
    );

    return (
        <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto px-4 py-8">
                <PageHeader
                    title="Financial Reports"
                    subtitle="Analyze your income, expenses, and savings patterns"
                    actions={headerActions}
                    darkMode={darkMode}
                />

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {summaryCards.map((card, index) => (
                        <StatCard
                            key={index}
                            {...card}
                            darkMode={darkMode}
                            hover
                        />
                    ))}
                </div>

                {/* Chart Controls */}
                <div className="flex flex-wrap gap-3 mb-6">
                    {chartOptions.map(option => {
                        const IconComponent = option.icon;
                        return (
                            <Button
                                key={option.value}
                                onClick={() => setSelectedChart(option.value)}
                                variant={selectedChart === option.value ? 'primary' : 'secondary'}
                                icon={IconComponent}
                                darkMode={darkMode}
                            >
                                {option.label}
                            </Button>
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

                                        <Tooltip formatter={(value) => formatCurrency(value, privateMode)}></Tooltip>
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
                                            <Tooltip formatter={(value) => formatCurrency(value, privateMode)}></Tooltip>
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
                                            <Tooltip formatter={(value) => formatCurrency(value, privateMode)}></Tooltip>
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
                                        {formatCurrency(category.value, privateMode)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {quickStats.map((stat, index) => {
                        const IconComponent = stat.icon;
                        return (
                            <Card key={index} darkMode={darkMode} hover className="p-4">
                                <div className="flex items-center gap-3">
                                    <IconComponent className={stat.color} size={20} />
                                    <div>
                                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                            {stat.label}
                                        </p>
                                        <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                            {stat.value}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ReportsPage;