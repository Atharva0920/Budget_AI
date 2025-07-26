import React, { useState } from 'react';
import {
    TrendingUp, PieChart, Plus, Settings, Target, Wallet, DollarSign, BarChart3, Clock, Star, ArrowUpRight, ArrowDownRight,
} from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

// Import reusable components
import { Card } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { PageHeader } from '../components/ui/PageHeader';
import { Button } from '../components/ui/Button';
import { Table } from '../components/ui/Table';
import { Tabs } from '../components/ui/Tabs';
import { ChartContainer } from '../components/charts/ChartContainer';
import { useTheme } from '../hooks/useTheme';
import { formatCurrency, formatPercentage, getReturnColor } from '../utils/formatters';

const Investments = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [isBalanceVisible, setIsBalanceVisible] = useState(true);
    const { darkMode, privateMode } = useTheme();

    const summaryData = {
        totalInvested: 850000,
        currentValue: 1024500,
        estimatedReturns: 174500,
        portfolioGrowth: 20.5
    };

    const investmentCategories = [
        { name: 'Mutual Funds', value: 35, amount: 358575, color: '#3B82F6' },
        { name: 'SIPs', value: 30, amount: 307350, color: '#10B981' },
        { name: 'Stocks', value: 20, amount: 204900, color: '#F59E0B' },
        { name: 'Fixed Deposits', value: 10, amount: 102450, color: '#EF4444' },
        { name: 'PPF', value: 5, amount: 51225, color: '#8B5CF6' }
    ];

    const investments = [
        {
            id: 1,
            type: 'SIP',
            name: 'HDFC Top 100 Fund',
            investedAmount: 60000,
            currentValue: 78500,
            returns: 30.8,
            startDate: '2023-01-15',
            status: 'Active',
            category: 'sip'
        },
        {
            id: 2,
            type: 'Mutual Fund',
            name: 'SBI Blue Chip Fund',
            investedAmount: 125000,
            currentValue: 142800,
            returns: 14.2,
            startDate: '2022-08-10',
            status: 'Active',
            category: 'mutual-fund'
        },
        {
            id: 3,
            type: 'Stock',
            name: 'Reliance Industries',
            investedAmount: 85000,
            currentValue: 96750,
            returns: 13.8,
            startDate: '2023-03-22',
            status: 'Active',
            category: 'stock'
        },
        {
            id: 4,
            type: 'Fixed Deposit',
            name: 'ICICI Bank FD',
            investedAmount: 100000,
            currentValue: 107200,
            returns: 7.2,
            startDate: '2023-06-01',
            status: 'Active',
            category: 'fd'
        },
        {
            id: 5,
            type: 'PPF',
            name: 'Public Provident Fund',
            investedAmount: 150000,
            currentValue: 168500,
            returns: 12.3,
            startDate: '2020-04-01',
            status: 'Active',
            category: 'ppf'
        },
        {
            id: 6,
            type: 'SIP',
            name: 'Axis Midcap Fund',
            investedAmount: 45000,
            currentValue: 52300,
            returns: 16.2,
            startDate: '2023-02-10',
            status: 'Active',
            category: 'sip'
        }
    ];

    const upcomingSIPs = [
        { name: 'HDFC Top 100 Fund', amount: 5000, dueDate: '2025-07-25', daysLeft: 4 },
        { name: 'Axis Midcap Fund', amount: 3000, dueDate: '2025-07-28', daysLeft: 7 },
        { name: 'SBI Small Cap Fund', amount: 2500, dueDate: '2025-07-30', daysLeft: 9 }
    ];

    const topPerformers = investments
        .sort((a, b) => b.returns - a.returns)
        .slice(0, 3);

    const portfolioData = [
        { month: 'Jan', value: 850000 },
        { month: 'Feb', value: 892000 },
        { month: 'Mar', value: 935000 },
        { month: 'Apr', value: 978000 },
        { month: 'May', value: 995000 },
        { month: 'Jun', value: 1024500 }
    ];

    const filteredInvestments = activeTab === 'all'
        ? investments
        : investments.filter(inv => inv.category === activeTab);

    const getReturnIcon = (returns) => {
        return returns >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />;
    };

    const getInvestmentIcon = (type) => {
        const iconMap = {
            'SIP': <Target className="w-5 h-5" />,
            'Mutual Fund': <PieChart className="w-5 h-5" />,
            'Stock': <TrendingUp className="w-5 h-5" />,
            'Fixed Deposit': <Wallet className="w-5 h-5" />,
            'PPF': <DollarSign className="w-5 h-5" />
        };
        return iconMap[type] || <DollarSign className="w-5 h-5" />;
    };

    // Summary cards data
    const summaryCards = [
        {
            title: 'Total Invested',
            value: formatCurrency(summaryData.totalInvested, privateMode),
            icon: Wallet,
            badge: 'Active',
            changeType: 'positive'
        },
        {
            title: 'Current Value',
            value: formatCurrency(summaryData.currentValue, privateMode),
            icon: TrendingUp,
            badge: `+${formatPercentage(summaryData.portfolioGrowth, privateMode)}`,
            changeType: 'positive'
        },
        {
            title: 'Total Returns',
            value: formatCurrency(summaryData.estimatedReturns, privateMode),
            icon: DollarSign,
            badge: 'Profit',
            changeType: 'positive'
        },
        {
            title: 'Portfolio Growth',
            value: `+${formatPercentage(summaryData.portfolioGrowth, privateMode)}`,
            icon: BarChart3,
            badge: '6M',
            changeType: 'positive'
        }
    ];

    // Table columns configuration
    const tableColumns = [
        {
            header: 'Investment',
            key: 'name',
            render: (value, row) => (
                <div className="flex items-center gap-3">
                    <div className={`${darkMode ? 'bg-gray-600' : 'bg-gray-100'} p-2 rounded-lg`}>
                        {getInvestmentIcon(row.type)}
                    </div>
                    <div>
                        <div className={`${darkMode ? 'text-white' : 'text-gray-900'} text-sm font-medium`}>
                            {row.name}
                        </div>
                        <div className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
                            {row.type}
                        </div>
                    </div>
                </div>
            )
        },
        {
            header: 'Invested',
            key: 'investedAmount',
            render: (value) => (
                <span className={`${darkMode ? 'text-white' : 'text-gray-900'} text-sm`}>
                    {formatCurrency(value, privateMode)}
                </span>
            )
        },
        {
            header: 'Current Value',
            key: 'currentValue',
            render: (value) => (
                <span className={`${darkMode ? 'text-white' : 'text-gray-900'} text-sm`}>
                    {formatCurrency(value, privateMode)}
                </span>
            )
        },
        {
            header: 'Returns',
            key: 'returns',
            render: (value) => (
                <div className={`flex items-center gap-1 text-sm font-medium ${getReturnColor(value, darkMode)}`}>
                    {getReturnIcon(value)}
                    {formatPercentage(value, privateMode)}
                </div>
            )
        },
        {
            header: 'Status',
            key: 'status',
            render: (value) => (
                <span className={`${darkMode ? 'bg-green-100 text-green-800' : 'bg-green-900 text-green-100'} inline-flex px-2 py-1 text-xs font-medium rounded-full`}>
                    {value}
                </span>
            )
        }
    ];

    // Tab configuration
    const tabOptions = [
        { id: 'all', label: 'All', count: investments.length },
        { id: 'sip', label: 'SIPs', count: investments.filter(i => i.category === 'sip').length },
        { id: 'mutual-fund', label: 'Mutual Funds', count: investments.filter(i => i.category === 'mutual-fund').length },
        { id: 'stock', label: 'Stocks', count: investments.filter(i => i.category === 'stock').length },
        { id: 'fd', label: 'FDs', count: investments.filter(i => i.category === 'fd').length }
    ];

    const PortfolioDistributionChart = () => (
        <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                    <Pie
                        data={investmentCategories}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                    >
                        {investmentCategories.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value, name) => [
                            `${value}%`,
                            investmentCategories.find(cat => cat.value === value)?.name
                        ]}
                    />
                </RechartsPieChart>
            </ResponsiveContainer>
        </div>
    );

    const PortfolioGrowthChart = () => (
        <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={portfolioData}>
                    <XAxis
                        dataKey="month"
                        axisLine={true}
                        tickLine={true}
                        tick={{ fontSize: 12, fill: darkMode ? '#9CA3AF' : '#6B7280' }}
                    />
                    <YAxis
                        type='number'
                        axisLine={true}
                        tickLine={true}
                        tickFormatter={(value) => formatCurrency(value, privateMode)}
                        tick={{ fontSize: 12, fill: darkMode ? '#9CA3AF' : '#6B7280' }}
                        domain={['dataMin - 50000', 'dataMax + 50000']}
                        tickCount={7}
                    />
                    <Tooltip
                        formatter={(value) => [formatCurrency(value, privateMode), 'Portfolio Value']}
                        labelStyle={{ color: darkMode ? '#F3F4F6' : '#1F2937' }}
                        contentStyle={{
                            backgroundColor: darkMode ? '#374151' : '#F9FAFB',
                            border: darkMode ? '1px solid #4B5563' : '1px solid #E5E7EB',
                            borderRadius: '8px'
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#10B981"
                        strokeWidth={3}
                        dot={false}
                        activeDot={{ r: 4, fill: '#10B981' }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
            <main className="p-6 space-y-6">
                <PageHeader
                    title="Investments"
                    subtitle="Track and manage your investment portfolio"
                    darkMode={darkMode}
                />

                {/* Investment Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {summaryCards.map((card, index) => (
                        <StatCard
                            key={index}
                            {...card}
                            darkMode={darkMode}
                        />
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Portfolio Distribution */}
                    <ChartContainer
                        title="Portfolio Distribution"
                        darkMode={darkMode}
                        actions={<Settings className={`${darkMode ? 'hover:text-gray-300' : 'hover:text-gray-600'} w-5 h-5 text-gray-400 cursor-pointer`} />}
                    >
                        <PortfolioDistributionChart />
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            {investmentCategories.map((category, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <div
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: category.color }}
                                    />
                                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} truncate`}>
                                        {category.name}: {category.value}%
                                    </span>
                                </div>
                            ))}
                        </div>
                    </ChartContainer>

                    {/* Portfolio Growth Chart */}
                    <ChartContainer
                        title="Portfolio Growth"
                        darkMode={darkMode}
                        actions={
                            <div className={`flex items-center gap-2 text-sm ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                                <TrendingUp className="w-4 h-4" />
                                <span>+20.5% (6M)</span>
                            </div>
                        }
                    >
                        <PortfolioGrowthChart />
                    </ChartContainer>
                </div>

                {/* Investment Table and Side Panel */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Investments Table */}
                    <div className="lg:col-span-2">
                        <Card darkMode={darkMode}>
                            <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className={`${darkMode ? 'text-white' : 'text-gray-900'} text-lg font-semibold`}>
                                        All Investments
                                    </h3>
                                    <Button icon={Plus}>
                                        Add Investment
                                    </Button>
                                </div>

                                {/* Filter Tabs */}
                                <Tabs
                                    tabs={tabOptions}
                                    activeTab={activeTab}
                                    onTabChange={setActiveTab}
                                    darkMode={darkMode}
                                />
                            </div>

                            <Table
                                columns={tableColumns}
                                data={filteredInvestments}
                                darkMode={darkMode}
                                className="border-0"
                            />
                        </Card>
                    </div>

                    {/* Side Panel */}
                    <div className="space-y-6">
                        {/* Upcoming SIPs */}
                        <Card darkMode={darkMode} className="p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Clock className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} w-5 h-5`} />
                                <h3 className={`${darkMode ? 'text-white' : 'text-gray-900'} font-semibold`}>
                                    Upcoming SIPs
                                </h3>
                            </div>

                            <div className="space-y-3">
                                {upcomingSIPs.map((sip, index) => (
                                    <div key={index} className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} flex items-center justify-between p-3 rounded-lg`}>
                                        <div>
                                            <div className={`${darkMode ? 'text-white' : 'text-gray-900'} text-sm font-medium`}>
                                                {formatCurrency(sip.amount, privateMode)}
                                            </div>
                                            <div className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-xs`}>
                                                {sip.name}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} text-xs`}>
                                                {sip.daysLeft} days
                                            </div>
                                            <div className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-xs`}>
                                                {sip.dueDate}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Top Performers */}
                        <Card darkMode={darkMode} className="p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Star className="w-5 h-5 text-yellow-500" />
                                <h3 className={`${darkMode ? 'text-white' : 'text-gray-900'} font-semibold`}>
                                    Top Performers
                                </h3>
                            </div>

                            <div className="space-y-3">
                                {topPerformers.map((investment, index) => (
                                    <div key={investment.id} className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} flex items-center justify-between p-3 rounded-lg`}>
                                        <div className="flex items-center gap-3">
                                            <div className={`${darkMode ? 'bg-yellow-900 text-yellow-400' : 'bg-yellow-100 text-yellow-600'} flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold`}>
                                                {index + 1}
                                            </div>
                                            <div>
                                                <div className={`${darkMode ? 'text-white' : 'text-gray-900'} text-sm font-medium`}>
                                                    {investment.name}
                                                </div>
                                                <div className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-xs`}>
                                                    {investment.type}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`text-sm font-medium ${getReturnColor(investment.returns, darkMode)} flex items-center gap-1`}>
                                            {getReturnIcon(investment.returns)}
                                            +{formatPercentage(investment.returns, privateMode)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Investments;