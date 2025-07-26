import React from 'react';
import {
    TrendingUp, Wallet, ArrowUpCircle, ArrowDownCircle,
    PieChart, Calendar, Target, AlertCircle, Lightbulb, Eye, Home,
    Car, ShoppingCart, Coffee, User, Search,
} from 'lucide-react';

// Import reusable components
import { Card } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { PageHeader } from '../components/ui/PageHeader';
import { Button } from '../components/ui/Button';
import { ChartContainer } from '../components/charts/ChartContainer';
import { useTheme } from '../hooks/useTheme';
import { formatCurrency } from '../utils/formatters';

const Dashboard = () => {
    const { darkMode, privateMode } = useTheme();

    const financialSummary = {
        totalBalance: 2850000,
        monthlyIncome: 125000,
        monthlyExpenses: 89500,
        netCashFlow: 35500,
        savingsProgress: 68
    };

    const spendingData = [
        { category: 'Housing', amount: 35000, color: 'bg-blue-500', percentage: 39.1 },
        { category: 'Food & Dining', amount: 18500, color: 'bg-green-500', percentage: 20.7 },
        { category: 'Transportation', amount: 12000, color: 'bg-purple-500', percentage: 13.4 },
        { category: 'Shopping', amount: 15000, color: 'bg-yellow-500', percentage: 16.8 },
        { category: 'Entertainment', amount: 9000, color: 'bg-red-500', percentage: 10.0 }
    ];

    const budgetData = [
        { category: 'Housing', used: 35000, budget: 40000, percentage: 87.5 },
        { category: 'Food', used: 18500, budget: 20000, percentage: 92.5 },
        { category: 'Transport', used: 12000, budget: 15000, percentage: 80 },
        { category: 'Shopping', used: 15000, budget: 12000, percentage: 125 },
        { category: 'Entertainment', used: 9000, budget: 10000, percentage: 90 }
    ];

    const recentTransactions = [
        { id: 1, description: 'Swiggy Order', amount: -450, category: 'Food', date: 'Today', icon: Coffee },
        { id: 2, description: 'Salary Credit', amount: 125000, category: 'Income', date: '2 days ago', icon: ArrowUpCircle },
        { id: 3, description: 'Uber Ride', amount: -280, category: 'Transport', date: '3 days ago', icon: Car },
        { id: 4, description: 'Amazon Purchase', amount: -2500, category: 'Shopping', date: '4 days ago', icon: ShoppingCart },
        { id: 5, description: 'Rent Payment', amount: -35000, category: 'Housing', date: '5 days ago', icon: Home }
    ];

    const upcomingPayments = [
        { name: 'Netflix Subscription', amount: 649, date: 'Tomorrow', category: 'Entertainment' },
        { name: 'Internet Bill', amount: 999, date: 'Dec 25', category: 'Utilities' },
        { name: 'SIP Investment', amount: 10000, date: 'Dec 30', category: 'Investment' }
    ];

    const goals = [
        { name: 'Emergency Fund', target: 500000, current: 340000, percentage: 68 },
        { name: 'Vacation', target: 150000, current: 87000, percentage: 58 },
        { name: 'New Laptop', target: 120000, current: 96000, percentage: 80 }
    ];

    // Financial Summary Cards
    const summaryCards = [
        {
            title: 'Total Balance',
            value: formatCurrency(financialSummary.totalBalance, privateMode),
            icon: Wallet,
            badge: '+2.5%',
            changeType: 'positive'
        },
        {
            title: 'Monthly Income',
            value: formatCurrency(financialSummary.monthlyIncome, privateMode),
            icon: ArrowUpCircle,
            badge: '+8.2%',
            changeType: 'positive'
        },
        {
            title: 'Monthly Expenses',
            value: formatCurrency(financialSummary.monthlyExpenses, privateMode),
            icon: ArrowDownCircle,
            badge: '+12%',
            changeType: 'negative'
        },
        {
            title: 'Net Cash Flow',
            value: formatCurrency(financialSummary.netCashFlow, privateMode),
            icon: TrendingUp,
            badge: '+5.1%',
            changeType: 'positive'
        },
        {
            title: 'Savings Progress',
            value: '',
            icon: Target,
            badge: '68%',
            changeType: 'neutral'
        }
    ];

    const SpendingOverviewChart = () => (
        <div className="flex items-center justify-center mb-6">
            <div className="relative w-48 h-48">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke={darkMode ? '#374151' : '#f3f4f6'} strokeWidth="8" />
                    {spendingData.map((item, index) => {
                        const offset = spendingData.slice(0, index).reduce((acc, curr) => acc + curr.percentage, 0);
                        const strokeDasharray = `${item.percentage * 2.51} 251`;
                        const strokeDashoffset = -offset * 2.51;
                        return (
                            <circle
                                key={index}
                                cx="50"
                                cy="50"
                                r="40"
                                fill="none"
                                stroke={item.color.replace('bg-', '').replace('-500', '') === 'blue' ? '#3b82f6' :
                                    item.color.replace('bg-', '').replace('-500', '') === 'green' ? '#10b981' :
                                        item.color.replace('bg-', '').replace('-500', '') === 'purple' ? '#8b5cf6' :
                                            item.color.replace('bg-', '').replace('-500', '') === 'yellow' ? '#f59e0b' : '#ef4444'}
                                strokeWidth="8"
                                strokeDasharray={strokeDasharray}
                                strokeDashoffset={strokeDashoffset}
                                className="transition-all duration-300 hover:stroke-opacity-75"
                            />
                        );
                    })}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {formatCurrency(spendingData.reduce((sum, item) => sum + item.amount, 0), privateMode)}
                        </p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Spent</p>
                    </div>
                </div>
            </div>
        </div>
    );

    const BudgetUtilizationContent = () => (
        <div className="space-y-4">
            {budgetData.map((item, index) => (
                <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {item.category}
                        </span>
                        <span className={`text-sm ${
                            item.percentage > 100 ? 'text-red-600' : 
                            item.percentage > 80 ? 'text-yellow-600' : 'text-green-600'
                        }`}>
                            {item.percentage.toFixed(0)}%
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`flex-1 bg-gray-200 ${darkMode ? 'bg-gray-700' : ''} rounded-full h-2`}>
                            <div
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    item.percentage > 100 ? 'bg-red-500' :
                                    item.percentage > 80 ? 'bg-yellow-500' : 'bg-green-500'
                                }`}
                                style={{ width: `${Math.min(item.percentage, 100)}%` }}
                            />
                        </div>
                        <div className="text-xs text-gray-500 w-20 text-right">
                            {formatCurrency(item.used, privateMode)}/{formatCurrency(item.budget, privateMode)}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    const TransactionItem = ({ transaction }) => (
        <div key={transaction.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.amount > 0 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                }`}>
                    <transaction.icon size={20} />
                </div>
                <div>
                    <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {transaction.description}
                    </p>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {transaction.date} • {transaction.category}
                    </p>
                </div>
            </div>
            <p className={`text-sm font-semibold ${
                transaction.amount > 0 ? 'text-green-600' : darkMode ? 'text-white' : 'text-gray-900'
            }`}>
                {transaction.amount > 0 ? '+' : ''}{formatCurrency(Math.abs(transaction.amount), privateMode)}
            </p>
        </div>
    );

    const PaymentItem = ({ payment, index }) => (
        <div key={index} className={`p-4 rounded-lg border ${
            darkMode ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'
        }`}>
            <div className="flex items-center justify-between mb-2">
                <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {payment.name}
                </p>
                <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {formatCurrency(payment.amount, privateMode)}
                </p>
            </div>
            <div className="flex items-center justify-between">
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {payment.category}
                </p>
                <p className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                    {payment.date}
                </p>
            </div>
        </div>
    );

    const GoalItem = ({ goal, index }) => (
        <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
                <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {goal.name}
                </p>
                <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {goal.percentage}%
                </p>
            </div>
            <div className={`w-full bg-gray-200 ${darkMode ? 'bg-gray-700' : ''} rounded-full h-2`}>
                <div
                    className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${goal.percentage}%` }}
                />
            </div>
            <div className="flex items-center justify-between">
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {formatCurrency(goal.current, privateMode)} saved
                </p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Goal: {formatCurrency(goal.target, privateMode)}
                </p>
            </div>
        </div>
    );

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
            <div className="transition-all duration-300">
                <main className="p-6 space-y-6">
                    <PageHeader
                        title="Dashboard"
                        subtitle="Track and manage your spending limits"
                        darkMode={darkMode}
                    />

                    {/* Financial Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        {summaryCards.map((card, index) => (
                            <StatCard
                                key={index}
                                {...card}
                                darkMode={darkMode}
                            >
                                {/* Special content for Savings Progress card */}
                                {card.title === 'Savings Progress' && (
                                    <div className="mt-3">
                                        <div className={`w-full bg-gray-200 ${darkMode ? 'bg-gray-700' : ''} rounded-full h-2`}>
                                            
                                            <div 
                                                className="bg-purple-600 h-2 rounded-full" 
                                                style={{ width: `${financialSummary.savingsProgress}%` }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </StatCard>
                        ))}
                    </div>

                    {/* Second Row - Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <ChartContainer
                            title="Spending Overview"
                            darkMode={darkMode}
                            actions={<PieChart className={darkMode ? 'text-gray-400' : 'text-gray-500'} size={20} />}
                        >
                            <SpendingOverviewChart />
                            <div className="space-y-3">
                                {spendingData.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-3 h-3 rounded-full ${
                                                item.color.replace('bg-', '').replace('-500', '') === 'blue' ? 'bg-blue-500' :
                                                item.color.replace('bg-', '').replace('-500', '') === 'green' ? 'bg-green-500' :
                                                item.color.replace('bg-', '').replace('-500', '') === 'purple' ? 'bg-purple-500' :
                                                item.color.replace('bg-', '').replace('-500', '') === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
                                            }`} />
                                            <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                {item.category}
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                {formatCurrency(item.amount, privateMode)}
                                            </p>
                                            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                {item.percentage}%
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ChartContainer>

                        <ChartContainer
                            title="Budget Utilization"
                            darkMode={darkMode}
                            actions={<Target className={darkMode ? 'text-gray-400' : 'text-gray-500'} size={20} />}
                        >
                            <BudgetUtilizationContent />
                        </ChartContainer>
                    </div>

                    {/* Third Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <ChartContainer
                            title="Recent Transactions"
                            darkMode={darkMode}
                            actions={
                                <Button variant="ghost" size="sm" icon={Eye}>
                                    View All
                                </Button>
                            }
                        >
                            <div className="space-y-4">
                                {recentTransactions.map((transaction) => (
                                    <TransactionItem key={transaction.id} transaction={transaction} />
                                ))}
                            </div>
                        </ChartContainer>

                        <ChartContainer
                            title="Upcoming Payments"
                            darkMode={darkMode}
                            actions={<Calendar className={darkMode ? 'text-gray-400' : 'text-gray-500'} size={20} />}
                        >
                            <div className="space-y-4">
                                {upcomingPayments.map((payment, index) => (
                                    <PaymentItem key={index} payment={payment} index={index} />
                                ))}
                            </div>
                        </ChartContainer>

                        <ChartContainer
                            title="Goals Progress"
                            darkMode={darkMode}
                            actions={<Target className={darkMode ? 'text-gray-400' : 'text-gray-500'} size={20} />}
                        >
                            <div className="space-y-6">
                                {goals.map((goal, index) => (
                                    <GoalItem key={index} goal={goal} index={index} />
                                ))}
                            </div>
                        </ChartContainer>
                    </div>

                    {/* Fourth Row - Insights and Tips */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <ChartContainer
                            title="Smart Insights & Alerts"
                            darkMode={darkMode}
                            actions={<AlertCircle className="text-orange-500" size={20} />}
                        >
                            <div className="space-y-4">
                                <div className={`p-4 bg-orange-50 border border-orange-200 rounded-lg ${darkMode ? 'bg-gray-300' : 'border-orange-200'}`}>
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="text-orange-500 mt-0.5" size={18} />
                                        <div>
                                            <p className="text-sm font-medium text-orange-900">Budget Alert</p>
                                            <p className="text-sm text-orange-700 mt-1">You've exceeded your shopping budget by ₹3,000 this month. Consider reducing discretionary purchases.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                    <div className="flex items-start gap-3">
                                        <TrendingUp className="text-blue-500 mt-0.5" size={18} />
                                        <div>
                                            <p className="text-sm font-medium text-blue-900">Savings Opportunity</p>
                                            <p className="text-sm text-blue-700 mt-1">You could save an additional ₹5,000/month by optimizing your subscription services and dining expenses.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                    <div className="flex items-start gap-3">
                                        <TrendingUp className="text-green-500 mt-0.5" size={18} />
                                        <div>
                                            <p className="text-sm font-medium text-green-900">Great Progress!</p>
                                            <p className="text-sm text-green-700 mt-1">You're 32% ahead of your annual savings goal. Keep up the excellent work!</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ChartContainer>

                        <ChartContainer
                            title="AI Assistant & Tips"
                            darkMode={darkMode}
                            actions={<Lightbulb className={darkMode ? 'text-gray-400' : 'text-gray-500'} size={20} />}
                        >
                            <div className="space-y-4">
                                <div className="p-4 bg-gray-100 rounded-lg">
                                    <div className="flex items-start gap-3">
                                        <Lightbulb className="text-yellow-500 mt-0.5" size={18} />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Tip of the Day</p>
                                            <p className="text-sm text-gray-700 mt-1">Automate your savings to ensure you consistently set aside money for your goals.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 bg-gray-100 rounded-lg">
                                    <div className="flex items-start gap-3">
                                        <User className="text-blue-500 mt-0.5" size={18} />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Ask Budget AI</p>
                                            <p className="text-sm text-gray-700 mt-1">Need help? Ask me about budgeting, saving, or investment strategies!</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 bg-gray-100 rounded-lg">
                                    <div className="flex items-start gap-3">
                                        <Search className="text-purple-500 mt-0.5" size={18} />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Explore Features</p>
                                            <p className="text-sm text-gray-700 mt-1">Discover new tools and features to enhance your financial management experience.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ChartContainer>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;