import React, { useState } from 'react';
import {
    Wallet,
    CreditCard,
    Building2,
    Plus,
    Edit3,
    Trash2,
    Save,
    X,
    TrendingUp,
    TrendingDown,
    Eye,
    EyeOff,
    DollarSign,
    Banknote,
    PiggyBank,
    Landmark,
    ArrowUpRight,
    ArrowDownRight,
    AlertCircle,
    CheckCircle,
    RefreshCw,
    MoreHorizontal,
    Link,
    Unlink
} from 'lucide-react';

// Import reusable components
import { Card } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { PageHeader } from '../components/ui/PageHeader';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { useTheme } from '../hooks/useTheme';
import { formatCurrency } from '../utils/formatters';

const AccountsPage = () => {
    const [editingAccount, setEditingAccount] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showBalances, setShowBalances] = useState(true);
    const initialNewAccount = { 
        name: '', 
        type: 'checking', 
        balance: '', 
        bank: '', 
        accountNumber: '',
        color: 'blue'
    };
    const [newAccount, setNewAccount] = useState(initialNewAccount);

    const { darkMode, privateMode } = useTheme();

    // Sample accounts data
    const [accounts, setAccounts] = useState([
        {
            id: 1,
            name: 'Main Checking',
            type: 'checking',
            bank: 'Chase Bank',
            balance: 3245.67,
            accountNumber: '****1234',
            color: 'blue',
            icon: Wallet,
            isActive: true,
            lastUpdated: '2025-07-30T10:30:00',
            transactions: [
                { type: 'income', amount: 500, description: 'Salary deposit' },
                { type: 'expense', amount: -120, description: 'Grocery shopping' }
            ]
        },
        {
            id: 2,
            name: 'Savings Account',
            type: 'savings',
            bank: 'Bank of America',
            balance: 15750.20,
            accountNumber: '****5678',
            color: 'green',
            icon: PiggyBank,
            isActive: true,
            lastUpdated: '2025-07-30T09:15:00',
            transactions: [
                { type: 'income', amount: 1000, description: 'Monthly transfer' }
            ]
        },
        {
            id: 3,
            name: 'Credit Card',
            type: 'credit',
            bank: 'Wells Fargo',
            balance: -1234.56,
            creditLimit: 5000,
            accountNumber: '****9012',
            color: 'red',
            icon: CreditCard,
            isActive: true,
            lastUpdated: '2025-07-30T08:45:00',
            transactions: [
                { type: 'expense', amount: -85, description: 'Restaurant' },
                { type: 'expense', amount: -45, description: 'Gas station' }
            ]
        },
        {
            id: 4,
            name: 'Investment Account',
            type: 'investment',
            bank: 'Fidelity',
            balance: 25680.45,
            accountNumber: '****3456',
            color: 'purple',
            icon: TrendingUp,
            isActive: true,
            lastUpdated: '2025-07-30T07:20:00',
            transactions: []
        },
        {
            id: 5,
            name: 'Business Checking',
            type: 'business',
            bank: 'Capital One',
            balance: 8956.78,
            accountNumber: '****7890',
            color: 'orange',
            icon: Building2,
            isActive: true,
            lastUpdated: '2025-07-29T16:30:00',
            transactions: [
                { type: 'income', amount: 2500, description: 'Client payment' }
            ]
        }
    ]);

    const accountTypeOptions = [
        { value: 'checking', label: 'Checking Account' },
        { value: 'savings', label: 'Savings Account' },
        { value: 'credit', label: 'Credit Card' },
        { value: 'investment', label: 'Investment Account' },
        { value: 'business', label: 'Business Account' },
        { value: 'other', label: 'Other' }
    ];

    const getAccountIcon = (type) => {
        const icons = {
            checking: Wallet,
            savings: PiggyBank,
            credit: CreditCard,
            investment: TrendingUp,
            business: Building2,
            other: Banknote
        };
        return icons[type] || Banknote;
    };

    const getAccountTypeLabel = (type) => {
        const labels = {
            checking: 'Checking',
            savings: 'Savings',
            credit: 'Credit Card',
            investment: 'Investment',
            business: 'Business',
            other: 'Other'
        };
        return labels[type] || 'Other';
    };

    const getBalanceColor = (balance, type) => {
        if (type === 'credit') {
            return balance < 0 ? 'text-red-600' : 'text-green-600';
        }
        return balance >= 0 ? 'text-green-600' : 'text-red-600';
    };

    const getCreditUtilization = (balance, limit) => {
        if (!limit) return 0;
        return Math.abs(balance) / limit * 100;
    };

    const handleSaveAccount = async (accountId, updatedData) => {
        setAccounts(prev => prev.map(a =>
            a.id === accountId ? { ...a, ...updatedData, lastUpdated: new Date().toISOString() } : a
        ));
        setEditingAccount(null);
    };

    const handleAddAccount = async () => {
        if (newAccount.name && newAccount.bank) {
            const IconComponent = getAccountIcon(newAccount.type);
            
            setAccounts(prev => [...prev, {
                id: Date.now(),
                name: newAccount.name,
                type: newAccount.type,
                bank: newAccount.bank,
                balance: parseFloat(newAccount.balance) || 0,
                accountNumber: newAccount.accountNumber || '****0000',
                color: newAccount.color,
                icon: IconComponent,
                isActive: true,
                lastUpdated: new Date().toISOString(),
                transactions: []
            }]);
            
            setNewAccount(initialNewAccount);
            setShowAddForm(false);
        }
    };

    const handleDeleteAccount = async (accountId) => {
        setAccounts(prev => prev.filter(a => a.id !== accountId));
    };

    const handleRefreshAccount = (accountId) => {
        setAccounts(prev => prev.map(a =>
            a.id === accountId ? { ...a, lastUpdated: new Date().toISOString() } : a
        ));
        // Simulate API call delay
        setTimeout(() => {
            console.log(`Refreshed account ${accountId}`);
        }, 1000);
    };

    // Calculate summary stats
    const activeAccounts = accounts.filter(a => a.isActive);
    const totalAssets = activeAccounts
        .filter(a => a.type !== 'credit')
        .reduce((sum, a) => sum + a.balance, 0);
    
    const totalDebt = activeAccounts
        .filter(a => a.type === 'credit')
        .reduce((sum, a) => sum + Math.abs(a.balance), 0);

    const netWorth = totalAssets - totalDebt;
    const connectedAccounts = activeAccounts.filter(a => a.lastUpdated).length;

    const headerActions = (
        <div className="flex items-center gap-2">
           
            <Button 
                onClick={() => setShowAddForm(true)}
                icon={Plus}
            >
                Add Account
            </Button>
        </div>
    );

    const summaryCards = [
        {
            title: 'Total Assets',
            value: formatCurrency(totalAssets, privateMode),
            icon: TrendingUp,
            badge: `${activeAccounts.filter(a => a.type !== 'credit').length} accounts`,
            changeType: 'positive',
            subtitle: 'All accounts'
        },
        {
            title: 'Total Debt',
            value: formatCurrency(totalDebt, privateMode),
            icon: CreditCard,
            badge: `${activeAccounts.filter(a => a.type === 'credit').length} cards`,
            changeType: 'negative',
            subtitle: 'Credit cards'
        },
        {
            title: 'Net Worth',
            value: formatCurrency(netWorth, privateMode),
            icon: netWorth >= 0 ? ArrowUpRight : ArrowDownRight,
            badge: netWorth >= 0 ? 'Positive' : 'Negative',
            changeType: netWorth >= 0 ? 'positive' : 'negative',
            subtitle: 'Assets - Debt'
        }
    ];

    const formatLastUpdated = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        
        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        return date.toLocaleDateString();
    };

    return (
        <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto px-4 py-8">
                <PageHeader
                    title="Accounts"
                    subtitle="Manage your bank accounts, credit cards, and investments"
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

                {/* Accounts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activeAccounts.map((account) => {
                        const IconComponent = account.icon;
                        const isCredit = account.type === 'credit';
                        const utilization = isCredit ? getCreditUtilization(account.balance, account.creditLimit) : 0;

                        return (
                            <Card
                                key={account.id}
                                darkMode={darkMode}
                                hover
                                className="p-6 group relative"
                            >
                                {/* Connection Status */}
                                <div className={`absolute top-3 right-3 w-3 h-3 rounded-full ${
                                    account.lastUpdated ? 'bg-green-500' : 'bg-gray-400'
                                }`} />

                                {/* Header */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-3 rounded-lg bg-${account.color}-100`}>
                                            <IconComponent className={`text-${account.color}-600`} size={20} />
                                        </div>
                                        <div>
                                            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                {account.name}
                                            </h3>
                                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                {account.bank} • {account.accountNumber}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            icon={RefreshCw}
                                            onClick={() => handleRefreshAccount(account.id)}
                                            darkMode={darkMode}
                                        />
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            icon={Edit3}
                                            onClick={() => setEditingAccount(account.id)}
                                            darkMode={darkMode}
                                        />
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            icon={Trash2}
                                            onClick={() => handleDeleteAccount(account.id)}
                                            className="text-red-500 hover:text-red-600"
                                        />
                                    </div>
                                </div>

                                {/* Balance */}
                                <div className="mb-4">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                            {isCredit ? 'Current Balance' : 'Available Balance'}
                                        </span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                                        }`}>
                                            {getAccountTypeLabel(account.type)}
                                        </span>
                                    </div>
                                    
                                    <div className={`text-2xl font-bold ${
                                        showBalances 
                                            ? getBalanceColor(account.balance, account.type)
                                            : darkMode ? 'text-white' : 'text-gray-900'
                                    }`}>
                                        {formatCurrency(account.balance, privateMode)}
                                    </div>

                                    {/* Credit Limit & Utilization */}
                                    {isCredit && account.creditLimit && (
                                        <div className="mt-2">
                                            <div className="flex items-center justify-between text-sm mb-1">
                                                <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                    Credit Limit
                                                </span>
                                                <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                    {formatCurrency(account.creditLimit, privateMode)}
                                                </span>
                                            </div>
                                            <div className={`w-full bg-gray-200 rounded-full h-2 ${darkMode ? 'bg-gray-700' : ''}`}>
                                                <div 
                                                    className={`h-2 rounded-full transition-all duration-300 ${
                                                        utilization > 80 ? 'bg-red-500' :
                                                        utilization > 50 ? 'bg-yellow-500' : 'bg-green-500'
                                                    }`}
                                                    style={{ width: `${Math.min(utilization, 100)}%` }}
                                                />
                                            </div>
                                            <div className="flex justify-between text-xs mt-1">
                                                <span className={`${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                                                    {utilization.toFixed(1)}% used
                                                </span>
                                                <span className={`${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                                                    {formatCurrency(account.creditLimit - Math.abs(account.balance), privateMode)} available
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Last Updated */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        {account.lastUpdated ? (
                                            <CheckCircle className="text-green-500" size={14} />
                                        ) : (
                                            <AlertCircle className="text-orange-500" size={14} />
                                        )}
                                        <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                                            {account.lastUpdated ? `Updated ${formatLastUpdated(account.lastUpdated)}` : 'Not connected'}
                                        </span>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        icon={account.lastUpdated ? Link : Unlink}
                                        className={`text-xs ${account.lastUpdated ? 'text-green-600' : 'text-orange-600'}`}
                                    >
                                        {account.lastUpdated ? 'Connected' : 'Connect'}
                                    </Button>
                                </div>

                                {/* Recent Transactions Preview */}
                                {account.transactions && account.transactions.length > 0 && (
                                    <div className={`mt-4 pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                        <h4 className={`text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                            Recent Activity
                                        </h4>
                                        <div className="space-y-1">
                                            {account.transactions.slice(0, 2).map((transaction, index) => (
                                                <div key={index} className="flex items-center justify-between">
                                                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                        {transaction.description}
                                                    </span>
                                                    <span className={`text-xs font-medium ${
                                                        transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                                                    }`}>
                                                        {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount, privateMode)}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Edit Form */}
                                {editingAccount === account.id && (
                                    <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} pt-4 mt-4`}>
                                        <div className="space-y-3">
                                            <Input
                                                type="text"
                                                defaultValue={account.name}
                                                placeholder="Account name"
                                                darkMode={darkMode}
                                                onBlur={(e) => handleSaveAccount(account.id, { name: e.target.value })}
                                            />
                                            <Input
                                                type="text"
                                                defaultValue={account.bank}
                                                placeholder="Bank name"
                                                darkMode={darkMode}
                                                onBlur={(e) => handleSaveAccount(account.id, { bank: e.target.value })}
                                            />
                                            <Input
                                                type="number"
                                                defaultValue={account.balance}
                                                placeholder="Balance"
                                                step="0.01"
                                                darkMode={darkMode}
                                                onBlur={(e) => handleSaveAccount(account.id, { balance: parseFloat(e.target.value) || 0 })}
                                            />
                                            <div className="flex gap-2">
                                                <Button
                                                    onClick={() => setEditingAccount(null)}
                                                    icon={Save}
                                                    size="sm"
                                                    className="flex-1"
                                                >
                                                    Save
                                                </Button>
                                                <Button
                                                    onClick={() => setEditingAccount(null)}
                                                    variant="secondary"
                                                    size="sm"
                                                    icon={X}
                                                    darkMode={darkMode}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Card>
                        );
                    })}
                </div>

                {/* Add Account Modal */}
                <Modal
                    isOpen={showAddForm}
                    onClose={() => setShowAddForm(false)}
                    title="Add New Account"
                    darkMode={darkMode}
                    actions={[
                        <Button
                            key="cancel"
                            variant="secondary"
                            onClick={() => setShowAddForm(false)}
                            darkMode={darkMode}
                        >
                            Cancel
                        </Button>,
                        <Button
                            key="add"
                            onClick={handleAddAccount}
                        >
                            Add Account
                        </Button>
                    ]}
                >
                    <div className="space-y-4">
                        <Input
                            type="text"
                            placeholder="Account Name (e.g., Main Checking)"
                            value={newAccount.name}
                            onChange={(e) => setNewAccount(prev => ({ ...prev, name: e.target.value }))}
                            darkMode={darkMode}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <Select
                                value={newAccount.type}
                                onChange={(e) => setNewAccount(prev => ({ ...prev, type: e.target.value }))}
                                options={accountTypeOptions}
                                darkMode={darkMode}
                            />
                            <Input
                                type="text"
                                placeholder="Bank Name"
                                value={newAccount.bank}
                                onChange={(e) => setNewAccount(prev => ({ ...prev, bank: e.target.value }))}
                                darkMode={darkMode}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                type="number"
                                placeholder="Current Balance"
                                step="0.01"
                                value={newAccount.balance}
                                onChange={(e) => setNewAccount(prev => ({ ...prev, balance: e.target.value }))}
                                darkMode={darkMode}
                            />
                            <Input
                                type="text"
                                placeholder="Account Number (****1234)"
                                value={newAccount.accountNumber}
                                onChange={(e) => setNewAccount(prev => ({ ...prev, accountNumber: e.target.value }))}
                                darkMode={darkMode}
                            />
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default AccountsPage;