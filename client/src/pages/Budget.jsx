import React, { useState } from 'react';
import {
    Wallet,
    Target,
    Plus,
    Edit3,
    Trash2,
    Save,
    X,
    TrendingUp,
    TrendingDown,
    AlertTriangle,
    CheckCircle,
    DollarSign,
    ShoppingCart,
    Car,
    Home,
    Coffee,
    Plane,
    Heart,
    Zap,
    Book
} from 'lucide-react';

// Import reusable components
import { Card } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { PageHeader } from '../components/ui/PageHeader';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { useTheme } from '../hooks/useTheme';
import { formatCurrency } from '../utils/formatters';

const BudgetPage = () => {
    const [editingBudget, setEditingBudget] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const initialNewBudget = { name: '', limit: '', spent: 0, category: 'other', color: 'blue' };
    const [newBudget, setNewBudget] = useState(initialNewBudget);

    const { darkMode, privateMode } = useTheme();

    // Sample budget data
    const [budgets, setBudgets] = useState([
        {
            id: 1,
            name: 'Food & Dining',
            limit: 800,
            spent: 650,
            category: 'food',
            color: 'emerald',
            icon: ShoppingCart
        },
        {
            id: 2,
            name: 'Transportation',
            limit: 400,
            spent: 320,
            category: 'transport',
            color: 'blue',
            icon: Car
        },
        {
            id: 3,
            name: 'Rent',
            limit: 1200,
            spent: 1200,
            category: 'housing',
            color: 'purple',
            icon: Home
        },
        {
            id: 4,
            name: 'Entertainment',
            limit: 300,
            spent: 420,
            category: 'entertainment',
            color: 'orange',
            icon: Coffee
        },
        {
            id: 5,
            name: 'Travel',
            limit: 500,
            spent: 150,
            category: 'travel',
            color: 'cyan',
            icon: Plane
        },
        {
            id: 6,
            name: 'Healthcare',
            limit: 200,
            spent: 85,
            category: 'health',
            color: 'red',
            icon: Heart
        },
        {
            id: 7,
            name: 'Utilities',
            limit: 250,
            spent: 230,
            category: 'utilities',
            color: 'yellow',
            icon: Zap
        },
        {
            id: 8,
            name: 'Education',
            limit: 150,
            spent: 95,
            category: 'education',
            color: 'indigo',
            icon: Book
        }
    ]);

    const categoryOptions = [
        { value: 'food', label: 'Food & Dining' },
        { value: 'transport', label: 'Transportation' },
        { value: 'housing', label: 'Housing' },
        { value: 'entertainment', label: 'Entertainment' },
        { value: 'travel', label: 'Travel' },
        { value: 'health', label: 'Healthcare' },
        { value: 'utilities', label: 'Utilities' },
        { value: 'education', label: 'Education' },
        { value: 'other', label: 'Other' }
    ];

    const getUsagePercentage = (spent, limit) => Math.min((spent / limit) * 100, 100);

    const getStatusColor = (spent, limit) => {
        const percentage = getUsagePercentage(spent, limit);
        if (percentage >= 100) return 'red';
        if (percentage >= 80) return 'yellow';
        return 'green';
    };

    const handleSaveBudget = async (budgetId, updatedData) => {
        setBudgets(prev => prev.map(b =>
            b.id === budgetId ? { ...b, ...updatedData } : b
        ));
        setEditingBudget(null);
    };

    const handleAddBudget = async () => {
        if (newBudget.name && newBudget.limit) {
            const icons = { 
                food: ShoppingCart, 
                transport: Car, 
                housing: Home, 
                entertainment: Coffee, 
                travel: Plane, 
                health: Heart, 
                utilities: Zap, 
                education: Book, 
                other: DollarSign 
            };
            
            setBudgets(prev => [...prev, {
                id: Date.now(),
                name: newBudget.name,
                limit: parseFloat(newBudget.limit),
                spent: 0,
                category: newBudget.category,
                color: newBudget.color,
                icon: icons[newBudget.category] || DollarSign
            }]);
            
            setNewBudget(initialNewBudget);
            setShowAddForm(false);
        }
    };

    const handleDeleteBudget = async (budgetId) => {
        setBudgets(prev => prev.filter(b => b.id !== budgetId));
    };

    const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);
    const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
    const overBudgetCount = budgets.filter(b => b.spent > b.limit).length;

    const headerActions = (
        <Button 
            onClick={() => setShowAddForm(true)}
            icon={Plus}
        >
            Add Budget
        </Button>
    );

    const summaryCards = [
        {
            title: 'Total Budget',
            value: formatCurrency(totalBudget, privateMode),
            icon: Wallet,
            badge: `${((totalSpent / totalBudget) * 100).toFixed(1)}%`,
            changeType: totalSpent <= totalBudget ? 'positive' : 'negative',
            subtitle: `Spent: ${formatCurrency(totalSpent, privateMode)}`
        },
        {
            title: 'Active Budgets',
            value: budgets.length.toString(),
            icon: Target,
            badge: budgets.length.toString(),
            changeType: 'neutral',
            subtitle: 'Categories'
        },
        {
            title: 'Budget Status',
            value: overBudgetCount > 0 ? overBudgetCount.toString() : '✓',
            icon: overBudgetCount > 0 ? AlertTriangle : CheckCircle,
            badge: overBudgetCount > 0 ? 'Over' : 'On Track',
            changeType: overBudgetCount > 0 ? 'negative' : 'positive',
            subtitle: overBudgetCount > 0 ? 'Over budget' : 'All on track'
        }
    ];

    return (
        <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto px-4 py-8">
                <PageHeader
                    title="Budget Management"
                    subtitle="Track and manage your spending limits"
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

                {/* Budget Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {budgets.map((budget) => {
                        const IconComponent = budget.icon;
                        const usagePercentage = getUsagePercentage(budget.spent, budget.limit);
                        const isOverBudget = budget.spent > budget.limit;
                        const remaining = budget.limit - budget.spent;

                        return (
                            <Card
                                key={budget.id}
                                darkMode={darkMode}
                                hover
                                className="p-6 group"
                            >
                                {/* Header */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg bg-${budget.color}-100`}>
                                            <IconComponent className={`text-${budget.color}-600`} size={20} />
                                        </div>
                                        <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                            {budget.name}
                                        </h3>
                                    </div>
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            icon={Edit3}
                                            onClick={() => setEditingBudget(budget.id)}
                                            darkMode={darkMode}
                                        />
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            icon={Trash2}
                                            onClick={() => handleDeleteBudget(budget.id)}
                                            className="text-red-500 hover:text-red-600"
                                        />
                                    </div>
                                </div>

                                {/* Budget Amount */}
                                <div className="mb-4">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                            Spent
                                        </span>
                                        <span className={`text-sm font-medium ${
                                            isOverBudget ? 'text-red-600' : darkMode ? 'text-gray-300' : 'text-gray-700'
                                        }`}>
                                            {formatCurrency(budget.spent, privateMode)} / {formatCurrency(budget.limit, privateMode)}
                                        </span>
                                    </div>

                                    {/* Progress Bar */}
                                    <ProgressBar
                                        value={budget.spent}
                                        max={budget.limit}
                                        color={isOverBudget ? 'red' : budget.color}
                                        darkMode={darkMode}
                                        showPercentage={false}
                                    />

                                    {/* Remaining/Over Budget */}
                                    <div className="mt-2 flex items-center justify-between">
                                        <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                                            {usagePercentage.toFixed(1)}% used
                                        </span>
                                        <div className="flex items-center gap-1">
                                            {isOverBudget ? (
                                                <>
                                                    <TrendingDown className="text-red-500" size={12} />
                                                    <span className="text-xs text-red-600 font-medium">
                                                        {formatCurrency(Math.abs(remaining), privateMode)} over
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <TrendingUp className="text-green-500" size={12} />
                                                    <span className="text-xs text-green-600 font-medium">
                                                        {formatCurrency(remaining, privateMode)} left
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Edit Form */}
                                {editingBudget === budget.id && (
                                    <div className="border-t border-gray-200 pt-4">
                                        <div className="space-y-3">
                                            <Input
                                                type="text"
                                                defaultValue={budget.name}
                                                darkMode={darkMode}
                                                onBlur={(e) => handleSaveBudget(budget.id, { name: e.target.value })}
                                            />
                                            <Input
                                                type="number"
                                                defaultValue={budget.limit}
                                                darkMode={darkMode}
                                                onBlur={(e) => handleSaveBudget(budget.id, { limit: parseFloat(e.target.value) || 0 })}
                                            />
                                            <div className="flex gap-2">
                                                <Button
                                                    onClick={() => setEditingBudget(null)}
                                                    icon={Save}
                                                    size="sm"
                                                    className="flex-1"
                                                >
                                                    Save
                                                </Button>
                                                <Button
                                                    onClick={() => setEditingBudget(null)}
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

                {/* Add Budget Modal */}
                <Modal
                    isOpen={showAddForm}
                    onClose={() => setShowAddForm(false)}
                    title="Add New Budget"
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
                            onClick={handleAddBudget}
                        >
                            Add Budget
                        </Button>
                    ]}
                >
                    <div className="space-y-4">
                        <Input
                            type="text"
                            placeholder="Budget Name"
                            value={newBudget.name}
                            onChange={(e) => setNewBudget(prev => ({ ...prev, name: e.target.value }))}
                            darkMode={darkMode}
                        />
                        <Input
                            type="number"
                            placeholder="Budget Limit"
                            value={newBudget.limit}
                            onChange={(e) => setNewBudget(prev => ({ ...prev, limit: e.target.value }))}
                            darkMode={darkMode}
                        />
                        <Select
                            value={newBudget.category}
                            onChange={(e) => setNewBudget(prev => ({ ...prev, category: e.target.value }))}
                            options={categoryOptions}
                            darkMode={darkMode}
                        />
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default BudgetPage;