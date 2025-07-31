import React, { useState, useMemo } from 'react';
import {
    Search,
    Filter,
    Calendar,
    Plus,
    Download,
    ArrowUpRight,
    ArrowDownRight,
    ShoppingCart,
    Car,
    Home,
    Coffee,
    Plane,
    Heart,
    Zap,
    Book,
    DollarSign,
    CreditCard,
    Banknote,
    Smartphone,
    ChevronLeft,
    ChevronRight,
    X,
    SlidersHorizontal,
    TrendingUp,
    TrendingDown,
    Receipt,
    Wallet
} from 'lucide-react';

// Import reusable components
import { Card } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { PageHeader } from '../components/ui/PageHeader';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Modal } from '../components/ui/Modal';
import { useTheme } from '../hooks/useTheme';
import { formatCurrency } from '../utils/formatters';

const TransactionsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDateRange, setSelectedDateRange] = useState('all');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('all');
    const [selectedType, setSelectedType] = useState('all');
    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [showAddTransaction, setShowAddTransaction] = useState(false);
    const itemsPerPage = 20;

    const { darkMode, privateMode } = useTheme();

    // Sample transactions data
    const [transactions] = useState([
        {
            id: 1,
            type: 'expense',
            amount: -85.50,
            description: 'Grocery Shopping',
            category: 'food',
            paymentMethod: 'credit_card',
            account: 'Main Credit Card',
            date: '2025-07-31',
            time: '14:30',
            merchant: 'Whole Foods Market',
            icon: ShoppingCart,
            color: 'emerald'
        },
        {
            id: 2,
            type: 'income',
            amount: 3200.00,
            description: 'Salary Deposit',
            category: 'salary',
            paymentMethod: 'bank_transfer',
            account: 'Main Checking',
            date: '2025-07-30',
            time: '09:00',
            merchant: 'ABC Company Inc.',
            icon: Wallet,
            color: 'blue'
        },
        {
            id: 3,
            type: 'expense',
            amount: -45.20,
            description: 'Gas Station',
            category: 'transport',
            paymentMethod: 'debit_card',
            account: 'Main Checking',
            date: '2025-07-30',
            time: '18:45',
            merchant: 'Shell Gas Station',
            icon: Car,
            color: 'blue'
        },
        {
            id: 4,
            type: 'expense',
            amount: -1200.00,
            description: 'Monthly Rent',
            category: 'housing',
            paymentMethod: 'bank_transfer',
            account: 'Main Checking',
            date: '2025-07-29',
            time: '10:00',
            merchant: 'Property Management Co.',
            icon: Home,
            color: 'purple'
        },
        {
            id: 5,
            type: 'expense',
            amount: -15.99,
            description: 'Netflix Subscription',
            category: 'entertainment',
            paymentMethod: 'credit_card',
            account: 'Main Credit Card',
            date: '2025-07-28',
            time: '12:00',
            merchant: 'Netflix',
            icon: Coffee,
            color: 'red'
        },
        {
            id: 6,
            type: 'income',
            amount: 150.00,
            description: 'Freelance Work',
            category: 'freelance',
            paymentMethod: 'paypal',
            account: 'PayPal Account',
            date: '2025-07-27',
            time: '16:20',
            merchant: 'XYZ Client',
            icon: DollarSign,
            color: 'green'
        },
        {
            id: 7,
            type: 'expense',
            amount: -89.99,
            description: 'Electric Bill',
            category: 'utilities',
            paymentMethod: 'bank_transfer',
            account: 'Main Checking',
            date: '2025-07-26',
            time: '11:30',
            merchant: 'Electric Company',
            icon: Zap,
            color: 'yellow'
        },
        {
            id: 8,
            type: 'expense',
            amount: -25.50,
            description: 'Coffee Shop',
            category: 'food',
            paymentMethod: 'cash',
            account: 'Cash',
            date: '2025-07-25',
            time: '08:15',
            merchant: 'Starbucks',
            icon: Coffee,
            color: 'emerald'
        },
        {
            id: 9,
            type: 'expense',
            amount: -120.00,
            description: 'Doctor Visit',
            category: 'health',
            paymentMethod: 'debit_card',
            account: 'Main Checking',
            date: '2025-07-24',
            time: '14:00',
            merchant: 'Medical Group',
            icon: Heart,
            color: 'red'
        },
        {
            id: 10,
            type: 'income',
            amount: 500.00,
            description: 'Investment Dividend',
            category: 'investment',
            paymentMethod: 'bank_transfer',
            account: 'Investment Account',
            date: '2025-07-23',
            time: '10:00',
            merchant: 'Vanguard',
            icon: TrendingUp,
            color: 'purple'
        },
        // Add more sample transactions...
        {
            id: 11,
            type: 'expense',
            amount: -67.80,
            description: 'Restaurant Dinner',
            category: 'food',
            paymentMethod: 'credit_card',
            account: 'Main Credit Card',
            date: '2025-07-22',
            time: '19:30',
            merchant: 'Italian Bistro',
            icon: Coffee,
            color: 'emerald'
        },
        {
            id: 12,
            type: 'expense',
            amount: -35.00,
            description: 'Uber Ride',
            category: 'transport',
            paymentMethod: 'credit_card',
            account: 'Main Credit Card',
            date: '2025-07-21',
            time: '22:15',
            merchant: 'Uber',
            icon: Car,
            color: 'blue'
        }
    ]);

    const categoryOptions = [
        { value: 'all', label: 'All Categories' },
        { value: 'food', label: 'Food & Dining' },
        { value: 'transport', label: 'Transportation' },
        { value: 'housing', label: 'Housing' },
        { value: 'entertainment', label: 'Entertainment' },
        { value: 'utilities', label: 'Utilities' },
        { value: 'health', label: 'Healthcare' },
        { value: 'salary', label: 'Salary' },
        { value: 'freelance', label: 'Freelance' },
        { value: 'investment', label: 'Investment' }
    ];

    const paymentMethodOptions = [
        { value: 'all', label: 'All Payment Methods' },
        { value: 'credit_card', label: 'Credit Card' },
        { value: 'debit_card', label: 'Debit Card' },
        { value: 'bank_transfer', label: 'Bank Transfer' },
        { value: 'cash', label: 'Cash' },
        { value: 'paypal', label: 'PayPal' }
    ];

    const dateRangeOptions = [
        { value: 'all', label: 'All Time' },
        { value: 'today', label: 'Today' },
        { value: 'week', label: 'This Week' },
        { value: 'month', label: 'This Month' },
        { value: 'quarter', label: 'This Quarter' },
        { value: 'year', label: 'This Year' }
    ];

    const typeOptions = [
        { value: 'all', label: 'All Types' },
        { value: 'income', label: 'Income Only' },
        { value: 'expense', label: 'Expenses Only' }
    ];

    // Filter transactions
    const filteredTransactions = useMemo(() => {
        return transactions.filter(transaction => {
            // Search filter
            if (searchQuery && !transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
                !transaction.merchant.toLowerCase().includes(searchQuery.toLowerCase())) {
                return false;
            }

            // Category filter
            if (selectedCategory !== 'all' && transaction.category !== selectedCategory) {
                return false;
            }

            // Payment method filter
            if (selectedPaymentMethod !== 'all' && transaction.paymentMethod !== selectedPaymentMethod) {
                return false;
            }

            // Type filter
            if (selectedType !== 'all' && transaction.type !== selectedType) {
                return false;
            }

            // Date range filter (simplified for demo)
            if (selectedDateRange !== 'all') {
                const transactionDate = new Date(transaction.date);
                const today = new Date();
                
                switch (selectedDateRange) {
                    case 'today':
                        return transactionDate.toDateString() === today.toDateString();
                    case 'week':
                        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                        return transactionDate >= weekAgo;
                    case 'month':
                        return transactionDate.getMonth() === today.getMonth() && 
                               transactionDate.getFullYear() === today.getFullYear();
                    default:
                        return true;
                }
            }

            return true;
        });
    }, [transactions, searchQuery, selectedCategory, selectedPaymentMethod, selectedType, selectedDateRange]);

    // Pagination
    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    const paginatedTransactions = filteredTransactions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Calculate summary stats
    const totalIncome = filteredTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpenses = Math.abs(filteredTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0));

    const netFlow = totalIncome - totalExpenses;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric'
        });
    };

    const formatTime = (timeString) => {
        return timeString;
    };

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedDateRange('all');
        setSelectedCategory('all');
        setSelectedPaymentMethod('all');
        setSelectedType('all');
        setCurrentPage(1);
    };

    const headerActions = (
        <div className="flex items-center gap-2">
            <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="ghost"
                icon={SlidersHorizontal}
                size="sm"
                darkMode={darkMode}
            >
                Filters
            </Button>
            <Button
                variant="ghost"
                icon={Download}
                size="sm"
                darkMode={darkMode}
            >
                Export
            </Button>
            <Button 
                onClick={() => setShowAddTransaction(true)}
                icon={Plus}
            >
                Add Transaction
            </Button>
        </div>
    );

    const summaryCards = [
        {
            title: 'Total Income',
            value: formatCurrency(totalIncome, privateMode),
            icon: ArrowUpRight,
            badge: `${filteredTransactions.filter(t => t.type === 'income').length} transactions`,
            changeType: 'positive',
            subtitle: 'This period'
        },
        {
            title: 'Total Expenses',
            value: formatCurrency(totalExpenses, privateMode),
            icon: ArrowDownRight,
            badge: `${filteredTransactions.filter(t => t.type === 'expense').length} transactions`,
            changeType: 'negative',
            subtitle: 'This period'
        },
        {
            title: 'Net Flow',
            value: formatCurrency(netFlow, privateMode),
            icon: netFlow >= 0 ? TrendingUp : TrendingDown,
            badge: netFlow >= 0 ? 'Positive' : 'Negative',
            changeType: netFlow >= 0 ? 'positive' : 'negative',
            subtitle: 'Income - Expenses'
        }
    ];

    return (
        <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto px-4 py-8">
                <PageHeader
                    title="Transactions"
                    subtitle="Track and manage all your financial transactions"
                    actions={headerActions}
                    darkMode={darkMode}
                />

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {summaryCards.map((card, index) => (
                        <StatCard
                            key={index}
                            {...card}
                            darkMode={darkMode}
                        />
                    ))}
                </div>

                {/* Search and Filters */}
                <Card darkMode={darkMode} className="mb-6">
                    <div className="p-6">
                        {/* Search Bar */}
                        <div className="flex items-center gap-4 mb-4">
                            <div className="relative flex-1">
                                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                                    darkMode ? 'text-gray-400' : 'text-gray-500'
                                }`} size={20} />
                                <Input
                                    type="text"
                                    placeholder="Search transactions, merchants, or descriptions..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                    darkMode={darkMode}
                                />
                            </div>
                            {(searchQuery || selectedCategory !== 'all' || selectedPaymentMethod !== 'all' || 
                              selectedType !== 'all' || selectedDateRange !== 'all') && (
                                <Button
                                    onClick={clearFilters}
                                    variant="ghost"
                                    icon={X}
                                    size="sm"
                                    darkMode={darkMode}
                                >
                                    Clear
                                </Button>
                            )}
                        </div>

                        {/* Filter Bar */}
                        {showFilters && (
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                <Select
                                    value={selectedDateRange}
                                    onChange={(e) => setSelectedDateRange(e.target.value)}
                                    options={dateRangeOptions}
                                    darkMode={darkMode}
                                />
                                <Select
                                    value={selectedType}
                                    onChange={(e) => setSelectedType(e.target.value)}
                                    options={typeOptions}
                                    darkMode={darkMode}
                                />
                                <Select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    options={categoryOptions}
                                    darkMode={darkMode}
                                />
                                <Select
                                    value={selectedPaymentMethod}
                                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                                    options={paymentMethodOptions}
                                    darkMode={darkMode}
                                />
                            </div>
                        )}
                    </div>
                </Card>

                {/* Results Summary */}
                <div className={`mb-4 flex items-center justify-between text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                    <span>
                        Showing {paginatedTransactions.length} of {filteredTransactions.length} transactions
                    </span>
                    <span>
                        Page {currentPage} of {totalPages}
                    </span>
                </div>

                {/* Transactions List */}
                <Card darkMode={darkMode} className="mb-6">
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {paginatedTransactions.map((transaction, index) => {
                            const IconComponent = transaction.icon;
                            return (
                                <div
                                    key={transaction.id}
                                    className={`p-6 ${darkMode ? 'hover:bg-gray-700': 'hover:bg-gray-100'} transition-colors duration-200 ${
                                        index === 0 ? 'rounded-t-2xl' : ''
                                    } ${
                                        index === paginatedTransactions.length - 1 ? 'rounded-b-2xl' : ''
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            {/* Icon */}
                                            <div className={`p-3 rounded-2xl bg-${transaction.color}-100`}>
                                                <IconComponent className={`text-${transaction.color}-600`} size={20} />
                                            </div>

                                            {/* Transaction Details */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className={`font-semibold text-base ${
                                                        darkMode ? 'text-white' : 'text-gray-900'
                                                    }`}>
                                                        {transaction.description}
                                                    </h3>
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                        darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                                                    }`}>
                                                        {categoryOptions.find(c => c.value === transaction.category)?.label || transaction.category}
                                                    </span>
                                                </div>
                                                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                    {transaction.merchant} • {transaction.account}
                                                </div>
                                                <div className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                                                    {formatDate(transaction.date)} at {formatTime(transaction.time)} • {
                                                        paymentMethodOptions.find(p => p.value === transaction.paymentMethod)?.label || transaction.paymentMethod
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                        {/* Amount */}
                                        <div className="text-right">
                                            <div className={`text-xl font-bold ${
                                                transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                                {transaction.type === 'income' ? '+' : ''}
                                                {formatCurrency(transaction.amount, privateMode)}
                                            </div>
                                            <div className={`flex items-center gap-1 text-xs mt-1 ${
                                                darkMode ? 'text-gray-500' : 'text-gray-500'
                                            }`}>
                                                {transaction.type === 'income' ? (
                                                    <ArrowUpRight className="text-green-500" size={12} />
                                                ) : (
                                                    <ArrowDownRight className="text-red-500" size={12} />
                                                )}
                                                {transaction.type === 'income' ? 'Income' : 'Expense'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {paginatedTransactions.length === 0 && (
                            <div className="p-12 text-center">
                                <Receipt className={`mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} size={48} />
                                <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    No transactions found
                                </h3>
                                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Try adjusting your filters or search terms
                                </p>
                            </div>
                        )}
                    </div>
                </Card>

                {/* Pagination */}
                {totalPages > 1 && (
                    <Card darkMode={darkMode}>
                        <div className="p-4 flex items-center justify-between">
                            <Button
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                variant="ghost"
                                icon={ChevronLeft}
                                size="sm"
                                darkMode={darkMode}
                            >
                                Previous
                            </Button>

                            <div className="flex items-center gap-2">
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    let pageNum;
                                    if (totalPages <= 5) {
                                        pageNum = i + 1;
                                    } else if (currentPage <= 3) {
                                        pageNum = i + 1;
                                    } else if (currentPage >= totalPages - 2) {
                                        pageNum = totalPages - 4 + i;
                                    } else {
                                        pageNum = currentPage - 2 + i;
                                    }

                                    return (
                                        <Button
                                            key={pageNum}
                                            onClick={() => setCurrentPage(pageNum)}
                                            variant={currentPage === pageNum ? 'primary' : 'ghost'}
                                            size="sm"
                                            darkMode={darkMode}
                                        >
                                            {pageNum}
                                        </Button>
                                    );
                                })}
                            </div>

                            <Button
                                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                                variant="ghost"
                                icon={ChevronRight}
                                size="sm"
                                darkMode={darkMode}
                            >
                                Next
                            </Button>
                        </div>
                    </Card>
                )}

                {/* Add Transaction Modal */}
                <Modal
                    isOpen={showAddTransaction}
                    onClose={() => setShowAddTransaction(false)}
                    title="Add New Transaction"
                    darkMode={darkMode}
                    actions={[
                        <Button
                            key="cancel"
                            variant="secondary"
                            onClick={() => setShowAddTransaction(false)}
                            darkMode={darkMode}
                        >
                            Cancel
                        </Button>,
                        <Button key="add">
                            Add Transaction
                        </Button>
                    ]}
                >
                    <div className="space-y-4">
                        <Input
                            type="text"
                            placeholder="Transaction Description"
                            darkMode={darkMode}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                type="number"
                                placeholder="Amount"
                                step="0.01"
                                darkMode={darkMode}
                            />
                            <Select
                                options={typeOptions.slice(1)}
                                darkMode={darkMode}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Select
                                options={categoryOptions.slice(1)}
                                darkMode={darkMode}
                            />
                            <Select
                                options={paymentMethodOptions.slice(1)}
                                darkMode={darkMode}
                            />
                        </div>
                        <Input
                            type="date"
                            darkMode={darkMode}
                        />
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default TransactionsPage;