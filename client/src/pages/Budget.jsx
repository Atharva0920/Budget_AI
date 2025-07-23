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
import { ThemeContext } from '../contexts/ThemeContext';
import { getColorClasses } from '../utils/colorUtils';

const BudgetPage = () => {
    const [editingBudget, setEditingBudget] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);


    const initialNewBudget = { name: '', limit: '', spent: 0, category: 'other', color: 'blue' };
    const [newBudget, setNewBudget] = useState({ initialNewBudget });

    const { darkMode, privateMode } = React.useContext(ThemeContext);
    console.log('Dark Mode:', darkMode);
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

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const getUsagePercentage = (spent, limit) => Math.min((spent / limit) * 100, 100);

    const getStatusColor = (spent, limit) => {
        const percentage = getUsagePercentage(spent, limit);
        if (percentage >= 100) return 'red';
        if (percentage >= 80) return 'yellow';
        return 'green';
    };

    // const getColorClasses = (color, context = 'primary') => {
    //     const colorMap = {
    //         emerald: {
    //             primary: 'text-emerald-600',
    //             bg: 'bg-emerald-50',
    //             progress: 'bg-emerald-600',
    //             border: 'border-emerald-200'
    //         },
    //         blue: {
    //             primary: 'text-blue-600',
    //             bg: 'bg-blue-50',
    //             progress: 'bg-blue-600',
    //             border: 'border-blue-200'
    //         },
    //         purple: {
    //             primary: 'text-purple-600',
    //             bg: 'bg-purple-50',
    //             progress: 'bg-purple-600',
    //             border: 'border-purple-200'
    //         },
    //         orange: {
    //             primary: 'text-orange-600',
    //             bg: 'bg-orange-50',
    //             progress: 'bg-orange-600',
    //             border: 'border-orange-200'
    //         },
    //         cyan: {
    //             primary: 'text-cyan-600',
    //             bg: 'bg-cyan-50',
    //             progress: 'bg-cyan-600',
    //             border: 'border-cyan-200'
    //         },
    //         red: {
    //             primary: 'text-red-600',
    //             bg: 'bg-red-50',
    //             progress: 'bg-red-600',
    //             border: 'border-red-200'
    //         },
    //         yellow: {
    //             primary: 'text-yellow-600',
    //             bg: 'bg-yellow-50',
    //             progress: 'bg-yellow-600',
    //             border: 'border-yellow-200'
    //         },
    //         indigo: {
    //             primary: 'text-indigo-600',
    //             bg: 'bg-indigo-50',
    //             progress: 'bg-indigo-600',
    //             border: 'border-indigo-200'
    //         }
    //     };
    //     return colorMap[color]?.[context] || colorMap.blue[context];
    // };

    const handleSaveBudget = async (budgetId, updatedData) => {
        setBudgets(prev => prev.map(b =>
            b.id === budgetId ? { ...b, ...updatedData } : b
        ));
        setEditingBudget(null);
    };

    const handleAddBudget = async () => {
        if (newBudget.name && newBudget.limit) {
            const icons = { food: ShoppingCart, transport: Car, housing: Home, entertainment: Coffee, travel: Plane, health: Heart, utilities: Zap, education: Book, other: DollarSign };
            setBudgets(prev => [...prev, {
                id: Date.now(),
                name: newBudget.name,
                limit: parseFloat(newBudget.limit),
                spent: 0,
                category: newBudget.category,
                color: newBudget.color,
                icon: icons[newBudget.category] || DollarSign
            }]);
            setNewBudget({ name: '', limit: '', spent: 0, category: 'other', color: 'blue' });
            setShowAddForm(false);
        }
    };

    const handleDeleteBudget = async (budgetId) => {
        setBudgets(prev => prev.filter(b => b.id !== budgetId));
    };

    const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);
    const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
    const overBudgetCount = budgets.filter(b => b.spent > b.limit).length;

    return (
        <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Budget Management</h1>
                        <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Track and manage your spending limits</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 hover:scale-105"
                        >
                            <Plus size={18} />
                            Add Budget
                        </button>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-all duration-200 hover:shadow-md`}>
                        <div className="flex items-center justify-between mb-2">
                            <Wallet className="text-blue-600" size={24} />
                            <span className={`text-sm px-2 py-1 rounded-full ${totalSpent <= totalBudget ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
                                }`}>
                                {((totalSpent / totalBudget) * 100).toFixed(1)}%
                            </span>
                        </div>
                        <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Budget</h3>
                        <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{formatCurrency(totalBudget)}</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Spent: {formatCurrency(totalSpent)}</p>
                    </div>

                    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-all duration-200 hover:shadow-md`}>
                        <div className="flex items-center justify-between mb-2">
                            <Target className="text-purple-600" size={24} />
                            <span className="text-sm text-purple-600 bg-purple-50 px-2 py-1 rounded-full">{budgets.length}</span>
                        </div>
                        <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Active Budgets</h3>
                        <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{budgets.length}</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Categories</p>
                    </div>

                    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-all duration-200 hover:shadow-md`}>
                        <div className="flex items-center justify-between mb-2">
                            {overBudgetCount > 0 ? (
                                <AlertTriangle className="text-red-600" size={24} />
                            ) : (
                                <CheckCircle className="text-green-600" size={24} />
                            )}
                            <span className={`text-sm px-2 py-1 rounded-full ${overBudgetCount > 0 ? 'text-red-600 bg-red-50' : 'text-green-600 bg-green-50'
                                }`}>
                                {overBudgetCount > 0 ? 'Over' : 'On Track'}
                            </span>
                        </div>
                        <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Budget Status</h3>
                        <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {overBudgetCount > 0 ? overBudgetCount : '✓'}
                        </p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {overBudgetCount > 0 ? 'Over budget' : 'All on track'}
                        </p>
                    </div>
                </div>

                {/* Budget Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {budgets.map((budget) => {
                        const IconComponent = budget.icon;
                        const usagePercentage = getUsagePercentage(budget.spent, budget.limit);
                        const isOverBudget = budget.spent > budget.limit;
                        const remaining = budget.limit - budget.spent;

                        return (
                            <div
                                key={budget.id}
                                className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'
                                    } transition-all duration-200 hover:shadow-md hover:scale-105 group`}
                            >
                                {/* Header */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${getColorClasses(budget.color, 'bg')}`}>
                                            <IconComponent className={getColorClasses(budget.color, 'primary')} size={20} />
                                        </div>
                                        <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{budget.name}</h3>
                                    </div>
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
                                        <button

                                            onClick={() => setEditingBudget(budget.id)}
                                            className={`p-1 rounded hover:bg-gray-100 ${darkMode ? 'hover:bg-gray-700 text-gray-400' : 'text-gray-500'}`}
                                        >
                                            <Edit3 size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteBudget(budget.id)}
                                            className="p-1 rounded hover:bg-red-50 text-red-500 hover:text-red-600"

                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Budget Amount */}
                                <div className="mb-4">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Spent</span>
                                        <span className={`text-sm font-medium ${isOverBudget ? 'text-red-600' : darkMode ? 'text-gray-300' : 'text-gray-700'
                                            }`}>
                                            {formatCurrency(budget.spent)} / {formatCurrency(budget.limit)}
                                        </span>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className={`w-full rounded-full h-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                        <div
                                            className={`h-2 rounded-full transition-all duration-300 ${isOverBudget ? 'bg-red-600' : getColorClasses(budget.color, 'progress')
                                                }`}
                                            style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                                        ></div>
                                    </div>

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
                                                        {formatCurrency(Math.abs(remaining))} over
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <TrendingUp className="text-green-500" size={12} />
                                                    <span className="text-xs text-green-600 font-medium">
                                                        {formatCurrency(remaining)} left
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
                                            <input
                                                type="text"
                                                defaultValue={budget.name}
                                                id="budget-name"
                                                className={`w-full p-2 rounded-lg border text-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                                                    }`}
                                                onBlur={(e) => handleSaveBudget(budget.id, { name: e.target.value })}
                                            />
                                            <input
                                                type="number"
                                                id="budget-limit"
                                                defaultValue={budget.limit}
                                                className={`w-full p-2 rounded-lg border text-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                                                    }`}
                                                onBlur={(e) => handleSaveBudget(budget.id, { limit: parseFloat(e.target.value) || 0 })}
                                            />
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => setEditingBudget(null)}
                                                    className="flex-1 p-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                                                >
                                                    <Save size={14} className="inline mr-1" />
                                                    Save
                                                </button>
                                                <button
                                                    onClick={() => setEditingBudget(null)}
                                                    className={`p-2 rounded-lg text-sm ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                                                        }`}
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Add Budget Modal */}
                {showAddForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl w-full max-w-md mx-4`}>
                            <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Add New Budget</h2>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Budget Name"
                                    value={newBudget.name}
                                    onChange={(e) => setNewBudget(prev => ({ ...prev, name: e.target.value }))}
                                    className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                                        }`}
                                />
                                <input
                                    type="number"
                                    placeholder="Budget Limit"
                                    id="limit"
                                    value={newBudget.limit}
                                    onChange={(e) => setNewBudget(prev => ({ ...prev, limit: e.target.value }))}
                                    className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                                        }`}
                                />
                                <select
                                    id="category"
                                    value={newBudget.category}
                                    onChange={(e) => setNewBudget(prev => ({ ...prev, category: e.target.value }))}
                                    className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                                        }`}
                                >
                                    <option value="food">Food & Dining</option>
                                    <option value="transport">Transportation</option>
                                    <option value="housing">Housing</option>
                                    <option value="entertainment">Entertainment</option>
                                    <option value="travel">Travel</option>
                                    <option value="health">Healthcare</option>
                                    <option value="utilities">Utilities</option>
                                    <option value="education">Education</option>
                                    <option value="other">Other</option>
                                </select>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleAddBudget}
                                        className="flex-1 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        Add Budget
                                    </button>
                                    <button
                                        onClick={() => setShowAddForm(false)}
                                        className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                                            }`}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BudgetPage;